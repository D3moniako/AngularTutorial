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


pdfName:string='';



planner:Product = this.createEmptyPlanner();





constructor(

private plannerService:PlannerService

){}









// ======================================
// CREAZIONE PLANNER VUOTO
// ======================================


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











// ======================================
// CARICAMENTO IMMAGINE COPERTINA
// ======================================


onImageSelected(event:any){



const file = event.target.files[0];



if(!file){

return;

}





if(!file.type.startsWith('image')){



this.message =

'⚠️ Seleziona un file immagine valido';



return;



}







if(file.size > 5 * 1024 * 1024){



this.message =

'⚠️ Immagine troppo grande. Massimo 5 MB';



return;



}









const reader = new FileReader();





reader.onload = ()=>{



this.planner.image =

reader.result as string;



};





reader.readAsDataURL(file);





this.message =

'🖼️ Immagine caricata';



}













// ======================================
// CARICAMENTO PDF DIGITALE
// ======================================

onPdfSelected(event:any){

  const file = event.target.files[0];


  if(!file){

    this.message='⚠️ Nessun PDF selezionato';

    return;

  }



  // controllo formato

  if(file.type !== 'application/pdf'){

    this.message=
    '⚠️ Seleziona solamente un file PDF';

    return;

  }



  // limite dimensione PDF
  // consigliato per localStorage/Base64

  if(file.size > 8 * 1024 * 1024){

    this.message=
    '⚠️ PDF troppo grande. Massimo 8 MB';

    return;

  }



  this.pdfName = file.name;



  const reader = new FileReader();



  reader.onload = () => {


    this.planner.downloadUrl =
    reader.result as string;


    this.message =
    '📄 PDF caricato correttamente: '
    + file.name;


  };



  reader.onerror = () => {


    this.message =
    '❌ Errore durante la lettura del PDF';


    this.planner.downloadUrl='';


  };



  reader.readAsDataURL(file);



}












// ======================================
// SALVATAGGIO PLANNER
// ======================================


savePlanner(){





if(



!this.planner.name.trim()



||



this.planner.price <= 0



||



!this.planner.category.trim()



||



!this.planner.description.trim()



){



this.message =

'⚠️ Inserisci nome, prezzo, categoria e descrizione';



return;



}









if(!this.planner.image){



this.message =

'⚠️ Inserisci una copertina';



return;



}









if(!this.planner.downloadUrl){



this.message =

'⚠️ Inserisci il PDF del planner';



return;



}












const newPlanner:Product = {



...this.planner,



id:Date.now(),



name:this.planner.name.trim(),



category:this.planner.category.trim(),



description:this.planner.description.trim(),



badge:this.planner.badge || 'NUOVO',



favorite:false,



rating:5,



reviews:[]



};









this.plannerService.addPlanner(

newPlanner

);









this.message =

'✅ Planner pubblicato correttamente';









this.planner =

this.createEmptyPlanner();




this.pdfName='';



setTimeout(()=>{


this.message='';


},3000);




}







}