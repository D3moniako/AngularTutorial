import { Component, OnInit } from '@angular/core';

import { ChatService } from '../../chat/services/chat.service';
import { ChatMessage } from '../../chat/models/chat-message';


@Component({

selector:'app-chat',

templateUrl:'./chat.component.html',

styleUrls:['./chat.component.css']

})


export class ChatComponent implements OnInit{


message='';


messages:ChatMessage[]=[];


userId=0;


userName='';



constructor(

private chatService:ChatService

){}



ngOnInit(){


this.loadUser();



console.log(
'UTENTE CHAT',
this.userId,
this.userName
);



if(this.userId){

this.chatService.setCurrentUser(

this.userId,

this.userName

);

}



this.chatService.getMessages(this.userId)

.subscribe(messages=>{


this.messages=messages;


});


}




loadUser(){


const userJson = localStorage.getItem('currentUser');


if(!userJson){

console.error(
'Nessun utente loggato nella chat'
);

return;

}



const user = JSON.parse(userJson);



this.userId = user.id;

this.userName = user.name;



console.log(
'CHAT USER:',
this.userId,
this.userName
);


}




send(){


if(!this.message.trim()){

return;

}



this.chatService.send(this.message);



this.message='';


}


}