import { Component, OnInit } from '@angular/core';

import { PlannerService } from '../../services/planner.service';
import { CartService } from '../../services/cart.service';
import { NotificationService } from '../../services/notification.service';

import { Product } from '../../models/product';

import { MESSAGES } from '../../constants/messages';

import { UserService } from '../../services/user.service';
import { OrderService } from '../../services/order.service';

import { Router } from '@angular/router';
@Component({
  selector: 'app-shop',

  templateUrl: './shop.component.html',

  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  products: Product[] = [];

  filteredProducts: Product[] = [];

  search: string = '';

  selectedCategory: string = 'Tutti';

  sort: string = 'default';

  currentUserId: number | null = null;

  categories: string[] = [
    'Tutti',

    'Elegant',

    'Lifestyle',

    'Wellness',

    'Business',
  ];

  constructor(
    private plannerService: PlannerService,

    private cartService: CartService,

    private notificationService: NotificationService,

    private userService: UserService,
    private orderService: OrderService,

    private router: Router,
  ) {}

  ngOnInit() {
    this.userService.user$.subscribe((user) => {
      if (user) {
        this.currentUserId = user.id;
      } else {
        this.currentUserId = null;
      }

      this.loadProducts();
    });
  }

  private loadProducts() {
    this.products = this.plannerService.getProducts().map((product) => ({
      ...product,

      purchased: this.isPurchased(product.id),
    }));

    this.applyFilters();
  }

  applyFilters() {
    const text = this.search.trim().toLowerCase();

    this.filteredProducts = this.products.filter((product) => {
      const categoryOk =
        this.selectedCategory === 'Tutti' ||
        product.category === this.selectedCategory;

      const searchOk =
        !text ||
        product.name.toLowerCase().includes(text) ||
        product.description.toLowerCase().includes(text) ||
        product.category.toLowerCase().includes(text);

      return categoryOk && searchOk;
    });

    this.applySort();
  }

  filterCategory(category: string) {
    this.selectedCategory = category;

    this.applyFilters();
  }

  applySort() {
    switch (this.sort) {
      case 'price-low':
        this.filteredProducts.sort((a, b) => a.price - b.price);

        break;

      case 'price-high':
        this.filteredProducts.sort((a, b) => b.price - a.price);

        break;

      case 'rating':
        this.filteredProducts.sort((a, b) => b.rating - a.rating);

        break;

      default:
        this.filteredProducts.sort((a, b) => a.id - b.id);
    }
  }

  changeSort() {
    this.applySort();
  }

  addCart(product: Product) {
    if (!this.userService.isLogged()) {
      this.notificationService.warning(MESSAGES.SHOP.LOGIN_REQUIRED);

      this.router.navigate(['/login']);

      return;
    }

    this.cartService.add(product);

    this.notificationService.success(MESSAGES.CART.ADDED);
  }

  isPurchased(productId: number): boolean {
    if (!this.currentUserId) {
      return false;
    }

    const purchased = this.orderService.getUserPlanners(this.currentUserId);

    return purchased.some((p) => p.id === productId);
  }

  toggleFavorite(product: Product) {
    if (!this.userService.isLogged()) {
      this.notificationService.warning(MESSAGES.FAVORITES.LOGIN_REQUIRED);

      this.router.navigate(['/login']);

      return;
    }

    this.plannerService.toggleFavorite(product);

    product.favorite = this.plannerService.isFavorite(product.id);

    this.notificationService.success(
      product.favorite ? MESSAGES.FAVORITES.ADDED : MESSAGES.FAVORITES.REMOVED,
    );

    this.filteredProducts = [...this.filteredProducts];
  }
}
