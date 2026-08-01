import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

export interface Product {

id:number;
name:string;
image:string;
price:number;
category:string;
description:string;
favorite:boolean;
badge:string;
rating:number;
downloadUrl?:string;

}


@Component({

selector:'app-product-card',

templateUrl:'./product-card.component.html',

styleUrls:['./product-card.component.css']

})


export class ProductCardComponent {
constructor(
private router:Router
){}

@Input() product!: Product;


// modalità card
@Input() mode:'shop'|'owned'='shop';


// visibilità
@Input() showFavorite:boolean = true;

@Input() showCart:boolean = true;

@Input() showDescription:boolean = true;

@Input() purchased:boolean=false;
// dati acquisto
@Input() purchaseDate:string='';

@Input() version:string='';

@Input() size:string='';

@Input() downloads:number=0;



@Output() addCart = new EventEmitter<Product>();

@Output() favorite = new EventEmitter<Product>();

@Output() openProduct = new EventEmitter<Product>();

@Output() download = new EventEmitter<Product>();

@Output() preview = new EventEmitter<Product>();




// apertura dettagli

openDetails(){

  if(!this.product){
    return;
  }

  this.router.navigate(
    ['/products', this.product.id],
    {
      replaceUrl:false
    }
  ).then(() => {

    window.scrollTo({
      top:0,
      behavior:'smooth'
    });

  });

}




// carrello

addToCart(){

this.addCart.emit(this.product);

}




// preferiti

toggleFavorite(){

this.favorite.emit(this.product);

}




// download planner acquistato

downloadFile(){

this.download.emit(this.product);

}




// anteprima

openPreview(){

this.preview.emit(this.product);

}



}