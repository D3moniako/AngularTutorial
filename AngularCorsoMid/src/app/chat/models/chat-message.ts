export interface ChatMessage {
  id: number;

  userId: number;

  userName: string;

  sender: 'USER' | 'BOT' | 'ADMIN';

  text: string;

  date: Date;

  read: boolean;
}
