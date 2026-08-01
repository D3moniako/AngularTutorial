import { Component, OnInit, OnDestroy } from '@angular/core';

import { UserService } from '../../services/user.service';
import { OrderService } from '../../services/order.service';
import { PlannerService } from '../../services/planner.service';

import { User } from '../../models/user';
import { Product } from '../../models/product';

import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


interface PlannerView {

id:number;

name:string;

image:string;

file:string;

pdfPreview:string;

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

private ordersSubscription?:Subscription;



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

private plannerService:PlannerService,

private router:Router,

){}





ngOnInit(){


this.userSubscription =

this.userService.user$

.subscribe(user=>{


this.user=user;



if(user){


this.loadUserPlanners(user.id);



if(!this.ordersSubscription){

this.listenOrders(user.id);

}


}


});

}



//
// CARICA PLANNER ACQUISTATI
//

private loadUserPlanners(userId:number){



const products:Product[] =

this.orderService.getUserPlanners(userId);





this.planners = products.map(product=>({



id:product.id,


name:product.name,


image:product.image,



file:product.downloadUrl || '',



pdfPreview:

product.downloadUrl || '',



category:product.category,



purchaseDate:

this.getPurchaseDate(

product.id,

userId

),



version:

'2026 Premium',



downloads:

this.getDownloads(product.id),



size:

'20 MB',



favorite:

this.plannerService.isFavorite(

product.id

),



color:

this.getPlannerColor(

product.category

),



updated:false,



product:product



}));



}






//
// DATA ACQUISTO
//

private getPurchaseDate(

productId:number,

userId:number

):string{



const orders =

this.orderService.getUserOrders(userId);



for(const order of orders){



const product =

order.products.find(

p=>p.id===productId

);



if(product){



return new Date(

order.purchaseDate

)

.toLocaleDateString('it-IT');

}


}



return '';

}






//
// DOWNLOAD SALVATI
//

private getDownloads(productId:number):number{


const value =

localStorage.getItem(

'downloads_'+productId

);



return value ?

Number(value)

:

0;


}






private saveDownloads(

productId:number,

value:number

){


localStorage.setItem(

'downloads_'+productId,

String(value)

);


}







//
// COLORI CARD
//

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







//
// FILTRO
//

get filteredPlanners(){


const text =

this.searchText

.trim()

.toLowerCase();



return this.planners.filter(p=>{


const search =

!text ||

p.name.toLowerCase()

.includes(text)

||

p.category.toLowerCase()

.includes(text);



const category =

this.selectedCategory==='Tutti'

||

p.category===this.selectedCategory;



return search && category;



});


}







selectCategory(category:string){


this.selectedCategory = category;


}







//
// PREFERITI
//




toggleFavorite(product:Product){

product.favorite = !product.favorite;

this.plannerService.toggleFavorite(product);


// aggiorna lo stato anche nel planner contenitore

const planner = this.planners.find(
p => p.product.id === product.id
);


if(planner){

planner.favorite = product.favorite;

}


this.planners = [...this.planners];

}








 // =======================================
// DOWNLOAD PDF
// =======================================

download(planner: PlannerView) {

  console.log('ENTRATO NEL DOWNLOAD');
  console.log('PLANNER:', planner);
  console.log('FILE:', planner.file);


  if (!this.user) {

    this.downloadMessage = '🔒 Devi effettuare il login';
    this.clearDownloadMessage();
    return;

  }


  if (!planner.file) {

    this.downloadMessage = '❌ PDF non disponibile';
    this.clearDownloadMessage();
    return;

  }


  try {

    const link = document.createElement('a');

    link.href = planner.file;

    link.target = '_blank';

    link.download = planner.name + '.pdf';


    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);


    planner.downloads++;

    this.saveDownloads(
      planner.id,
      planner.downloads
    );


    this.downloadMessage =
      '✅ Download completato: ' + planner.name;

    this.clearDownloadMessage();


  } catch(e) {

    console.error('Errore download PDF:', e);

    this.downloadMessage =
      '❌ Errore durante il download';

    this.clearDownloadMessage();

  }

}







private clearDownloadMessage(){


setTimeout(()=>{


this.downloadMessage='';


},3000);


}








//
// ANTEPRIMA
//

preview(planner:PlannerView){



this.plannerSelected = planner;


}






openPdf(planner:PlannerView){


if(planner.pdfPreview){


window.open(

planner.pdfPreview,

'_blank'

);


}

}
openProduct(product:Product){

this.router.navigate([
'/products',
product.id
]);

}






closePreview(){


this.plannerSelected=null;


}








get totalDownloads(){



return this.planners.reduce(

(total,p)=>

total+p.downloads,

0

);


}








//
// AGGIORNA ORDINI
//

private listenOrders(userId:number){



this.ordersSubscription =

this.orderService.orders$

.subscribe(()=>{


this.loadUserPlanners(userId);



});


}







ngOnDestroy(){


this.userSubscription?.unsubscribe();


this.ordersSubscription?.unsubscribe();


}



}