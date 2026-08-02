import { Component, OnInit } from '@angular/core';

import { ChatService } from '../../../chat/services/chat.service';

import { ChatMessage } from '../../../chat/models/chat-message';


interface Customer {

  userId:number;

  userName:string;

}



@Component({

selector:'app-admin-chat',

templateUrl:'./admin-chat.component.html',

styleUrls:['./admin-chat.component.css']

})


export class AdminChatComponent implements OnInit {



messages:ChatMessage[]=[];


customers:Customer[]=[];


selectedUserId:number|null=null;


reply:string='';



constructor(

private chatService:ChatService

){}




ngOnInit(){



this.chatService.messages$

.subscribe((data:ChatMessage[])=>{


this.messages=data;


this.loadCustomers(data);



});



}




loadCustomers(messages:ChatMessage[]){


this.customers=[];



messages.forEach(m=>{


if(m.userId && m.sender==='USER'){



const exists=this.customers.find(

c=>c.userId===m.userId

);



if(!exists){


this.customers.push({

userId:m.userId,

userName:m.userName

});


}



}



});



}






selectCustomer(id:number){


this.selectedUserId=id;


}





getConversation():ChatMessage[]{



if(this.selectedUserId===null){


return [];


}




return this.messages.filter(


m=>m.userId===this.selectedUserId


);



}







sendReply(){



if(!this.reply.trim()){

return;

}



if(this.selectedUserId===null){

return;

}




this.chatService.adminReply(

this.selectedUserId,

this.reply

);



this.reply='';



}



}