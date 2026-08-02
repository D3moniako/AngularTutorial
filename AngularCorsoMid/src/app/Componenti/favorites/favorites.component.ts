import { Component, OnInit, OnDestroy } from '@angular/core';

import { PlannerService } from '../../services/planner.service';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { UserService } from '../../services/user.service';

import { Product } from '../../models/product';
import { User } from '../../models/user';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favorites',

  templateUrl: './favorites.component.html',

  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit, OnDestroy {
  favorites: Product[] = [];

  // ===============================
  // DIVISIONE PRODOTTI
  // ===============================

  purchasedFavorites: Product[] = [];

  availableFavorites: Product[] = [];

  searchText: string = '';

  selectedCategory: string = 'Tutti';

  categories: string[] = [
    'Tutti',

    'Elegant',

    'Lifestyle',

    'Wellness',

    'Business',
  ];

  message: string = '';

  user: User | null = null;

  private userSubscription?: Subscription;

  constructor(
    private plannerService: PlannerService,

    private cartService: CartService,

    private orderService: OrderService,

    private userService: UserService,
  ) {}

  ngOnInit() {
    this.userSubscription = this.userService.user$.subscribe((user) => {
      this.user = user;

      this.loadFavorites();
    });
  }

  // =================================
  // CARICA PREFERITI
  // =================================

  loadFavorites() {
    this.favorites = this.plannerService.getFavorites();

    this.separateProducts();
  }

  // =================================
  // DIVISIONE ACQUISTATI/NON
  // =================================

  private separateProducts() {
    this.purchasedFavorites = [];

    this.availableFavorites = [];

    this.favorites.forEach((product) => {
      if (this.isPurchased(product)) {
        this.purchasedFavorites.push(product);
      } else {
        this.availableFavorites.push(product);
      }
    });
  }

  // =================================
  // CONTROLLO ACQUISTO
  // =================================

  isPurchased(product: Product): boolean {
    if (!this.user) {
      return false;
    }

    return this.orderService.hasPurchased(
      this.user.id,

      product.id,
    );
  }

  // =================================
  // FILTRO GENERALE DISPONIBILI
  // =================================

  get filteredAvailable() {
    return this.filterProducts(this.availableFavorites);
  }

  // =================================
  // FILTRO ACQUISTATI
  // =================================

  get filteredPurchased() {
    return this.filterProducts(this.purchasedFavorites);
  }

  // =================================
  // FUNZIONE FILTRO
  // =================================

  private filterProducts(products: Product[]) {
    const text = this.searchText

      .trim()

      .toLowerCase();

    return products.filter((product) => {
      const search =
        !text ||
        product.name

          .toLowerCase()

          .includes(text) ||
        product.category

          .toLowerCase()

          .includes(text);

      const category =
        this.selectedCategory === 'Tutti' ||
        product.category === this.selectedCategory;

      return search && category;
    });
  }

  // =================================
  // CAMBIO CATEGORIA
  // =================================

  selectCategory(category: string) {
    this.selectedCategory = category;
  }

  // =================================
  // RIMUOVI PREFERITO
  // =================================

  remove(product: Product) {
    this.plannerService.toggleFavorite(product);

    this.loadFavorites();

    this.message = '💔 Rimosso dai preferiti';

    this.clearMessage();
  }

  // =================================
  // AGGIUNGI CARRELLO
  // =================================

  addCart(product: Product) {
    if (this.isPurchased(product)) {
      this.message = '✅ Possiedi già questo planner';

      this.clearMessage();

      return;
    }

    this.cartService.add(product);

    this.message = '🛒 Aggiunto al carrello';

    this.clearMessage();
  }

  // =================================
  // CONTA PREFERITI
  // =================================

  get purchasedCount() {
    return this.purchasedFavorites.length;
  }

  get availableCount() {
    return this.availableFavorites.length;
  }

  // =================================
  // MESSAGGIO TEMPORANEO
  // =================================

  private clearMessage() {
    setTimeout(() => {
      this.message = '';
    }, 2500);
  }

  // =================================
  // TRACK
  // =================================

  trackByProduct(
    index: number,

    product: Product,
  ) {
    return product.id;
  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
  }
}
