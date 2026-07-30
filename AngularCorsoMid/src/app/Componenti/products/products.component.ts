import { Component, OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { PlannerService } from '../../services/planner.service';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';

import { Product, Review } from '../../models/product';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

import { Subscription } from 'rxjs';



@Component({

selector:'app-products',

templateUrl:'./products.component.html',

styleUrls:['./products.component.css']

})


export class ProductsComponent implements OnInit, OnDestroy {



product:Product | undefined;



relatedProducts:Product[]=[];



quantity:number=1;





// Nuova recensione

newReview = {

rating:5,

comment:''

};






// Utente loggato

user:User|null=null;



// Permesso recensione

canReview:boolean=false;



private userSubscription?:Subscription;








constructor(

private route:ActivatedRoute,

private plannerService:PlannerService,

private cartService:CartService,

private userService:UserService,

private orderService:OrderService

){}









ngOnInit(){



const id = Number(

this.route.snapshot.paramMap.get('id')

);





const result =

this.plannerService.getProduct(id);






if(result){



this.product=result;


this.quantity=1;


this.loadRelatedProducts();


// controllo acquisto dopo caricamento prodotto

this.checkReviewPermission();


}








this.userSubscription =

this.userService.user$

.subscribe(user=>{



this.user=user;



// controllo quando arriva utente

this.checkReviewPermission();



});



}











// =================================
// CONTROLLO RECENSIONE VERIFICATA
// =================================


checkReviewPermission(){



if(!this.user || !this.product){


this.canReview=false;


return;


}





this.canReview =

this.orderService.hasPurchased(


this.user.id,


this.product.id


);



}











// =================================
// PRODOTTI CORRELATI
// =================================


loadRelatedProducts(){



if(!this.product){


return;


}







const products =

this.plannerService.getProducts();






this.relatedProducts =

products.filter(


p => p.id !== this.product!.id


).slice(0,3);



}











// =================================
// QUANTITA'
// =================================


increaseQuantity(){


this.quantity++;


}








decreaseQuantity(){



if(this.quantity>1){


this.quantity--;


}



}









// =================================
// CARRELLO
// =================================


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









// =================================
// PREFERITI
// =================================


toggleFavorite(){



if(!this.product){


return;


}






this.plannerService.toggleFavorite(

this.product

);






this.product =

this.plannerService.getProduct(

this.product.id

);



}











// =================================
// RECENSIONE CLIENTE VERIFICATO
// =================================


addReview(){



if(!this.product){


return;


}






if(!this.canReview){



alert(

'Devi acquistare questo planner prima di recensirlo'

);


return;


}







if(!this.newReview.comment.trim()){



alert(

'Inserisci un commento'

);


return;


}







const review:Review={



id:Date.now(),



// nome automatico account

user:this.user?.name || 'Utente',



rating:Number(

this.newReview.rating

),



comment:this.newReview.comment,



date:new Date()

.toLocaleDateString('it-IT'),



// automatico

verified:true



};








this.plannerService.addReview(

this.product.id,

review

);








this.product =

this.plannerService.getProduct(

this.product.id

);








this.newReview={


rating:5,


comment:''



};



}











// =================================
// CARRELLO PRODOTTI CORRELATI
// =================================


addRelatedToCart(product:Product){



this.cartService.add(product);






alert(

'🛒 '+product.name+' aggiunto al carrello'

);



}









ngOnDestroy(){



this.userSubscription?.unsubscribe();



}



}