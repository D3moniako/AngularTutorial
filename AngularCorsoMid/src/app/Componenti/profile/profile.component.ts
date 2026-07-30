import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { UserService } from '../../services/user.service';

import { User } from '../../models/user';



@Component({

selector:'app-profile',

templateUrl:'./profile.component.html',

styleUrls:['./profile.component.css']

})


export class ProfileComponent implements OnInit, OnDestroy {



user:User|null=null;



private userSubscription!:Subscription;



editName:string='';

editPhone:string='';



message:string='';




// =============================
// EDITOR FOTO
// =============================


imagePreview:string='';

showCropper:boolean=false;


zoom:number=1;


positionX:number=0;


positionY:number=0;


selectedFile:any;





constructor(

private userService:UserService,

private router:Router

){}









ngOnInit(){



this.userSubscription=this.userService.user$

.subscribe(user=>{


this.user=user;



if(user){


this.editName=user.name;


this.editPhone=user.phone || '';



}



});







if(!this.userService.isLogged()){


this.router.navigate(['/login']);


}



}









// =============================
// SALVA PROFILO
// =============================


saveProfile(){



if(!this.user){

return;

}




this.user.name=this.editName;


this.user.phone=this.editPhone;



this.userService.updateProfile(this.user);



this.message='✅ Profilo aggiornato';



setTimeout(()=>{


this.message='';


},3000);



}









// =============================
// CAMBIO AVATAR
// =============================


changeAvatar(event:any){



const file=event.target.files[0];



if(!file){

return;

}




if(!file.type.startsWith('image/')){


this.message='❌ Seleziona una immagine valida';


return;


}





this.selectedFile=file;



const reader=new FileReader();



reader.onload=()=>{


this.imagePreview=reader.result as string;


this.showCropper=true;


this.zoom=1;


this.positionX=0;


this.positionY=0;



};



reader.readAsDataURL(file);



}









// =============================
// ZOOM FOTO
// =============================


increaseZoom(){


this.zoom+=0.1;


}



decreaseZoom(){



if(this.zoom>0.5){


this.zoom-=0.1;


}


}








// =============================
// SPOSTAMENTO FOTO
// =============================


moveImage(x:number,y:number){


this.positionX+=x;


this.positionY+=y;


}









// =============================
// SALVA FOTO TAGLIATA
// =============================


saveAvatar(){



const canvas=document.createElement('canvas');


canvas.width=300;


canvas.height=300;



const ctx=canvas.getContext('2d');



if(!ctx){

return;

}




const img=new Image();




img.onload=()=>{



ctx.clearRect(0,0,300,300);



// maschera rotonda

ctx.beginPath();

ctx.arc(

150,

150,

150,

0,

Math.PI*2

);


ctx.closePath();

ctx.clip();





ctx.drawImage(

img,

this.positionX,

this.positionY,

img.width*this.zoom,

img.height*this.zoom

);






const avatar=canvas.toDataURL('image/png');





if(this.user){



this.user.avatar=avatar;



this.userService.updateProfile(this.user);



this.message='📷 Foto aggiornata';



}





this.showCropper=false;



};



img.src=this.imagePreview;



}










cancelAvatar(){



this.showCropper=false;



}









// =============================
// CAMBIO PASSWORD
// =============================


changePassword(){



alert('🔐 Modulo cambio password in sviluppo');


}









// =============================
// LOGOUT
// =============================


logout(){



this.userService.logout();


this.user=null;



this.router.navigate(['/']);



}










ngOnDestroy(){



if(this.userSubscription){


this.userSubscription.unsubscribe();


}



}



}