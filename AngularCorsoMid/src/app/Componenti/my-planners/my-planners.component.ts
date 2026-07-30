import { Component, OnInit, OnDestroy } from '@angular/core';

import { UserService } from '../../services/user.service';
import { OrderService } from '../../services/order.service';

import { User } from '../../models/user';

import { Product } from '../../models/product';

import { Subscription } from 'rxjs';



interface Planner {

id:number;

name:string;

image:string;

file:string;

category:string;

purchaseDate:string;

version:string;

downloads:number;

size:string;

favorite:boolean;

color:string;

updated:boolean;

}





@Component({

selector:'app-my-planners',

templateUrl:'./my-planners.component.html',

styleUrls:['./my-planners.component.css']

})



export class MyPlannersComponent implements OnInit, OnDestroy {



private userSubscription?:Subscription;



currentYear =
new Date().getFullYear();



user:User|null=null;



searchText:string='';



selectedCategory:string='Tutti';



downloadMessage:string='';



plannerSelected:Planner|null=null;



planners:Planner[]=[];








categories:string[]=[


'Tutti',

'Elegant',

'Lifestyle',

'Wellness',

'Business'


];









constructor(

private userService:UserService,

private orderService:OrderService

){}









ngOnInit(){



this.userSubscription =

this.userService.user$

.subscribe(user=>{



this.user=user;




if(user){



this.loadUserPlanners(user.id);



}



});



}











// =================================
// CARICA PLANNER ACQUISTATI
// =================================


private loadUserPlanners(userId:number){



const purchasedProducts:

Product[] =

this.orderService.getUserPlanners(userId);





this.planners = purchasedProducts.map(product=>({



id:product.id,


name:product.name,


image:product.image,


file:product.downloadUrl || '',



category:product.category,



purchaseDate:

new Date()

.toLocaleDateString('it-IT'),



version:

'2026 Premium',



downloads:0,



size:

'20 MB',



favorite:

product.favorite,



color:

this.getPlannerColor(product.category),



updated:false



}));



}









// =================================
// COLORE CARD
// =================================


private getPlannerColor(category:string):string{


switch(category){


case 'Elegant':

return '#f8c4dd';



case 'Wellness':

return '#dbc8ff';



case 'Business':

return '#ffdcb8';



case 'Lifestyle':

return '#c8f0df';



default:

return '#eeeeee';



}



}









// =================================
// FILTRO
// =================================


get filteredPlanners():Planner[]{



const text =

this.searchText

.trim()

.toLowerCase();





return this.planners.filter(planner=>{



const searchMatch =

!text

||

planner.name
.toLowerCase()
.includes(text)

||

planner.category
.toLowerCase()
.includes(text);





const categoryMatch =


this.selectedCategory === 'Tutti'

||

planner.category === this.selectedCategory;





return searchMatch && categoryMatch;



});



}









selectCategory(category:string){



this.selectedCategory=category;



}









// =================================
// PREFERITI
// =================================


toggleFavorite(planner:Planner){



planner.favorite =

!planner.favorite;



}









// =================================
// DOWNLOAD
// =================================


download(planner:Planner){



if(!planner.file){



this.downloadMessage =

'❌ File non disponibile';



return;



}





const link=document.createElement('a');



link.href=planner.file;



link.download=

planner.name+'.pdf';





document.body.appendChild(link);



link.click();



document.body.removeChild(link);





planner.downloads++;





this.downloadMessage =

'✅ Download completato: '

+

planner.name;







setTimeout(()=>{



this.downloadMessage='';



},3000);



}









// =================================
// STATISTICHE
// =================================


get totalDownloads(){



return this.planners.reduce(



(total,planner)=>

total + planner.downloads,

0



);



}









// =================================
// ANTEPRIMA
// =================================


preview(planner:Planner){



this.plannerSelected=planner;



}









closePreview(){



this.plannerSelected=null;



}









ngOnDestroy(){



this.userSubscription?.unsubscribe();



}



}