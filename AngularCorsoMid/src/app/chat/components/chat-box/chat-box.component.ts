import { Component, OnInit } from '@angular/core';

import { ChatService }
from '../../services/chat.service';

import { ChatMessage }
from '../../models/chat-message';



@Component({

selector:'app-chat-box',

templateUrl:'./chat-box.component.html',

styleUrls:['./chat-box.component.css']

})


export class ChatBoxComponent implements OnInit {



open:boolean=false;


message:string='';


messages:ChatMessage[]=[];




constructor(

private chatService:ChatService

){}





ngOnInit(){


this.chatService.messages$

.subscribe(data=>{


this.messages=data;


});


}







toggle(){


this.open=!this.open;


}







send(){


if(!this.message.trim()){

return;

}



this.chatService.send(

this.message

);



this.message='';


}








clearChat(){


this.chatService.clear();


}




}