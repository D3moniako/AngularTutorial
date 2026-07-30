import { Injectable } from '@angular/core';

import { User } from '../models/user';

import { BehaviorSubject } from 'rxjs';



@Injectable({
providedIn:'root'
})


export class UserService {




// =================================================
// DATABASE TEMPORANEO LOCAL STORAGE
// =================================================


private users:User[] = this.loadUsers();


private currentUser:User|null = this.loadCurrentUser();




// =================================================
// STREAM LISTA UTENTI ADMIN
// =================================================


private usersSubject =
new BehaviorSubject<User[]>(this.users);


users$ =
this.usersSubject.asObservable();




// =================================================
// STREAM UTENTE LOGGATO
// =================================================


private userSubject =
new BehaviorSubject<User|null>(this.currentUser);


user$ =
this.userSubject.asObservable();







constructor(){}







// =================================================
// LOAD USERS
// =================================================


private loadUsers():User[]{


try{


const data=localStorage.getItem('users');


return data ? JSON.parse(data) : [];


}
catch{


return [];

}


}








private loadCurrentUser():User|null{


try{


const data=localStorage.getItem('currentUser');


return data ? JSON.parse(data) : null;


}
catch{


return null;


}


}









// =================================================
// REGISTRAZIONE
// =================================================


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









// =================================================
// LOGIN
// =================================================


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






this.currentUser={...user};



this.saveCurrentUser();



this.userSubject.next(this.currentUser);



return true;



}









// =================================================
// LOGOUT
// =================================================


logout(){



this.currentUser=null;



localStorage.removeItem('currentUser');



this.userSubject.next(null);



}









// =================================================
// UTENTE CORRENTE
// =================================================


getCurrentUser():User|null{


return this.currentUser
?

{...this.currentUser}

:

null;


}









requireUser():User{


if(!this.currentUser){


throw new Error(
'Utente non autenticato'
);


}



return {...this.currentUser};


}









isLogged():boolean{


return this.currentUser!==null;


}









// =================================================
// AGGIORNA PROFILO UTENTE
// =================================================


updateProfile(updatedUser:User):boolean{



const index=this.users.findIndex(

u=>u.id===updatedUser.id

);




if(index===-1){

return false;

}




this.users[index]={...updatedUser};



if(this.currentUser?.id===updatedUser.id){


this.currentUser={...updatedUser};


this.saveCurrentUser();


this.userSubject.next(this.currentUser);


}




this.saveUsers();



return true;



}









// =================================================
// ADMIN MODIFICA UTENTE
// =================================================


adminUpdateUser(updatedUser:User):boolean{



const index=this.users.findIndex(

u=>u.id===updatedUser.id

);




if(index===-1){


return false;


}




this.users[index]={...updatedUser};





// se è l'utente loggato aggiorna anche header


if(this.currentUser?.id===updatedUser.id){



this.currentUser={...updatedUser};



this.saveCurrentUser();



this.userSubject.next(this.currentUser);



}





this.saveUsers();



return true;



}









// =================================================
// CAMBIO PASSWORD
// =================================================


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


this.users[index]={...this.currentUser};


}




this.saveUsers();


this.saveCurrentUser();



this.userSubject.next({...this.currentUser});



return true;


}









// =================================================
// SINCRONIZZA DOPO REFRESH
// =================================================


refreshUser(){



const user=this.loadCurrentUser();



this.currentUser=user;



this.userSubject.next(user);



}









// =================================================
// SALVATAGGI
// =================================================


private saveUsers(){



localStorage.setItem(

'users',

JSON.stringify(this.users)

);



this.usersSubject.next(

this.getUsers()

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









// =================================================
// ADMIN
// =================================================


isAdmin():boolean{


return this.currentUser?.role==='ADMIN';


}







getUsers():User[]{


return this.users.map(

u=>({...u})

);


}









deleteUser(id:number){



this.users=this.users.filter(

u=>u.id!==id

);



if(this.currentUser?.id===id){


this.currentUser=null;


this.saveCurrentUser();


this.userSubject.next(null);


}



this.saveUsers();


}









toggleUserStatus(id:number){



const user=this.users.find(

u=>u.id===id

);



if(user){



user.enabled=!user.enabled;



this.saveUsers();



}



}









changeRole(id:number){



const user=this.users.find(

u=>u.id===id

);



if(user){



user.role=

user.role==='ADMIN'

?

'USER'

:

'ADMIN';




this.adminUpdateUser(user);



}



}





}