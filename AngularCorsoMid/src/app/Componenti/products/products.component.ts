import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { PlannerService } from '../../services/planner.service';
import { CartService } from '../../services/cart.service';

import { Product } from '../../models/product';



@Component({

selector:'app-products',

templateUrl:'./products.component.html',

styleUrls:['./products.component.css']

})


export class ProductsComponent implements OnInit {



/*
================================================
 PRODOTTO SELEZIONATO
================================================
*/


product:Product | undefined;



/*
================================================
 PRODOTTI CORRELATI
================================================
*/


relatedProducts:Product[]=[];



/*
================================================
 QUANTITA'
================================================
*/


quantity:number=1;






constructor(

private route:ActivatedRoute,

private plannerService:PlannerService,

private cartService:CartService

){}







/*
================================================
 CARICAMENTO PAGINA
================================================
*/


ngOnInit(){



const id = Number(

this.route.snapshot.paramMap.get('id')

);





const result = this.plannerService.getProduct(id);





if(result){


this.product=result;


this.quantity=1;


this.loadRelatedProducts();


}



}








/*
================================================
 PRODOTTI SIMILI
================================================
*/


loadRelatedProducts(){



if(!this.product){


return;


}





const products=this.plannerService.getProducts();





this.relatedProducts = products.filter(



p => p.id !== this.product!.id



).slice(0,3);





}








/*
================================================
 GESTIONE QUANTITA'
================================================
*/


increaseQuantity(){


this.quantity++;


}







decreaseQuantity(){



if(this.quantity>1){


this.quantity--;


}



}









/*
================================================
 AGGIUNTA CARRELLO
================================================
*/


addCart(){



if(!this.product){


return;


}





for(let i=0;i<this.quantity;i++){



this.cartService.add(

this.product

);



}







alert(

'🛒 '+this.product.name+' aggiunto al carrello'

);



}








/*
================================================
 PREFERITI
================================================
*/


toggleFavorite(){



if(!this.product){


return;


}





this.plannerService.toggleFavorite(

this.product

);



}








/*
================================================
 PRODOTTI CORRELATI
================================================
*/


addRelatedToCart(product:Product){



this.cartService.add(product);





alert(

'🛒 '+product.name+' aggiunto al carrello'

);



}



}