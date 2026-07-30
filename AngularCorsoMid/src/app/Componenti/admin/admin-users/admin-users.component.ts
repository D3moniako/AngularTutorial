import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { UserService } from '../../../services/user.service';

import { User } from '../../../models/user';



@Component({

selector:'app-admin-users',

templateUrl:'./admin-users.component.html',

styleUrls:['./admin-users.component.css']

})


export class AdminUsersComponent implements OnInit, OnDestroy {



private subscription?:Subscription;



users:User[]=[];

filteredUsers:User[]=[];



searchText:string='';


message:string='';



selectedRole:string='Tutti';



adminCount:number=0;


activeCount:number=0;





constructor(

private userService:UserService

){}







ngOnInit(){



this.loadUsers();



this.subscription =

this.userService.users$

.subscribe(users=>{


this.users=[...users];


this.updateCounters();


this.filterUsers();



});



}








loadUsers(){


this.users=this.userService.getUsers();


this.filteredUsers=[...this.users];


this.updateCounters();



}







updateCounters(){



this.adminCount=

this.users.filter(

u=>u.role==='ADMIN'

).length;




this.activeCount=

this.users.filter(

u=>u.enabled

).length;



}








filterUsers(){



let result=[...this.users];





if(this.searchText.trim()){



const text=

this.searchText.toLowerCase();




result=result.filter(user=>



user.name.toLowerCase().includes(text)

||

user.email.toLowerCase().includes(text)



);



}





if(this.selectedRole!=='Tutti'){



result=result.filter(user=>

user.role===this.selectedRole

);



}





this.filteredUsers=result;



}








toggleStatus(id:number){



const user=this.users.find(

u=>u.id===id

);



if(!user){

return;

}





const updatedUser:User={


...user,


enabled:!user.enabled


};




this.userService.adminUpdateUser(updatedUser);



this.showMessage(

'✅ Stato utente aggiornato'

);



}









changeRole(user:User){



const updatedUser:User={


...user,


role:

user.role==='ADMIN'

?

'USER'

:

'ADMIN'


};





this.userService.adminUpdateUser(updatedUser);



this.showMessage(

'✅ Ruolo modificato'

);



}









deleteUser(id:number){



if(confirm(

'Eliminare definitivamente questo utente?'

)){



this.userService.deleteUser(id);



this.showMessage(

'🗑 Utente eliminato'

);



}



}








private showMessage(text:string){



this.message=text;



setTimeout(()=>{


this.message='';


},3000);



}








ngOnDestroy(){



this.subscription?.unsubscribe();



}



}