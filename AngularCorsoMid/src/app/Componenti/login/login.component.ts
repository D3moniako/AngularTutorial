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


loading:boolean=false;





constructor(


private userService:UserService,


private router:Router


){}









login(){



this.errorMessage='';



this.email=this.email.trim();








if(



!this.email ||


!this.password



){



this.errorMessage=

'Inserisci email e password';



return;



}









this.loading=true;









const result = this.userService.login(



this.email,



this.password



);












if(result){





this.errorMessage='';




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
u.email.toLowerCase() === this.email.toLowerCase()
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







this.errorMessage=

'Email o password errati';








}









}



}