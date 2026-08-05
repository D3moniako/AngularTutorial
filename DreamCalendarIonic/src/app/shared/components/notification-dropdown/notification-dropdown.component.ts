import { Component } from '@angular/core';

@Component({
  selector: 'app-notification-dropdown',
  templateUrl: './notification-dropdown.component.html',
  styleUrls: ['./notification-dropdown.component.scss']
})
export class NotificationDropdownComponent {

  notifications = [
    {
      message: 'Benvenuto in DreamCalendar 🌸',
      read: false
    },
    {
      message: 'Nuovo planner disponibile ✨',
      read: false
    }
  ];


  markAsRead(notification:any){

    notification.read = true;

  }

}