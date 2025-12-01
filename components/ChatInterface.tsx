import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { sendMessageToGemini } from '../services/geminiService';
import { EXAMPLE_PROMPTS } from '../constants';
import MarkdownRenderer from './MarkdownRenderer';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'model',
      content: 'Chào em, Thầy là Thầy Tâm, GVCN lớp 10A2. Hôm nay em thế nào, có cần thầy giúp gì không?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userMessageCount, setUserMessageCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Increment user message count
    const nextCount = userMessageCount + 1;
    setUserMessageCount(nextCount);

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(content);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: responseText,
        timestamp: new Date()
      };
      
      // Add the bot response first
      setMessages(prev => {
          const newMessages = [...prev, botMessage];
          
          // Check for the gentle reminder condition (15th message)
          if (nextCount === 15) {
             const reminderMessage: Message = {
                id: (Date.now() + 2).toString(),
                role: 'model',
                content: "> **Lưu ý nhỏ từ Thầy:**\n> Thầy thấy em đã trao đổi khá nhiều trên Chatbot. Mặc dù công nghệ hỗ trợ rất tốt, nhưng em hãy nhớ **đừng quá phụ thuộc** vào nó dẫn đến thiếu tính chủ động nhé. Hãy tự suy nghĩ kỹ trước khi hỏi và chỉ dùng Chatbot khi thực sự thấy cần thiết để rèn luyện tư duy độc lập. Cố lên em!",
                timestamp: new Date()
             };
             return [...newMessages, reminderMessage];
          }
          
          return newMessages;
      });

    } catch (error) {
      console.error("Failed to send message", error);
    } finally {
      setIsLoading(false);
      // Keep focus on input after sending (desktop friendly)
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSendMessage(inputValue);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden flex flex-col h-[700px]">
      {/* Header */}
      <div className="bg-blue-800 p-4 flex items-center justify-between text-white shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <i className="fa-solid fa-user-tie text-blue-800 text-xl"></i>
          </div>
          <div>
            <h3 className="font-bold text-lg">Thầy Tâm (GVCN 10A2)</h3>
            <div className="flex items-center gap-1 text-xs text-blue-200">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Đang trực tuyến
            </div>
          </div>
        </div>
        <button className="text-blue-200 hover:text-white transition-colors">
          <i className="fa-solid fa-ellipsis-vertical"></i>
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 chat-scroll">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[85%] md:max-w-[75%] gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs text-white ${msg.role === 'user' ? 'bg-gray-500' : 'bg-blue-600'}`}>
                  <i className={`fa-solid ${msg.role === 'user' ? 'fa-user' : 'fa-chalkboard-user'}`}></i>
                </div>

                {/* Message Bubble */}
                <div
                  className={`p-3 rounded-2xl shadow-sm text-sm md:text-base ${
                    msg.role === 'user'
                      ? 'bg-blue-500 text-white rounded-tr-none'
                      : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'
                  }`}
                >
                  {msg.role === 'model' ? (
                     <MarkdownRenderer content={msg.content} />
                  ) : (
                    <p>{msg.content}</p>
                  )}
                  <span className={`text-[10px] block mt-1 opacity-70 ${msg.role === 'user' ? 'text-blue-100 text-right' : 'text-gray-400'}`}>
                    {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start w-full">
              <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-2xl rounded-tl-none p-3 ml-10 shadow-sm">
                 <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                 </div>
                 <span className="text-xs text-gray-500">Thầy đang suy nghĩ...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="relative flex items-center mb-3">
          <input
            ref={inputRef}
            type="text"
            className="w-full bg-gray-100 border border-gray-300 text-gray-800 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block pl-4 pr-12 py-3 shadow-inner"
            placeholder="Nhập câu hỏi của em cho Thầy..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          <button
            onClick={() => handleSendMessage(inputValue)}
            disabled={!inputValue.trim() || isLoading}
            className={`absolute right-2 p-2 rounded-full w-9 h-9 flex items-center justify-center transition-all ${
                !inputValue.trim() || isLoading 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md transform hover:scale-105'
            }`}
          >
            {isLoading ? (
                <i className="fa-solid fa-spinner animate-spin text-sm"></i>
            ) : (
                <i className="fa-solid fa-paper-plane text-sm"></i>
            )}
          </button>
        </div>
        
        {/* Suggestion Prompts - Moved Below Input */}
        <div className="flex flex-wrap gap-2 justify-center">
            {EXAMPLE_PROMPTS.map((prompt, idx) => (
                <button
                    key={idx}
                    onClick={() => handleSendMessage(prompt)}
                    className="px-3 py-1.5 bg-blue-50 border border-blue-200 text-blue-700 text-xs rounded-full hover:bg-blue-100 hover:border-blue-300 transition-colors shadow-sm"
                >
                    {prompt}
                </button>
            ))}
        </div>
        
        <div className="text-center mt-3">
            <p className="text-[10px] text-gray-400">
                <i className="fa-solid fa-shield-halved mr-1"></i>
                Mọi chia sẻ của em đều được bảo mật.
            </p>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;