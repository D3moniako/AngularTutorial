export interface User {
  id: number;

  // nome utente

  name: string;

  // accesso

  email: string;

  password: string;

  // telefono per recupero account / OTP

  phone?: string;

  // ruolo

  role: 'USER' | 'ADMIN';

  // stato account

  enabled: boolean;

  // sicurezza futura

  twoFactorEnabled: boolean;

  // data creazione

  createdAt: string;

  // immagine profilo

  avatar?: string;
}
