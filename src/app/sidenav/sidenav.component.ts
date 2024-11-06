import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatHistory } from '../types';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  @Input() chatHistory: ChatHistory[] = [];
  @Input() activeId: string = '';
  @Output() onNewChat = new EventEmitter<void>();
  @Output() onSelectChat = new EventEmitter<string>();
}