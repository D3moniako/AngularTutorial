import { Component, OnInit, OnDestroy } from '@angular/core';

import { UserService } from '../../services/user.service';
import { OrderService } from '../../services/order.service';
import { PlannerService } from '../../services/planner.service';

import { User } from '../../models/user';
import { Product } from '../../models/product';

import { Subscription } from 'rxjs';



interface PlannerView {

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

product:Product;

}



@Component({

selector:'app-my-planners',

templateUrl:'./my-planners.component.html',

styleUrls:['./my-planners.component.css']

})


export class MyPlannersComponent implements OnInit, OnDestroy {



private userSubscription?:Subscription;



user:User|null=null;


currentYear:number =
new Date().getFullYear();



searchText:string='';


selectedCategory:string='Tutti';


downloadMessage:string='';



plannerSelected:PlannerView|null=null;



planners:PlannerView[]=[];



categories:string[]=[

'Tutti',

'Elegant',

'Lifestyle',

'Wellness',

'Business'

];





constructor(

private userService:UserService,

private orderService:OrderService,

private plannerService:PlannerService

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






private loadUserPlanners(userId:number){



const products:Product[]=

this.orderService.getUserPlanners(userId);





this.planners = products.map(product=>({



id:product.id,


name:product.name,


image:product.image,


file:product.downloadUrl || '',



category:product.category,



purchaseDate:

new Date().toLocaleDateString('it-IT'),



version:'2026 Premium',



downloads:0,



size:'20 MB',



favorite:

this.plannerService.isFavorite(product.id),



color:

this.getPlannerColor(product.category),



updated:false,


product:product



}));



}







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







get filteredPlanners(){



const text=this.searchText

.trim()

.toLowerCase();




return this.planners.filter(p=>{



const search =


!text ||


p.name.toLowerCase().includes(text)


||


p.category.toLowerCase().includes(text);





const category =


this.selectedCategory==='Tutti'


||


p.category===this.selectedCategory;



return search && category;



});


}








selectCategory(category:string){


this.selectedCategory=category;


}









toggleFavorite(planner:PlannerView){



this.plannerService.toggleFavorite(

planner.product

);



planner.favorite =

this.plannerService.isFavorite(

planner.id

);



}









download(planner:PlannerView){



if(!planner.file){


this.downloadMessage=

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



this.downloadMessage=

'✅ Download completato: '

+

planner.name;



setTimeout(()=>{


this.downloadMessage='';


},3000);



}









preview(planner:PlannerView){


this.plannerSelected=planner;


}







closePreview(){


this.plannerSelected=null;


}







get totalDownloads(){



return this.planners.reduce(

(total,p)=>total+p.downloads,

0

);



}







ngOnDestroy(){


this.userSubscription?.unsubscribe();


}



}