import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { Order } from '../models/order';

import { Product } from '../models/product';
import { NotificationCenterService } from './notification-center.service';


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









constructor(private notificationCenterService : NotificationCenterService){}









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


const oldStatus = order.status;


order.status=status;



// NOTIFICA PAGAMENTO COMPLETATO

if(
oldStatus!=='PAGATO'
&&
status==='PAGATO'
){


this.notificationCenterService.add({

id:Date.now(),

title:'Pagamento completato',

message:
'Il tuo ordine #'+order.id+' è stato confermato. I tuoi planner sono disponibili.',

icon:'📦',

type:'ORDER',

date:new Date(),

read:false

});




// NOTIFICA DOWNLOAD

if(order.downloadAvailable){


this.notificationCenterService.add({

id:Date.now(),

title:'Download disponibile',

message:
'I tuoi planner digitali dell’ordine #'+order.id+' sono pronti.',

icon:'📥',

type:'DOWNLOAD',

date:new Date(),

read:false

});


}


}



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