import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';

import { User } from '../../models/user';



@Component({

selector:'app-register',

templateUrl:'./register.component.html',

styleUrls:['./register.component.css']

})


export class RegisterComponent {



user:User={


id:0,


name:'',


email:'',


password:'',


phone:'',


role:'USER',


enabled:true,


twoFactorEnabled:false,


createdAt:'',


avatar:''


};




confirmPassword:string='';





constructor(

private userService:UserService,

private router:Router

){}









register(){

this.user.name = this.user.name.trim();

this.user.email = this.user.email.trim();

this.user.phone = this.user.phone?.trim() || '';

if(
  !this.user.name ||
  !this.user.email ||
  !this.user.password
){
  alert('Compila tutti i campi obbligatori');
  return;
}

if(this.user.name.length < 2){
  alert('Nome troppo corto');
  return;
}
if(!this.user.email.includes('@')){
    alert('Email non valida');
    return;
}
if(
    this.user.phone &&
    this.user.phone.length < 8
){
    alert('Numero di telefono non valido');
    return;
}
if(this.user.password.length < 6){

    alert('La password deve avere almeno 6 caratteri');

    return;

}
if(

this.user.password !== this.confirmPassword

){


alert('❌ Le password non coincidono');


return;


}







const result=this.userService.register(

this.user

);






if(result){



alert('🌸 Registrazione completata');


this.router.navigate(['/login']);



}

else{



alert('⚠️ Email già utilizzata');


}



}





}