export interface ChatMessage {
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export interface ChatHistory {
  id: string;
  title: string;
  messages: ChatMessage[];
  timestamp: Date;
}