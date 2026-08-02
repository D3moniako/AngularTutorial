import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { OrderService } from '../../../services/order.service';
import { Order } from '../../../models/order';

@Component({
  selector: 'app-admin-orders',

  templateUrl: './admin-orders.component.html',

  styleUrls: ['./admin-orders.component.css'],
})
export class AdminOrdersComponent implements OnInit, OnDestroy {
  orders: Order[] = [];

  filteredOrders: Order[] = [];

  searchText: string = '';

  selectedStatus: 'Tutti' | 'PAGATO' | 'IN_ATTESA' | 'ANNULLATO' = 'Tutti';

  message: string = '';

  private ordersSubscription?: Subscription;

  // STATISTICHE

  totalOrders: number = 0;

  totalRevenue: number = 0;

  paidOrders: number = 0;

  pendingOrders: number = 0;

  cancelledOrders: number = 0;

  totalProducts: number = 0;

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.ordersSubscription = this.orderService.orders$.subscribe((orders) => {
      this.orders = [...orders];

      this.calculateStats();

      this.filterOrders();
    });
  }

  calculateStats() {
    this.totalOrders = this.orders.length;

    this.totalRevenue = this.orders

      .filter((o) => o.status === 'PAGATO')

      .reduce(
        (sum, o) => sum + o.total,

        0,
      );

    this.paidOrders = this.orders.filter((o) => o.status === 'PAGATO').length;

    this.pendingOrders = this.orders.filter(
      (o) => o.status === 'IN_ATTESA',
    ).length;

    this.cancelledOrders = this.orders.filter(
      (o) => o.status === 'ANNULLATO',
    ).length;

    this.totalProducts = this.orders.reduce(
      (sum, o) => sum + o.products.length,

      0,
    );
  }

  filterOrders() {
    let result = [...this.orders];

    if (this.searchText.trim()) {
      const text = this.searchText.toLowerCase();

      result = result.filter(
        (order) =>
          (order.customerName || '')

            .toLowerCase()

            .includes(text) ||
          (order.customerEmail || '')

            .toLowerCase()

            .includes(text) ||
          order.id

            .toString()

            .includes(text),
      );
    }

    if (this.selectedStatus !== 'Tutti') {
      result = result.filter((order) => order.status === this.selectedStatus);
    }

    this.filteredOrders = result;
  }

  changeStatus(order: Order) {
    let newStatus: Order['status'];

    switch (order.status) {
      case 'PAGATO':
        newStatus = 'IN_ATTESA';

        break;

      case 'IN_ATTESA':
        newStatus = 'ANNULLATO';

        break;

      default:
        this.message = '⚠️ Ordine già annullato';

        return;
    }

    this.orderService.updateStatus(
      order.id,

      newStatus,
    );

    this.message = '✅ Stato ordine aggiornato';
  }

  deleteOrder(id: number) {
    if (confirm('Eliminare definitivamente questo ordine?')) {
      this.orderService.deleteOrder(id);

      this.message = '🗑 Ordine eliminato';
    }
  }

  getPaymentMethod(order: Order) {
    return order.paymentId ? 'STRIPE' : 'N/D';
  }

  trackByOrder(
    index: number,

    order: Order,
  ) {
    return order.id;
  }

  ngOnDestroy() {
    this.ordersSubscription?.unsubscribe();
  }
}
