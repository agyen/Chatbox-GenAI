import { Component, Input, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatMessageComponent } from './chat-message.component';
import { ChatHistory } from './types';

@Component({
  selector: 'app-chat-interface',
  standalone: true,
  imports: [CommonModule, FormsModule, ChatMessageComponent],
  template: `
    <div class="chat-container">
      <header style="background: #fff; padding: 1rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h1 style="color: #007AFF; font-size: 1.5rem;">AI Assistant</h1>
      </header>

      <main style="flex: 1; overflow-y: auto; padding: 1rem;">
        <div #chatContainer style="display: flex; flex-direction: column;">
          @for (msg of currentChat.messages; track msg.timestamp) {
            <chat-message [message]="msg"></chat-message>
          }
          
          @if (isTyping) {
            <div class="typing-indicator">
              AI is typing...
            </div>
          }
        </div>
      </main>

      <footer style="background: #fff; padding: 1rem; border-top: 1px solid #eee;">
        <form (ngSubmit)="sendMessage()" style="display: flex; gap: 0.5rem;">
          <input
            type="text"
            [(ngModel)]="newMessage"
            name="message"
            placeholder="Type your message..."
            style="flex: 1; padding: 0.75rem; border: 1px solid #ddd; border-radius: 0.5rem; font-size: 1rem;"
          >
          <button
            type="submit"
            [disabled]="!newMessage.trim()"
            style="padding: 0.75rem 1.5rem; background: #007AFF; color: white; border: none; border-radius: 0.5rem; font-size: 1rem; cursor: pointer;"
          >
            Send
          </button>
        </form>
      </footer>
    </div>
  `
})
export class ChatInterfaceComponent implements AfterViewChecked {
  @Input() currentChat!: ChatHistory;
  @ViewChild('chatContainer') private chatContainer!: ElementRef;
  
  newMessage = '';
  isTyping = false;

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      const element = this.chatContainer.nativeElement;
      element.scrollTop = element.scrollHeight;
    } catch(err) { }
  }

  sendMessage() {
    if (!this.newMessage.trim()) return;

    // Add user message
    const userMessage = this.newMessage;
    this.currentChat.messages.push({
      content: this.newMessage,
      isUser: true,
      timestamp: new Date()
    });

    // Update chat title if it's the first user message
    if (this.currentChat.messages.length === 2) {
      this.currentChat.title = userMessage.slice(0, 30) + (userMessage.length > 30 ? '...' : '');
    }

    // Clear input
    this.newMessage = '';

    // Simulate AI response
    this.isTyping = true;
    setTimeout(() => {
      this.isTyping = false;
      this.currentChat.messages.push({
        content: `I received your message: "${userMessage}". This is a demo response.`,
        isUser: false,
        timestamp: new Date()
      });
    }, 1500);
  }
}