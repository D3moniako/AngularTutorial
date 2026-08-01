import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';
// costanti errori//
import { ERRORS } from '../../constants/errors';

@Component({

selector:'app-login',

templateUrl:'./login.component.html',

styleUrls:['./login.component.css']

})


export class LoginComponent {


email:string='';


password:string='';


errorMessage:string='';


loading:boolean=false;

emailError:string='';

passwordError:string='';




constructor(


private userService:UserService,


private router:Router


){}









login(){



this.email=this.email.trim();

this.emailError='';
this.passwordError='';
this.errorMessage='';



if(!this.email){


this.emailError = ERRORS.LOGIN.EMAIL_REQUIRED;

}



if(!this.password){


this.passwordError = ERRORS.LOGIN.PASSWORD_REQUIRED;

}



if(this.emailError || this.passwordError){


return;


}









this.loading=true;









const result = this.userService.login(



this.email,



this.password



);












if(result){



this.errorMessage='';


// salvo email prima della pulizia

const loginEmail = this.email;



// pulizia campi


this.email='';


this.password='';





this.loading=false;











// REDIRECT DOPO LOGIN


// recupero utente dal localStorage




// recupera utente loggato

let user = this.userService.getCurrentUser();


// se non trovato prova dal localStorage users

if(!user){

const usersJson = localStorage.getItem('users');


if(usersJson){

const users = JSON.parse(usersJson);

user = users.find(
(u:any)=>
u.email.toLowerCase() === loginEmail.toLowerCase()
);

}

}




if(user && user.role?.toLowerCase() === 'admin'){


this.router.navigate(['/admin/dashboard']);


}else{


this.router.navigate(['/profile']);


}









}

else{







this.loading=false;







this.errorMessage = ERRORS.LOGIN.INVALID_CREDENTIALS;
}



}

checkEmail(){

this.email=this.email.trim();


if(!this.email){

this.emailError='Inserisci la tua email';

}
else{

this.emailError='';

}

}




checkPassword(){


if(!this.password){

this.passwordError='Inserisci la password';

}
else{

this.passwordError='';

}

}

}