import { Injectable } from '@angular/core';

import { User } from '../models/user';

import { BehaviorSubject } from 'rxjs';



@Injectable({
providedIn:'root'
})


export class UserService {




// ================================================
// LOCAL STORAGE TEMPORANEO FINO AL BACKEND
// ================================================


private users:User[] = this.loadUsers();



private currentUser:User|null = this.loadCurrentUser();





// comunica cambio utente a tutta l'app


private userSubject =

new BehaviorSubject<User | null>(this.currentUser);



user$ = this.userSubject.asObservable();







constructor(){}









// ================================================
// LETTURA LOCAL STORAGE
// ================================================


private loadUsers():User[]{


try{


return JSON.parse(

localStorage.getItem('users') || '[]'

);


}

catch{


return [];

}


}








private loadCurrentUser():User|null{


try{


return JSON.parse(

localStorage.getItem('currentUser') || 'null'

);


}

catch{


return null;


}


}









/*
================================================

REGISTRAZIONE UTENTE

================================================
*/


register(user:User):boolean{



const exists=this.users.find(

u=>u.email.toLowerCase()===user.email.toLowerCase()

);




if(exists){

return false;

}






const newUser:User={



id:Date.now(),


name:user.name,


email:user.email,


password:user.password,


phone:user.phone,


role:user.role || 'USER',


enabled:true,


twoFactorEnabled:false,


createdAt:new Date().toISOString(),


avatar:user.avatar


};






this.users.push(newUser);



this.saveUsers();




return true;


}









/*
================================================

LOGIN

================================================
*/


login(

email:string,

password:string

):boolean{





const user=this.users.find(



u=>

u.email.toLowerCase()===email.toLowerCase()

&&

u.password===password



);





if(!user){

return false;

}






if(!user.enabled){

return false;

}







this.currentUser=user;



this.saveCurrentUser();




this.userSubject.next(user);






return true;


}









/*
================================================

LOGOUT

================================================
*/


logout(){



this.currentUser=null;



localStorage.removeItem(

'currentUser'

);



this.userSubject.next(null);



}









/*
================================================

UTENTE CORRENTE

================================================
*/


getCurrentUser():User|null{


if(!this.currentUser){

return null;

}


return {...this.currentUser};


}








/*
================================================

UTENTE OBBLIGATORIO

Utile per checkout

================================================
*/


requireUser():User{


if(!this.currentUser){


throw new Error(

'Utente non autenticato'

);


}


return this.currentUser;


}









/*
================================================

CONTROLLO LOGIN

================================================
*/


isLogged():boolean{


return this.currentUser !== null;


}









/*
================================================

AGGIORNA PROFILO

================================================
*/


updateProfile(updatedUser:User):boolean{



if(!this.currentUser){

return false;

}




const index=this.users.findIndex(

u=>u.id===updatedUser.id

);





if(index===-1){

return false;

}





this.users[index]=updatedUser;



this.currentUser=updatedUser;



this.saveUsers();

this.saveCurrentUser();




this.userSubject.next(updatedUser);




return true;


}









/*
================================================

CAMBIO PASSWORD

================================================
*/


changePassword(

oldPassword:string,

newPassword:string

):boolean{



if(!this.currentUser){

return false;

}





if(this.currentUser.password!==oldPassword){

return false;

}





this.currentUser.password=newPassword;




const index=this.users.findIndex(

u=>u.id===this.currentUser!.id

);





if(index!==-1){

this.users[index]=this.currentUser;

}





this.saveUsers();

this.saveCurrentUser();




this.userSubject.next(this.currentUser);




return true;


}









/*
================================================

SALVATAGGIO LOCAL STORAGE

================================================
*/


private saveUsers(){



localStorage.setItem(

'users',

JSON.stringify(this.users)

);


}








private saveCurrentUser(){


if(this.currentUser){



localStorage.setItem(

'currentUser',

JSON.stringify(this.currentUser)

);


}

else{


localStorage.removeItem('currentUser');


}


}









/*
================================================

ADMIN FUTURO

================================================
*/


getUsers():User[]{


return [...this.users];


}



}