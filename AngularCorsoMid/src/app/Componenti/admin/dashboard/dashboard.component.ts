import { Component, OnInit, OnDestroy } from '@angular/core';

import { PlannerService } from '../../../services/planner.service';
import { UserService } from '../../../services/user.service';
import { OrderService } from '../../../services/order.service';

import { Subscription } from 'rxjs';


@Component({

selector:'app-dashboard',

templateUrl:'./dashboard.component.html',

styleUrls:['./dashboard.component.css']

})


export class DashboardComponent implements OnInit, OnDestroy {



totalProducts:number=0;

totalUsers:number=0;

totalAdmins:number=0;

activeUsers:number=0;

totalOrders:number=0;


currentDate:string='';



private subscriptions:Subscription[]=[];




constructor(

private plannerService:PlannerService,

private userService:UserService,

private orderService:OrderService

){}





ngOnInit(){


this.loadStats();



/*
================================
AGGIORNAMENTO AUTOMATICO UTENTI
================================
*/


this.subscriptions.push(

this.userService.users$
.subscribe(()=>{

this.loadStats();

})

);




/*
================================
AGGIORNAMENTO AUTOMATICO ORDINI
================================
*/


this.subscriptions.push(

this.orderService.orders$
.subscribe(()=>{

this.loadStats();

})

);



}





loadStats(){



// ===============================
// PLANNER
// ===============================


this.totalProducts =

this.plannerService.getProducts().length;





// ===============================
// UTENTI
// ===============================


const users=

this.userService.getUsers();



this.totalUsers=

users.length;



this.totalAdmins=

users.filter(

u=>u.role==='ADMIN'

).length;



this.activeUsers=

users.filter(

u=>u.enabled

).length;






// ===============================
// ORDINI
// ===============================


this.totalOrders=

this.orderService.getAllOrders().length;





// ===============================
// DATA
// ===============================


this.currentDate=

new Date().toLocaleDateString(

'it-IT',

{

day:'2-digit',

month:'2-digit',

year:'numeric'

}

);



}





ngOnDestroy(){


this.subscriptions.forEach(

s=>s.unsubscribe()

);


}




}