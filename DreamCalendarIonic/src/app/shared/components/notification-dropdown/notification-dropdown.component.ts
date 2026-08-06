import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { NotificationCenterService } from '../../../core/services/notification-center.service';
import { Notification } from '../../../core/models/notification';


@Component({
  selector: 'app-notification-dropdown',
  templateUrl: './notification-dropdown.component.html',
  styleUrls: ['./notification-dropdown.component.scss']
})
export class NotificationDropdownComponent implements OnInit, OnDestroy {


  open=false;


  notifications:Notification[]=[];


  unread=0;


  private sub?:Subscription;



  constructor(
    private notificationService:NotificationCenterService
  ){}



  ngOnInit(){


    this.sub=this.notificationService.notifications$
    .subscribe(data=>{


      this.notifications=data;


      this.unread=
      data.filter(n=>!n.read).length;


    });


  }





  toggle(){

    this.open=!this.open;

  }




  read(notification:Notification){

    this.notificationService.markAsRead(
      notification.id
    );

  }





  markAll(){

    this.notificationService.markAllAsRead();

  }




  ngOnDestroy(){

    this.sub?.unsubscribe();

  }


}