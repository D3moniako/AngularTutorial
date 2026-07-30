import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';




@Component({

selector:'app-login',

templateUrl:'./login.component.html',

styleUrls:['./login.component.css']

})


export class LoginComponent {



email:string='';


password:string='';


errorMessage:string='';







constructor(

private userService:UserService,

private router:Router

){}









login(){



this.email=this.email.trim();





if(

!this.email ||

!this.password

){


this.errorMessage='Inserisci email e password';


return;


}







const result=this.userService.login(

this.email,

this.password

);







if(result){



this.errorMessage='';




// pulizia campi

this.email='';

this.password='';





// redirect dopo login

this.router.navigate(['/profile']);





}

else{



this.errorMessage='Email o password errati';



}



}





}