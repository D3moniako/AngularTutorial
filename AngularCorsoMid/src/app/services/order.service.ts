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





private ordersSubject =

new BehaviorSubject<Order[]>(

[...this.orders]

);



orders$ =

this.ordersSubject.asObservable();









constructor(){}









/*
================================================
 CREA ORDINE
================================================
*/


addOrder(order:Order){


const exists =
this.orders.some(
o=>o.id===order.id
);


if(!exists){

this.orders.push(order);

this.saveOrders();

}


}









/*
================================================
 ORDINI UTENTE
================================================
*/


getUserOrders(userId:number):Order[]{



return this.orders.filter(


order =>

order.userId===userId


);



}









/*
================================================
 PLANNER DIGITALI ACQUISTATI
 SOLO PAGATI
================================================
*/


getUserPlanners(userId:number):Product[]{



const orders =

this.getUserOrders(userId);




const products:Product[]=[];





orders.forEach(order=>{





if(


order.status==='PAGATO'


&&


order.downloadAvailable


){





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



order =>



order.status==='PAGATO'



&&



order.downloadAvailable



&&



order.products.some(



product =>

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



const order =

this.orders.find(

o=>o.id===id

);





if(order){



order.status=status;



this.saveOrders();



}



}









/*
================================================
 ELIMINA ORDINE ADMIN
================================================
*/


deleteOrder(id:number){



this.orders =

this.orders.filter(


o=>o.id!==id


);





this.saveOrders();



}









/*
================================================
 CERCA ORDINE
================================================
*/


getOrderById(id:number):Order|null{



return this.orders.find(

order=>order.id===id

)

||

null;



}









/*
================================================
 ORDINI PAGATI
 FUTURO ADMIN / DASHBOARD
================================================
*/


getPaidOrders():Order[]{



return this.orders.filter(

order =>

order.status==='PAGATO'


);



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


/*
===========================================
ULTIMO ORDINE UTENTE
===========================================
*/

getLastOrder(userId:number):Order|null{

const orders=this.getUserOrders(userId);

if(orders.length===0){

return null;

}

return orders.sort((a,b)=>

new Date(b.purchaseDate).getTime()

-

new Date(a.purchaseDate).getTime()

)[0];

}



/*
===========================================
NUMERO ORDINI
===========================================
*/

countUserOrders(userId:number):number{

return this.getUserOrders(userId).length;

}
}