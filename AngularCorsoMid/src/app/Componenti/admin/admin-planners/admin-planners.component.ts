import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { PlannerService } from '../../../services/planner.service';

import { Product } from '../../../models/product';



@Component({

selector:'app-admin-planners',

templateUrl:'./admin-planners.component.html',

styleUrls:['./admin-planners.component.css']

})


export class AdminPlannersComponent implements OnInit {



private subscription?:Subscription;



products:Product[]=[];

filteredProducts:Product[]=[];



searchText:string='';


selectedCategory:string='Tutti';



categories:string[]=[];



message:string='';



editing:boolean=false;





totalProducts:number=0;


premiumCount:number=0;


averagePrice:number=0;


categoryCount:number=0;







newPlanner:Product={


id:0,

name:'',

image:'',

price:0,

category:'',

description:'',

badge:'NUOVO',

rating:0,

favorite:false,

downloadUrl:'',

reviews:[]


};









constructor(

private plannerService:PlannerService

){}









ngOnInit(){

this.loadProducts();

}









loadProducts(){



this.products =

this.plannerService.getProducts();



this.updateStats();


this.loadCategories();


this.filterProducts();



}









updateStats(){



this.totalProducts=

this.products.length;





this.premiumCount=

this.products.filter(

p=>

p.badge==='PREMIUM'

||

p.badge==='NUOVO'

).length;





this.averagePrice=

this.products.length

?

this.products.reduce(

(sum,p)=>sum+p.price,

0

)

/

this.products.length

:

0;





this.categoryCount=

new Set(

this.products.map(

p=>p.category

)

).size;



}









resetForm(){



this.newPlanner={


id:0,

name:'',

image:'',

price:0,

category:'',

description:'',

badge:'NUOVO',

rating:0,

favorite:false,

downloadUrl:'',

reviews:[]


};



this.editing=false;



}









savePlanner(){



if(


!this.newPlanner.name.trim()

||


!this.newPlanner.price

||


!this.newPlanner.category.trim()

){



this.showMessage(

'⚠️ Inserisci nome, prezzo e categoria'

);


return;



}








if(this.editing){



this.plannerService.updateProduct(

this.newPlanner

);



this.showMessage(

'✅ Planner modificato'

);



}

else{



this.newPlanner.id=

Date.now();





this.plannerService.addPlanner(

this.newPlanner

);



this.showMessage(

'🎉 Planner pubblicato'

);



}








this.resetForm();


this.loadProducts();



}









editPlanner(product:Product){



this.newPlanner={


...product,


reviews:

product.reviews || []

};





this.editing=true;





window.scrollTo({

top:0,

behavior:'smooth'

});



}









duplicatePlanner(product:Product){



const copy:Product={



...product,



id:Date.now(),



name:

product.name+' Copia'



};





this.plannerService.addPlanner(

copy

);





this.showMessage(

'📋 Planner duplicato'

);



this.loadProducts();



}









deletePlanner(id:number){



const ok = confirm(

'Eliminare definitivamente questo planner?'

);




if(!ok){

return;

}





this.plannerService.deleteProduct(

id

);





this.showMessage(

'🗑 Planner eliminato'

);



this.loadProducts();



}









loadCategories(){



this.categories=[



'Tutti',



...Array.from(

new Set(

this.products.map(

p=>p.category

)

)

)



];



}









filterProducts(){



let result=[...this.products];






if(this.searchText.trim()){



const text=

this.searchText.toLowerCase();





result=result.filter(p=>



p.name.toLowerCase()

.includes(text)



||



p.category.toLowerCase()

.includes(text)



||



p.description.toLowerCase()

.includes(text)



);



}








if(this.selectedCategory!=='Tutti'){



result=result.filter(p=>

p.category===this.selectedCategory

);



}







this.filteredProducts=result;



}









showMessage(text:string){



this.message=text;



setTimeout(()=>{


this.message='';


},3000);



}









/*ngOnDestroy(){



this.subscription?.unsubscribe();



}*/



}