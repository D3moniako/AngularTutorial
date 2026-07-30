import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { Order } from '../models/order';

import { Product } from '../models/product';



@Injectable({

providedIn:'root'

})


export class OrderService {



private orders:Order[] =
this.loadOrders();




// comunica modifiche ordini a tutta l'app

private ordersSubject =
new BehaviorSubject<Order[]>(this.orders);



orders$ =
this.ordersSubject.asObservable();







constructor(){}









/*
================================================
 CREA ORDINE
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
 PLANNER DIGITALI ACQUISTATI
================================================
*/


getUserPlanners(userId:number):Product[]{



const orders =
this.getUserOrders(userId);



const products:Product[]=[];




orders.forEach(order=>{



if(order.downloadAvailable){



order.products.forEach(product=>{



const exists =
products.some(

p=>p.id===product.id

);





if(!exists){



products.push(product);



}



});



}



});




return products;



}









/*
================================================
 TUTTI ORDINI ADMIN
================================================
*/


getAllOrders():Order[]{



return this.orders.map(

order=>({...order})

);



}









/*
================================================
 CONTROLLO ACQUISTO
================================================
*/


hasPurchased(

userId:number,

productId:number

):boolean{



return this.getUserOrders(userId).some(


order=>


order.downloadAvailable &&


order.products.some(


product=>

product.id===productId


)


);



}









/*
================================================
 CAMBIO STATO ORDINE ADMIN
================================================
*/


updateStatus(

id:number,

status:Order['status']

){


const index=this.orders.findIndex(

o=>o.id===id

);



if(index!==-1){



this.orders[index]={

...this.orders[index],

status:status

};



this.saveOrders();



}



}








/*
================================================
 ELIMINA ORDINE ADMIN
================================================
*/


deleteOrder(id:number){



this.orders=this.orders.filter(


o=>o.id!==id


);



// forza aggiornamento immediato

this.ordersSubject.next(

[...this.orders]

);



this.saveOrders();



}









/*
================================================
 CERCA ORDINE
 FUTURO ADMIN
================================================
*/


getOrderById(id:number):Order|null{



return this.orders.find(

order=>order.id===id

) || null;


}









/*
================================================
 LOCAL STORAGE
================================================
*/


private saveOrders(){



localStorage.setItem(

'orders',

JSON.stringify(this.orders)

);



// aggiorna tutte le pagine collegate

this.ordersSubject.next(

[...this.orders]

);



}









private loadOrders():Order[]{



try{



const data=

localStorage.getItem('orders');




return data ?

JSON.parse(data)

:

[];



}

catch{



return [];

}



}



}