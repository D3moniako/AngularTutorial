import { Injectable } from '@angular/core';

import { Order } from '../models/order';
import { Product } from '../models/product';


@Injectable({
providedIn:'root'
})


export class OrderService {



/*
================================================
 DATABASE TEMPORANEO ORDINI

 Futuro:
 Angular
    |
 Spring Boot
    |
 PostgreSQL

================================================
*/


private orders:Order[] = this.loadOrders();







constructor(){}









/*
================================================
 AGGIUNGI ORDINE
================================================
*/


addOrder(order:Order){



this.orders.push(order);


this.saveOrders();


}









/*
================================================
 ORDINI UTENTE
================================================
*/


getUserOrders(userId:number):Order[]{



return this.orders.filter(


order=>order.userId===userId


);


}









/*
================================================
 I MIEI PLANNER DIGITALI

 Recupera tutti i prodotti acquistati

================================================
*/


getUserPlanners(userId:number):Product[]{


const orders=this.getUserOrders(userId);


const products:Product[]=[];


orders.forEach(order=>{


if(order.downloadAvailable){


order.products.forEach(product=>{


const alreadyExists = products.some(
p=>p.id===product.id
);


if(!alreadyExists){

products.push(product);

}


});


}


});


return products;


}









/*
================================================
 TUTTI GLI ORDINI

 Futuro ADMIN PANEL

================================================
*/


getAllOrders():Order[]{



return [...this.orders];


}









/*
================================================
 LOCAL STORAGE

 Temporaneo lato frontend

================================================
*/


private saveOrders(){



localStorage.setItem(

'orders',

JSON.stringify(this.orders)

);


}









private loadOrders():Order[]{


try{


const data = JSON.parse(

localStorage.getItem('orders') || '[]'

);


return data as Order[];


}
catch{


return [];


}


}


}