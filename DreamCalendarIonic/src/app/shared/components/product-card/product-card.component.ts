import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from '../../../core/models/product';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {

  constructor(
    private router: Router
  ) {}


  @Input() product!: Product;


  // modalità card
  @Input() mode: 'shop' | 'owned' = 'shop';


  // visibilità elementi
  @Input() showFavorite = true;

  @Input() showCart = true;

  @Input() showDescription = true;


  // acquisto
  @Input() purchased = false;

  @Input() purchaseDate = '';

  @Input() version = '';

  @Input() size = '';

  @Input() downloads = 0;



  // eventi

  @Output() addCart = new EventEmitter<Product>();

  @Output() favorite = new EventEmitter<Product>();

  @Output() openProduct = new EventEmitter<Product>();

  @Output() download = new EventEmitter<Product>();

  @Output() preview = new EventEmitter<Product>();



  // apre dettaglio prodotto

  openDetails() {

    if (!this.product) {
      return;
    }


    this.router.navigate(
      ['/products', this.product.id]
    )
    .then(() => {

      window.scrollTo({
        top:0,
        behavior:'smooth'
      });

    });

  }



  // carrello

  addToCart() {

    this.addCart.emit(this.product);

  }



  // preferiti

  toggleFavorite() {

    this.favorite.emit(this.product);

  }



  // download

  downloadFile() {

    this.download.emit(this.product);

  }



  // anteprima

  openPreview() {

    this.preview.emit(this.product);

  }

}