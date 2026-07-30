import { Component, OnInit } from '@angular/core';

import { PlannerService } from '../../../services/planner.service';

import { Product } from '../../../models/product';



@Component({

selector:'app-admin-planners',

templateUrl:'./admin-planners.component.html',

styleUrls:['./admin-planners.component.css']

})


export class AdminPlannersComponent implements OnInit {



products:Product[]=[];
filteredProducts:Product[]=[];


searchText:string='';


selectedCategory:string='Tutti';


categories:string[]=[];

message:string='';



editing:boolean=false;



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


this.products=this.plannerService.getProducts();


this.filteredProducts=[...this.products];


this.loadCategories();


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


!this.newPlanner.name ||


!this.newPlanner.price ||


!this.newPlanner.category


){


this.message='⚠️ Inserisci nome, prezzo e categoria';


return;


}






if(this.editing){



this.plannerService.updateProduct(

this.newPlanner

);



this.message='✅ Planner modificato';


}

else{



this.plannerService.addPlanner(

this.newPlanner

);



this.message='✅ Planner aggiunto';


}







this.resetForm();


this.loadProducts();


}


loadCategories(){


this.categories=[

'Tutti',

...new Set(

this.products.map(

p=>p.category

)

)

];


}




filterProducts(){


let result=[...this.products];



if(this.searchText.trim()){


const text=this.searchText.toLowerCase();



result=result.filter(p=>



p.name.toLowerCase().includes(text)

||

p.category.toLowerCase().includes(text)

||

p.description.toLowerCase().includes(text)


);



}




if(this.selectedCategory!=='Tutti'){


result=result.filter(p=>

p.category===this.selectedCategory

);


}




this.filteredProducts=result;


}





editPlanner(product:Product){



this.newPlanner={

...product,

reviews:product.reviews || []

};



this.editing=true;



window.scrollTo({

top:0,

behavior:'smooth'

});


}








deletePlanner(id:number){



if(confirm('Vuoi eliminare questo planner?')){


this.plannerService.deleteProduct(id);



this.message='🗑 Planner eliminato';



this.loadProducts();


}



}






}