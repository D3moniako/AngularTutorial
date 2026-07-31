import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { Router } from '@angular/router';

import { UserService } from '../../../services/user.service';

import { User } from '../../../models/user';



@Component({

selector:'app-header',

templateUrl:'./header.component.html',

styleUrls:['./header.component.css']

})


export class HeaderComponent implements OnInit, OnDestroy {



menuOpen:boolean=false;


user:User|null=null;



private userSubscription!:Subscription;







menuItems=[



{
label:'Home',
link:'/',
icon:'🏠'
},


{
label:'Shop',
link:'/shop',
icon:'🛒'
},


{
label:'I miei Planner',
link:'/my-planners',
icon:'📅'
},


{
label:'I miei ordini',
link:'/my-orders',
icon:'📦'
},


{
label:'Preferiti',
link:'/favorites',
icon:'❤️'
},


{
label:'Chi siamo',
link:'/about',
icon:'🌸'
},


{
label:'Contatti',
link:'/contact',
icon:'✉️'
},


{
label:'Carrello',
link:'/cart',
icon:'🛍️'
}



];









constructor(

private userService:UserService,

private router:Router

){}









ngOnInit(){



this.userSubscription =

this.userService.user$

.subscribe(user=>{


this.user=user;


});



}










toggleMenu(){


this.menuOpen=!this.menuOpen;


}









logout(){


this.userService.logout();


this.menuOpen=false;


this.router.navigate(['/login']);


}









ngOnDestroy(){


if(this.userSubscription){


this.userSubscription.unsubscribe();


}


}



}