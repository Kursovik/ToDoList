import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

type MessageType = 'success' | 'warn' | 'error';
@Injectable()
export class GlobalMessageService {
  constructor(private messageService: MessageService) {}

  public addMessage(type: MessageType, title: string, message: string) {
    this.messageService.add({
      severity: type,
      summary: title,
      detail: message,
    });
  }
}
