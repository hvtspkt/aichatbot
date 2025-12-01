export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

export enum FeatureIcon {
  COMMENTS = 'comments',
  BELL = 'bell',
  CHART = 'chart-simple'
}

export interface FeatureItem {
  icon: FeatureIcon;
  title: string;
  description: string;
}