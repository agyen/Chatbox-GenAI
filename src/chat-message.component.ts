import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatMessage } from './types';

@Component({
  selector: 'chat-message',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="message" [class.user-message]="message.isUser" [class.bot-message]="!message.isUser">
      <p>{{ message.content }}</p>
      <small style="opacity: 0.7">{{ message.timestamp | date:'shortTime' }}</small>
    </div>
  `
})
export class ChatMessageComponent {
  @Input() message!: ChatMessage;
}