import { Component, OnInit } from '@angular/core';

import { NotificationCenterService } from '../../services/notification-center.service';

import { Notification } from '../../models/notification';

@Component({
  selector: 'app-notification-dropdown',

  templateUrl: './notification-dropdown.component.html',

  styleUrls: ['./notification-dropdown.component.css'],
})
export class NotificationDropdownComponent implements OnInit {
  open = false;

  notifications: Notification[] = [];

  unread = 0;

  constructor(private notificationService: NotificationCenterService) {}

  ngOnInit() {
    this.notificationService.notifications$.subscribe((data) => {
      this.notifications = data;

      this.unread = data.filter((n) => !n.read).length;
    });
  }

  toggle() {
    this.open = !this.open;
  }

  read(notification: Notification) {
    this.notificationService.markAsRead(notification.id);
  }

  markAll() {
    this.notificationService.markAllAsRead();
  }
}
