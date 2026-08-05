import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { loadStripe, Stripe } from '@stripe/stripe-js';

import { Payment } from '../models/payment';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private payments: Payment[] = this.loadPayments();

  private paymentSubject = new BehaviorSubject<Payment[]>([...this.payments]);

  payments$ = this.paymentSubject.asObservable();

  private stripePromise: Promise<Stripe | null>;

  constructor() {
    this.stripePromise = loadStripe(environment.stripePublishableKey);
  }

  createPayment(payment: Payment): Payment {
    const maxId = this.payments.length
      ? Math.max(...this.payments.map((p) => p.id))
      : 0;

    payment.id = maxId + 1;

    this.payments.push(payment);

    this.savePayments();

    return payment;
  }

  getCompletedPayments() {
    return this.payments.filter((p) => p.status === 'COMPLETED');
  }

  updateStatus(
    id: number,

    status: Payment['status'],
  ) {
    const payment = this.payments.find((p) => p.id === id);

    if (payment) {
      payment.status = status;

      this.savePayments();
    }
  }

  // MOCK STRIPE
  // verrà sostituito dal backend

  async createCheckoutSession(cart: any[]) {
    console.log(
      'Carrello inviato a Stripe TEST',

      cart,
    );

    return {
      sessionId: 'cs_test_SESSIONE_LOCALE',
    };
  }

  async redirectToStripe(sessionId: string) {
    const stripe = await this.stripePromise;

    if (!stripe) {
      throw new Error('Stripe non inizializzato');
    }

    console.log(
      'Redirect Stripe',

      sessionId,
    );
  }

  getPaymentById(id: number): Payment | null {
    return this.payments.find((p) => p.id === id) || null;
  }

  getUserPayments(userId: number): Payment[] {
    return this.payments.filter((p) => p.userId === userId);
  }

  getPayments() {
    return [...this.payments];
  }

  private savePayments() {
    localStorage.setItem(
      'payments',

      JSON.stringify(this.payments),
    );

    this.paymentSubject.next([...this.payments]);
  }

  private loadPayments(): Payment[] {
    try {
      const data = localStorage.getItem('payments');

      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }
}
