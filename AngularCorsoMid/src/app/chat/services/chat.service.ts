import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { ChatMessage } from '../models/chat-message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private storageKey = 'dreamcalendar-chat';

  private messages: ChatMessage[] = this.load();

  private subject = new BehaviorSubject<ChatMessage[]>([
    ...this.messages
  ]);

  messages$ = this.subject.asObservable();

  // Utente attualmente loggato
 private currentUserId:number | null = null;

private currentUserName:string = '';

  constructor() { }

  setCurrentUser(id: number, name: string): void {

    this.currentUserId = id;
    this.currentUserName = name;

  }

  // ==========================
  // CHAT UTENTE
  // ==========================

  getMessages(userId: number) {

    return this.subject.asObservable().pipe(

      map(messages =>
        messages.filter(m => m.userId === userId)
      )

    );

  }

  // ==========================
  // CHAT ADMIN
  // ==========================

  getAllMessages() {

    return this.subject.asObservable();

  }

  // ==========================
  // INVIO UTENTE
  // ==========================

  send(text: string): void {

    if (!text.trim()) {
      return;
    }

    if(this.currentUserId === null){

    console.error(
    'ERRORE: nessun utente loggato'
    );

    return;

    }

    const message: ChatMessage = {

      id: Date.now(),

      userId: this.currentUserId,

      userName: this.currentUserName,

      sender: 'USER',

      text,

      date: new Date(),

      read: false

    };

    this.messages.push(message);

    this.save();

    // BOT automatico demo

    setTimeout(() => {

  if(this.currentUserId !== null){

    this.botReply(

      this.currentUserId,

      'Grazie per averci scritto 🌸 Un assistente DreamCalendar ti risponderà presto.'

    );

  }

},1000);

  }

  // ==========================
  // BOT
  // ==========================

  botReply(userId: number, text: string): void {

    const message: ChatMessage = {

      id: Date.now(),

      userId,

      userName: 'DreamCalendar AI',

      sender: 'BOT',

      text,

      date: new Date(),

      read: false

    };

    this.messages.push(message);

    this.save();

  }

  // ==========================
  // ADMIN
  // ==========================

  adminReply(userId: number, text: string): void {

    const message: ChatMessage = {

      id: Date.now(),

      userId,

      userName: 'Admin DreamCalendar',

      sender: 'ADMIN',

      text,

      date: new Date(),

      read: false

    };

    this.messages.push(message);

    this.save();

  }

  // ==========================

  clear(): void {

    this.messages = [];

    this.save();

  }

  // ==========================

  private save(): void {

    localStorage.setItem(

      this.storageKey,

      JSON.stringify(this.messages)

    );

    this.subject.next([...this.messages]);

  }

  private load(): ChatMessage[] {

    try {

      const data = localStorage.getItem(this.storageKey);

      return data ? JSON.parse(data) : [];

    } catch {

      return [];

    }

  }

}