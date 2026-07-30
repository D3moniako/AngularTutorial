import { Component } from '@angular/core';

import { PlannerService } from '../../services/planner.service';

import { Product } from '../../models/product';



@Component({

selector:'app-admin-upload',

templateUrl:'./admin-upload-planner.component.html',

styleUrls:['./admin-upload-planner.component.css']

})


export class AdminUploadComponent {



message:string='';



planner:Product=this.createEmptyPlanner();





constructor(

private plannerService:PlannerService

){}







private createEmptyPlanner():Product{


return {


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


}







// ===============================
// CARICAMENTO IMMAGINE
// ===============================


onImageSelected(event:any){


const file = event.target.files[0];


if(!file){

return;

}



if(!file.type.startsWith('image')){


this.message='⚠️ Seleziona un file immagine valido';


return;


}



const reader = new FileReader();



reader.onload = ()=>{


this.planner.image = reader.result as string;


};



reader.readAsDataURL(file);



}







// ===============================
// CARICAMENTO PDF
// ===============================


onPdfSelected(event:any){


const file = event.target.files[0];


if(!file){

return;

}



if(file.type !== 'application/pdf'){


this.message='⚠️ Seleziona solamente PDF';


return;


}




this.planner.downloadUrl=file.name;


this.message='📄 PDF caricato: '+file.name;



}









// ===============================
// SALVATAGGIO
// ===============================


savePlanner(){





if(



!this.planner.name.trim() ||


this.planner.price <=0 ||


!this.planner.category.trim()



){


this.message='⚠️ Inserisci nome, prezzo e categoria';


return;


}








this.plannerService.addPlanner({



...this.planner,


name:this.planner.name.trim(),


category:this.planner.category.trim(),


favorite:false,


rating:0,


reviews:[]



});









this.message='✅ Planner pubblicato correttamente';






this.planner=this.createEmptyPlanner();





}





}