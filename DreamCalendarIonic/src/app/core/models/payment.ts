export interface Payment {
  // ID pagamento locale
  id: number;

  // utente
  userId: number;

  // ordine collegato
  orderId: number;

  // importo
  amount: number;

  // stato pagamento

  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';

  // data pagamento

  paymentDate: string;

  // ==========================
  // STRIPE
  // ==========================

  sessionId?: string;

  paymentIntentId?: string;

  // metodo pagamento

  method?: 'CARD' | 'PAYPAL' | 'STRIPE' | 'OTHER';

  // cliente

  customerEmail?: string;

  customerName?: string;
}
