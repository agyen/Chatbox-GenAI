import { Injectable } from '@angular/core';
import { ChatHistory } from './types';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private chats: ChatHistory[] = [];
  private currentChatId: string = '';

  constructor() {
    this.startNewChat();
  }

  get chatHistory(): ChatHistory[] {
    return this.chats;
  }

  get activeChatId(): string {
    return this.currentChatId;
  }

  get currentChat(): ChatHistory {
    return this.chats.find(chat => chat.id === this.currentChatId) || this.chats[0];
  }

  startNewChat() {
    const newChat: ChatHistory = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [{
        content: "Hello! I'm your AI assistant. How can I help you today?",
        isUser: false,
        timestamp: new Date()
      }],
      timestamp: new Date()
    };
    
    this.chats.unshift(newChat);
    this.currentChatId = newChat.id;
  }

  selectChat(chatId: string) {
    this.currentChatId = chatId;
  }
}