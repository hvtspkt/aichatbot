import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

// Initialize the API client
// Ideally, in a production app, we would handle the API key more securely or via a backend proxy.
// For this frontend-only demo, we assume it's available in the env.
const apiKey = process.env.API_KEY || ''; 

let chatSession: Chat | null = null;

const getChatSession = (): Chat => {
  if (!chatSession) {
    if (!apiKey) {
        console.error("API Key is missing!");
    }
    const ai = new GoogleGenAI({ apiKey });
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
      },
    });
  }
  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const chat = getChatSession();
    const result: GenerateContentResponse = await chat.sendMessage({
      message: message
    });
    return result.text || "Thầy chưa nghe rõ, em nói lại được không?";
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    return "Hiện tại hệ thống đang bận, em vui lòng thử lại sau nhé.";
  }
};
