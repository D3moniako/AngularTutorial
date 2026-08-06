import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { CartService } from '../../core/services/cart.service';
import { OrderService } from '../../core/services/order.service';
import { UserService } from '../../core/services/user.service';
import { PaymentService } from '../../core/services/payment.service';

import { CartItem } from '../../core/models/cart-item';
import { User } from '../../core/models/user';

import { NotificationCenterService } from '../../core/services/notification-center.service';



@Component({

selector:'app-checkout',

templateUrl:'./checkout.page.html',

styleUrls:['./checkout.page.scss']

})


export class CheckoutPage implements OnInit {
  cart: CartItem[] = [];

  total: number = 0;

  user: User | null = null;

  customer = {
    name: '',

    email: '',

    address: '',
  };

  orderCompleted = false;

  loading = false;

  lastOrderId: number = 0;

  errorMessage: string = '';

  successMessage: string = '';

  nameError: string = '';

  emailError: string = '';

  addressError: string = '';

  constructor(
    private cartService: CartService,

    private orderService: OrderService,

    private paymentService: PaymentService,

    private userService: UserService,

    private router: Router,

    private notificationService: NotificationCenterService,
  ) {}

  ngOnInit() {
    this.user = this.userService.getCurrentUser();

    if (this.user) {
      this.customer.name = this.user.name;

      this.customer.email = this.user.email;
    }

    this.loadCart();
  }

  loadCart() {
    this.cart = this.cartService.getCart();

    this.total = this.cartService.getTotal();
  }

  get totalItems(): number {
    return this.cart.reduce(
      (total, item) => total + item.quantity,

      0,
    );
  }

  async completeOrder() {
    this.errorMessage = '';

    this.successMessage = '';

    this.nameError = '';

    this.emailError = '';

    this.addressError = '';

    if (this.loading) {
      return;
    }

    // LOGIN

    if (!this.user) {
      this.errorMessage = 'Devi effettuare il login prima di acquistare';

      this.router.navigate(['/login']);

      return;
    }

    // DATI CLIENTE

    if (!this.customer.name.trim()) {
      this.nameError = 'Inserisci il nome completo';

      return;
    }

    if (!this.customer.email.trim()) {
      this.emailError = 'Inserisci la email';

      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(this.customer.email)) {
      this.emailError = 'Inserisci una email valida';

      return;
    }

    // CARRELLO

    if (this.cart.length === 0) {
      this.errorMessage = 'Il carrello è vuoto';

      return;
    }

    this.loading = true;

    try {
      // =====================================
      // SALVATAGGIO DATI TEMPORANEI
      // PRIMA DI STRIPE
      // =====================================

      localStorage.setItem(
        'checkoutCustomer',

        JSON.stringify(this.customer),
      );

      localStorage.setItem(
        'checkoutCart',

        JSON.stringify(this.cart),
      );

      localStorage.setItem(
        'checkoutTotal',

        this.total.toString(),
      );

      localStorage.setItem(
        'checkoutUserId',

        this.user.id.toString(),
      );

      // =====================================
      // CREA SESSIONE STRIPE MOCK
      // =====================================

      const session = await this.paymentService.createCheckoutSession(
        this.cart,
      );

      if (!session || !session.sessionId) {
        throw new Error('Sessione pagamento non creata');
      }

      const order = {
        id: Date.now(),

        userId: this.user.id,

        customerName: this.customer.name,

        customerEmail: this.customer.email,

        products: this.cart.map((item) => item.product),

        total: this.total,

        status: 'PAGATO' as const,

        downloadAvailable: true,

        purchaseDate: new Date().toISOString(),
      };

      this.orderService.addOrder(order);

      // =====================================
      // TEST LOCALE
      // SIMULA RITORNO STRIPE
      // =====================================

      /*this.notificationService.add({

id:Date.now(),

title:'Ordine completato',

message:
'Il tuo pagamento è stato ricevuto. I tuoi planner sono disponibili.',

icon:'📦',

type:'ORDER',

date:new Date(),

read:false

});*/

      // =====================================
      // SVUOTA CARRELLO DOPO PAGAMENTO
      // =====================================

      // =====================================
      // SVUOTA CARRELLO DOPO PAGAMENTO
      // =====================================

      this.cartService.clear();

      this.cart = [];

      this.total = 0;

      this.loading = false;

      this.router.navigate(['/payment-success']);
    } catch (error) {
      console.error(
        'Errore pagamento',

        error,
      );

      this.errorMessage = 'Errore durante il pagamento';

      this.loading = false;
    }
  }

  // NAVIGAZIONE

  goToPlanners() {
    this.router.navigate(['/my-planners']);
  }

  continueShopping() {
    this.router.navigate(['/shop']);
  }

  // TEST MANUALE

  simulateStripePayment() {
    this.successMessage = 'Pagamento Stripe completato (TEST)';

    this.orderCompleted = true;
  }
}
