import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import {
  NotificationService,
  Notification,
} from '../../../core/services/notification.service';


@Component({
  selector: 'app-notification',

  templateUrl: './notification.component.html',

  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit, OnDestroy {


  notifications: Notification[] = [];


  private subscription?: Subscription;



  constructor(
    private notificationService: NotificationService
  ){}



  ngOnInit(): void {

    this.subscription =
    this.notificationService.notifications$
    .subscribe(
      (data: Notification[]) => {

        this.notifications = data;

      }
    );

  }




  close(id:number){

    this.notificationService.remove(id);

  }





  ngOnDestroy(): void {

    this.subscription?.unsubscribe();

  }



}