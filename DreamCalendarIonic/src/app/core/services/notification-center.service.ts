import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { Notification } from '../models/notification';

/// NOTIFICHE TOAST////
@Injectable({
  providedIn: 'root',
})
export class NotificationCenterService {
  private notifications: Notification[] = [];

  private subject = new BehaviorSubject<Notification[]>(this.notifications);

  notifications$ = this.subject.asObservable();

  getNotifications() {
    return this.notifications;
  }

  add(notification: Notification) {
    this.notifications.unshift(notification);

    this.subject.next(this.notifications);
  }

  markAsRead(id: number) {
    const item = this.notifications.find((n) => n.id === id);

    if (item) {
      item.read = true;

      this.subject.next(this.notifications);
    }
  }

  markAllAsRead() {
    this.notifications.forEach((n) => (n.read = true));

    this.subject.next(this.notifications);
  }

  getUnreadCount() {
    return this.notifications.filter((n) => !n.read).length;
  }
}
