import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from '../../services/order.service';

import { Order } from '../../models/order';

import { Product } from '../../models/product';

import { Router } from '@angular/router';


import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Subscription } from 'rxjs';

@Component({

selector:'app-my-orders',

templateUrl:'./my-orders.component.html',

styleUrls:['./my-orders.component.css']

})



export class MyOrdersComponent implements OnInit, OnDestroy {


/*
================================================
 DATI ORDINI
================================================
*/


orders:Order[]=[];


filteredOrders:Order[]=[];



/*
================================================
 FILTRI
================================================
*/


searchText:string='';


filter:

'ALL'

|

'PAGATO'

|

'IN_ATTESA'

|

'ANNULLATO'

=

'ALL';






/*
================================================
 STATISTICHE
================================================
*/


totalSpent:number=0;


downloadCount:number=0;


availableDownloads:number=0;






/*
================================================
 MODALE
================================================
*/


selectedOrder:Order|null=null;


user:User|null=null;

private userSubscription?:Subscription;



constructor(


private orderService:OrderService,

private userService:UserService,

private router:Router


){}









ngOnInit(){


this.userSubscription =

this.userService.user$

.subscribe(user=>{


this.user=user;


if(user){

this.loadOrders();

}else{


this.orders=[];

this.filteredOrders=[];


}


});


}









/*
================================================
 CARICA ORDINI UTENTE
================================================
*/


loadOrders(){


if(!this.user){

return;

}


this.orders =

this.orderService.getUserOrders(

this.user.id

);



this.calculateStats();


this.applyFilters();


}









/*
================================================
 STATISTICHE
================================================
*/


calculateStats(){



this.totalSpent =

this.orders

.filter(

o=>o.status==='PAGATO'

)

.reduce(

(sum,o)=>sum+o.total,

0

);






this.downloadCount =

this.orders

.filter(

o=>o.status==='PAGATO'

)

.reduce(

(sum,o)=>sum+o.products.length,

0

);







this.availableDownloads =

this.orders

.filter(

o=>

o.downloadAvailable

&&

o.status==='PAGATO'

)

.reduce(

(sum,o)=>sum+o.products.length,

0

);



}









/*
================================================
 FILTRI E RICERCA
================================================
*/


applyFilters(){



let result=[...this.orders];





if(this.filter!=='ALL'){


result = result.filter(

order =>

order.status===this.filter

);


}







if(this.searchText.trim()!==''){



const search =

this.searchText.toLowerCase();





result = result.filter(

order =>





order.id.toString()

.includes(search)





||

order.customerName

?.toLowerCase()

.includes(search)





||

order.customerEmail

?.toLowerCase()

.includes(search)



);



}







this.filteredOrders=result;



}









/*
================================================
 DOWNLOAD
================================================
*/


downloadOrder(order:Order){





if(

!order.downloadAvailable

){



alert(

'Download non disponibile'

);



return;


}







/*
qui collegheremo

backend + file digitale

*/




alert(

'Download disponibile per ordine #'+order.id

);



}









/*
================================================
 DETTAGLI ORDINE
================================================
*/


openDetails(order:Order){


this.selectedOrder=order;



}







closeDetails(){


this.selectedOrder=null;


}









/*
================================================
 TORNA ALLO SHOP
================================================
*/


goShop(){


this.router.navigate([

'/shop'

]);


}



ngOnDestroy(){

this.userSubscription?.unsubscribe();

}


}