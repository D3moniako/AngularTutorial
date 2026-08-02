import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { Notification } from '../models/notification';



@Injectable({
providedIn:'root'
})

export class NotificationCenterService {



private notifications:Notification[]=[


{
id:1,

title:'Ordine completato',

message:'Il tuo ordine è stato confermato.',

icon:'📦',

type:'ORDER',

date:new Date(),

read:false

},


{
id:2,

title:'Nuovo planner disponibile',

message:'È disponibile una nuova collezione.',

icon:'🌸',

type:'SYSTEM',

date:new Date(),

read:false

}



];





private subject =

new BehaviorSubject<Notification[]>(

this.notifications

);





notifications$ =

this.subject.asObservable();







getNotifications(){

return this.notifications;

}





add(notification:Notification){


this.notifications.unshift(notification);


this.subject.next(this.notifications);


}





markAsRead(id:number){


const item =

this.notifications.find(

n=>n.id===id

);



if(item){

item.read=true;

this.subject.next(this.notifications);

}


}








markAllAsRead(){


this.notifications.forEach(

n=>n.read=true

);


this.subject.next(this.notifications);


}







getUnreadCount(){


return this.notifications.filter(

n=>!n.read

).length;


}







}
