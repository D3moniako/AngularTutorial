import { Injectable } from '@angular/core';

import {
  BehaviorSubject} from 'rxjs';


///// NOTIFICHE CAMPANELLE////


export type NotificationType =

'success'
|
'error'
|
'warning'
|
'info';







export interface Notification {


  id:number;


  type:NotificationType;


  message:string;


  duration?:number;


}









@Injectable({

  providedIn:'root'

})


export class NotificationService {






private notifications:Notification[] = [];






private notificationSubject =

new BehaviorSubject<Notification[]>([]);






notifications$ =

this.notificationSubject.asObservable();



constructor(){

setTimeout(()=>{

this.success(
'🚀 Test automatico notifiche'
);

},2000);

}


// =====================================
// CREAZIONE NOTIFICA
// =====================================


private add(


type:NotificationType,


message:string,


duration:number = 4000


){





const notification:Notification = {


id:Date.now(),


type,


message,


duration



};







this.notifications.push(notification);






this.notificationSubject.next(

[...this.notifications]

);







if(duration > 0){



setTimeout(()=>{


this.remove(notification.id);



},duration);



}





}









// =====================================
// SUCCESS
// =====================================


success(message:string, duration:number = 4000){



this.add(

'success',

message,

duration

);



}









// =====================================
// ERROR
// =====================================


error(message:string, duration:number = 5000){



this.add(

'error',

message,

duration

);



}









// =====================================
// WARNING
// =====================================


warning(message:string, duration:number = 4000){



this.add(

'warning',

message,

duration

);



}









// =====================================
// INFO
// =====================================


info(message:string, duration:number = 4000){



this.add(

'info',

message,

duration

);



}









// =====================================
// RIMOZIONE SINGOLA
// =====================================


remove(id:number){





this.notifications =

this.notifications.filter(

n=>n.id!==id

);







this.notificationSubject.next(

[...this.notifications]

);





}









// =====================================
// CANCELLA TUTTE
// =====================================


clear(){



this.notifications=[];



this.notificationSubject.next([]);



}









// =====================================
// CONTEGGIO
// =====================================


get count():number{



return this.notifications.length;



}







}