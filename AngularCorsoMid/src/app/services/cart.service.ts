import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { Product } from '../models/product';

import { CartItem } from '../models/cart-item';



@Injectable({
providedIn:'root'
})


export class CartService {



private items:CartItem[] =
this.loadCart();





private cartSubject =
new BehaviorSubject<CartItem[]>(
[...this.items]
);





cart$ =
this.cartSubject.asObservable();







constructor(){}









add(product:Product){



const existing =
this.items.find(

item =>
item.product.id === product.id

);







if(existing){



existing.quantity++;



existing.subtotal =
existing.quantity *
existing.product.price;



}

else{



this.items.push({



id:
Date.now(),



product:
{...product},



quantity:1,



subtotal:
product.price



});



}





this.update();



}









remove(id:number){



this.items =
this.items.filter(


item =>
item.id !== id


);



this.update();



}









increase(item:CartItem){



item.quantity++;



item.subtotal =
item.quantity *
item.product.price;



this.update();



}









decrease(item:CartItem){



if(item.quantity>1){



item.quantity--;



item.subtotal =
item.quantity *
item.product.price;



this.update();



}

else{



this.remove(item.id);



}



}









clear(){



this.items=[];



this.update();



}









getCart():CartItem[]{


return [...this.items];


}









getItems():CartItem[]{


return [...this.items];


}









getTotal():number{



return this.items.reduce(



(total,item)=>

total + item.subtotal,

0


);



}









getCount():number{



return this.items.reduce(



(total,item)=>

total + item.quantity,

0


);



}









private update(){



this.saveCart();



this.cartSubject.next(

[...this.items]

);



}









private saveCart(){



localStorage.setItem(


'cart',


JSON.stringify(this.items)


);



}









private loadCart():CartItem[]{



try{



const data =
localStorage.getItem('cart');



if(!data){

return [];

}



return JSON.parse(data);



}

catch{



return [];

}



}



}