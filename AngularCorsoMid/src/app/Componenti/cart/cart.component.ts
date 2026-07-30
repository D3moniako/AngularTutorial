import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item';



@Component({

selector:'app-cart',

templateUrl:'./cart.component.html',

styleUrls:['./cart.component.css']

})


export class CartComponent implements OnInit, OnDestroy {



cart:CartItem[]=[];


total:number=0;


message:string='';



private subscription?:Subscription;





constructor(

private cartService:CartService

){}








ngOnInit(){



this.subscription = 

this.cartService.cart$

.subscribe(items=>{


this.cart=[...items];


this.total=this.cartService.getTotal();



});



}









increase(item:CartItem){


this.cartService.increase(item);



this.showMessage(
'Quantità aggiornata'
);



}








decrease(item:CartItem){



this.cartService.decrease(item);



this.showMessage(
'Quantità aggiornata'
);



}








remove(id:number){



this.cartService.remove(id);



this.showMessage(
'Prodotto rimosso dal carrello'
);



}








clear(){



this.cartService.clear();



this.showMessage(
'Carrello svuotato'
);



}









showMessage(text:string){



this.message=text;



setTimeout(()=>{


this.message='';


},2500);



}









trackById(

index:number,

item:CartItem

){


return item.id;


}









ngOnDestroy(){


this.subscription?.unsubscribe();


}



}