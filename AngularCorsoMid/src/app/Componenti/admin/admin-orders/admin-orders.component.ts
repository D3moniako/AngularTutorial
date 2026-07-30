import { Component, OnInit } from '@angular/core';

import { OrderService } from '../../../services/order.service';

import { Order } from '../../../models/order';



@Component({

selector:'app-admin-orders',

templateUrl:'./admin-orders.component.html',

styleUrls:['./admin-orders.component.css']

})


export class AdminOrdersComponent implements OnInit {



orders:Order[]=[];


filteredOrders:Order[]=[];



searchText:string='';


selectedStatus:string='Tutti';



message:string='';



totalOrders:number=0;


totalRevenue:number=0;





constructor(

private orderService:OrderService

){}







ngOnInit(){



this.orderService.orders$

.subscribe(orders=>{


this.orders=[...orders];


this.calculateStats();


this.filterOrders();


});



}









loadOrders(){



this.orders=this.orderService.getAllOrders();


this.calculateStats();


this.filterOrders();



}









calculateStats(){



this.totalOrders=this.orders.length;



this.totalRevenue=this.orders.reduce(

(total,order)=>

total + order.total,

0

);



}









filterOrders(){



let result=[...this.orders];





if(this.searchText.trim()){



const text=this.searchText.toLowerCase();



result=result.filter(order=>



(order.customerName || '')

.toLowerCase()

.includes(text)



||



(order.customerEmail || '')

.toLowerCase()

.includes(text)



);



}







if(this.selectedStatus!=='Tutti'){



result=result.filter(order=>


order.status===this.selectedStatus


);



}





this.filteredOrders=result;



}









changeStatus(order:Order){



let newStatus:Order['status'];





if(order.status==='PAGATO'){



newStatus='IN_ATTESA';



}

else if(order.status==='IN_ATTESA'){



newStatus='ANNULLATO';



}

else{



newStatus='PAGATO';



}





this.orderService.updateStatus(

order.id,

newStatus

);



this.message='✅ Stato ordine aggiornato';



}









deleteOrder(id:number){



if(confirm('Eliminare definitivamente questo ordine?')){



this.orderService.deleteOrder(id);



this.message='🗑 Ordine eliminato';



}



}









trackByOrder(

index:number,

order:Order

){



return order.id;



}






}