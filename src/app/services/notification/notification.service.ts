import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Notification {
  id: number;
  title: string;
  message: string;
  color: string;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  public items: Notification[] = [];
  itemsChanged: Subject<Notification[]> = new Subject<Notification[]>();

  constructor() {}
  addItem(obj: { title: string; message: string; color: string }): void {
    const id = this.items.length ? this.items[this.items.length - 1].id + 1 : 0;
    const item: Notification = { id, ...obj };
    this.items.push(item);
    this.changed();
    this.autoDelete(item.id, 3);
  }
  getItem(id: number): Notification {
    return this.items.find((item) => item.id === id)!;
  }
  getItems(): Notification[] {
    return this.items;
  }
  removeItem(id: number): void {
    this.items = this.items.filter((item) => item.id !== id);
    this.changed();
  }
  clearItems(): void {
    this.items = [];
    this.changed();
  }

  changed() {
    this.itemsChanged.next(this.items);
  }
  autoDelete(id: number, seconds: number): void {
    setTimeout(() => this.removeItem(id), seconds * 1000);
    this.changed();
  }
}
