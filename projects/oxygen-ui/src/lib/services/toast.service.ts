import { Injectable, signal } from '@angular/core';
import { OxygenSeverity, OXYGEN_DEFAULTS } from '../lib-core';

export type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right' | 'center';

export interface ToastMessage {
  id?: number;
  severity?: OxygenSeverity;
  summary?: string;
  detail?: string;
  life?: number;
  sticky?: boolean;
  closable?: boolean;
  data?: unknown;
  variant?: 'filled' | 'outlined' | 'standard'; // standard es el actual con border-left
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private messagesSignal = signal<ToastMessage[]>([]);
  private positionSignal = signal<ToastPosition>('top-right');
  
  messages = this.messagesSignal.asReadonly();
  position = this.positionSignal.asReadonly();

  setPosition(position: ToastPosition) {
    this.positionSignal.set(position);
  }

  add(message: ToastMessage) {
    console.log('ToastService.add called with:', message);
    const id = Date.now() + Math.random();
    const newMessage = { 
      ...message, 
      id, 
      life: message.life ?? OXYGEN_DEFAULTS.toastLife,
      closable: message.closable ?? true,
      variant: message.variant ?? 'standard'
    };
    
    this.messagesSignal.update(msgs => [...msgs, newMessage]);

    if (!newMessage.sticky) {
      setTimeout(() => {
        this.remove(id);
      }, newMessage.life);
    }
  }

  remove(id: number) {
    this.messagesSignal.update(msgs => msgs.filter(m => m.id !== id));
  }

  clear() {
    this.messagesSignal.set([]);
  }
}
