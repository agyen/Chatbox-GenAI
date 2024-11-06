import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatInterfaceComponent } from './chat-interface/chat-interface.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ChatInterfaceComponent, SidenavComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public chatService: ChatService) {}
}