import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { PlannerService } from '../../../services/planner.service';
import { UserService } from '../../../services/user.service';
import { OrderService } from '../../../services/order.service';
import { PaymentService } from '../../../services/payment.service';

import { Order } from '../../../models/order';
import { Payment } from '../../../models/payment';

import { AdminChatComponent } from '../admin-chat/admin-chat.component';

@Component({
  selector: 'app-dashboard',

  templateUrl: './dashboard.component.html',

  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  /*
================================================
 STATISTICHE GENERALI
================================================
*/

  totalProducts: number = 0;

  totalUsers: number = 0;

  totalAdmins: number = 0;

  activeUsers: number = 0;

  totalOrders: number = 0;

  totalRevenue: number = 0;

  /*
================================================
 PAGAMENTI
================================================
*/

  totalPayments: number = 0;

  completedPayments: number = 0;

  failedPayments: number = 0;

  /*
================================================
 VENDITE
================================================
*/

  productsSold: number = 0;

  lastOrder: Order | null = null;

  lastCustomer: string = '';

  lastPayment: Payment | null = null;

  /*
================================================
 SISTEMA
================================================
*/

  currentDate: string = '';

  currentTime: string = '';

  systemStatus: string = 'Online';

  private subscriptions: Subscription[] = [];

  constructor(
    private plannerService: PlannerService,

    private userService: UserService,

    private orderService: OrderService,

    private paymentService: PaymentService,
  ) {}

  ngOnInit() {
    this.loadStats();

    this.subscriptions.push(
      this.userService.users$.subscribe(() => {
        this.loadStats();
      }),
    );

    this.subscriptions.push(
      this.orderService.orders$.subscribe(() => {
        this.loadStats();
      }),
    );
  }

  loadStats() {
    // =====================================
    // PLANNER
    // =====================================

    this.totalProducts = this.plannerService.getProducts().length;

    // =====================================
    // UTENTI
    // =====================================

    const users = this.userService.getUsers();

    this.totalUsers = users.length;

    this.totalAdmins = users.filter((u) => u.role === 'ADMIN').length;

    this.activeUsers = users.filter((u) => u.enabled).length;

    // =====================================
    // ORDINI
    // =====================================

    const orders: Order[] = this.orderService.getAllOrders();

    this.totalOrders = orders.length;

    this.totalRevenue = orders

      .filter((o) => o.status === 'PAGATO')

      .reduce(
        (total, order) => total + order.total,

        0,
      );

    // =====================================
    // PRODOTTI VENDUTI
    // =====================================

    this.productsSold = orders

      .filter((o) => o.status === 'PAGATO')

      .reduce(
        (total, order) => total + order.products.length,

        0,
      );

    // =====================================
    // ULTIMO ORDINE
    // =====================================

    if (orders.length > 0) {
      this.lastOrder = [...orders].sort(
        (a, b) =>
          new Date(b.purchaseDate).getTime() -
          new Date(a.purchaseDate).getTime(),
      )[0];

      this.lastCustomer = this.lastOrder.customerName || '';
    }

    // =====================================
    // PAGAMENTI
    // =====================================

    const payments: Payment[] = this.paymentService.getPayments();

    this.totalPayments = payments.length;

    this.completedPayments = payments.filter(
      (p) => p.status === 'COMPLETED',
    ).length;

    this.failedPayments = payments.filter((p) => p.status === 'FAILED').length;

    if (payments.length > 0) {
      this.lastPayment = [...payments].sort(
        (a, b) =>
          new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime(),
      )[0];
    }

    // =====================================
    // DATA SISTEMA
    // =====================================

    const now = new Date();

    this.currentDate = now.toLocaleDateString(
      'it-IT',

      {
        day: '2-digit',

        month: '2-digit',

        year: 'numeric',
      },
    );

    this.currentTime = now.toLocaleTimeString('it-IT');
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
