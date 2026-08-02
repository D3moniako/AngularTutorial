import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { PaymentService } from '../../../services/payment.service';
import { OrderService } from '../../../services/order.service';

import { Payment } from '../../../models/payment';
import { Order } from '../../../models/order';

@Component({
  selector: 'app-admin-payments',

  templateUrl: './admin-payments.component.html',

  styleUrls: ['./admin-payments.component.css'],
})
export class AdminPaymentsComponent implements OnInit, OnDestroy {
  payments: Payment[] = [];

  filteredPayments: Payment[] = [];

  searchText: string = '';

  selectedStatus: string = 'Tutti';

  message: string = '';

  private subscription?: Subscription;

  // ==============================
  // STATISTICHE
  // ==============================

  totalPayments: number = 0;

  totalAmount: number = 0;

  completed: number = 0;

  pending: number = 0;

  failed: number = 0;

  refunded: number = 0;

  constructor(
    private paymentService: PaymentService,

    private orderService: OrderService,
  ) {}

  ngOnInit() {
    this.loadPayments();

    this.subscription = this.paymentService.payments$.subscribe(() => {
      this.loadPayments();
    });
  }

  loadPayments() {
    this.payments = [...this.paymentService.getPayments()].sort(
      (a, b) =>
        new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime(),
    );

    this.calculateStats();

    this.filterPayments();
  }

  calculateStats() {
    this.totalPayments = this.payments.length;

    this.totalAmount = this.payments

      .filter((p) => p.status === 'COMPLETED')

      .reduce(
        (sum, p) => sum + p.amount,

        0,
      );

    this.completed = this.payments.filter(
      (p) => p.status === 'COMPLETED',
    ).length;

    this.pending = this.payments.filter((p) => p.status === 'PENDING').length;

    this.failed = this.payments.filter((p) => p.status === 'FAILED').length;

    this.refunded = this.payments.filter((p) => p.status === 'REFUNDED').length;
  }

  filterPayments() {
    let result = [...this.payments];

    if (this.searchText.trim()) {
      const text = this.searchText.toLowerCase();

      result = result.filter((payment) => {
        const order = this.getOrder(payment);

        return (
          payment.id

            .toString()

            .includes(text) ||
          (payment.customerName || '')

            .toLowerCase()

            .includes(text) ||
          (payment.customerEmail || '')

            .toLowerCase()

            .includes(text) ||
          (order?.id || '')

            .toString()

            .includes(text)
        );
      });
    }

    if (this.selectedStatus !== 'Tutti') {
      result = result.filter(
        (payment) => payment.status === this.selectedStatus,
      );
    }

    this.filteredPayments = result;
  }

  // ==============================
  // ORDINE COLLEGATO
  // ==============================

  getOrder(payment: Payment): Order | null {
    return this.orderService.getOrderById(payment.orderId);
  }

  // ==============================
  // COMPLETA PAGAMENTO TEST
  // ==============================

  simulateComplete(payment: Payment) {
    if (payment.status !== 'PENDING') {
      return;
    }

    this.paymentService.updateStatus(
      payment.id,

      'COMPLETED',
    );

    this.message = '✅ Pagamento completato';
  }

  // ==============================
  // RIMBORSO TEST
  // ==============================

  simulateRefund(payment: Payment) {
    if (payment.status !== 'COMPLETED') {
      this.message = '⚠️ Solo pagamenti completati rimborsabili';

      return;
    }

    this.paymentService.updateStatus(
      payment.id,

      'REFUNDED',
    );

    this.message = '💸 Rimborso simulato completato';
  }

  // ==============================
  // METODO PAGAMENTO
  // ==============================

  getMethod(payment: Payment) {
    return payment.method || 'STRIPE';
  }

  // ==============================
  // TRACK
  // ==============================

  trackByPayment(
    index: number,

    payment: Payment,
  ) {
    return payment.id;
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
