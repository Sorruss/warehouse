import { Component, OnInit } from '@angular/core';

import { notificationFadeIn, notificationFadeOut } from 'src/app/animations';

import {
  NotificationService,
  Notification,
} from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  animations: [notificationFadeIn, notificationFadeOut],
})
export class NotificationsComponent implements OnInit {
  public items: Notification[] = [];
  private subscription: any;

  constructor(private notificationService: NotificationService) {}
  ngOnInit(): void {
    this.items = this.notificationService.getItems();
    this.subscription = this.notificationService.itemsChanged.subscribe(
      (value) => (this.items = value)
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  removeItem(id: number): void {
    this.notificationService.removeItem(id);
  }
}
