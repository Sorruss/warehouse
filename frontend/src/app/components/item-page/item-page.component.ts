import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ItemsService } from '../../services/items/items.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { ExportService } from 'src/app/services/export/export.service';
import { FilterService } from 'src/app/services/filter/filter.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.css'],
})
export class ItemPageComponent implements OnInit {
  public item: any;

  private id!: number;
  private user_id!: number;

  constructor(
    private route: ActivatedRoute,
    private itemsService: ItemsService,
    private notificationService: NotificationService,
    private cartService: CartService,
    private exportService: ExportService,
    private filterService: FilterService,
    private router: Router,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.retrieveItem();
    this.filterService.hideSearchBar();

    this.user_id = this.authService.getUserDetails().id;
  }

  retrieveItem(): void {
    this.itemsService.get(this.id).subscribe({
      next: (data) => {
        this.item = data;
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  createCartItem(quantity: string): void {
    this.cartService
      .create({
        item_id: this.item.id,
        owner_id: this.user_id,
        ordered_quantity: Number(quantity),
      })
      .subscribe(
        (response) => {
          console.log('response: ', response);
          this.notificationService.createImportNotification(
            this.item.item_name,
            quantity
          );
        },
        (error) => {
          console.log('error: ', error);
        }
      );
  }
  createExportItem(quantity: string): void {
    this.exportService
      .create({
        item_id: this.item.id,
        owner_id: this.user_id,
        ordered_quantity: Number(quantity),
      })
      .subscribe(
        (response) => {
          console.log('response: ', response);
          this.notificationService.createExportNotification(
            this.item.item_name,
            quantity
          );
        },
        (error) => {
          console.log('error: ', error);
        }
      );
  }
  addToCart(quantity: string): void {
    this.createCartItem(quantity);
  }
  addToExport(quantity: string): void {
    if (!this.checkBeforeCreate(this.item.quantity, Number(quantity))) {
      this.notificationService.createTooMuchNotification(
        this.item.item_name,
        quantity
      );
    } else {
      this.createExportItem(quantity);
    }
  }
  checkBeforeCreate(quantity: number, exportQuantity: number): boolean {
    return !(exportQuantity > quantity);
  }
  removeItem(): void {
    this.itemsService.delete(this.id).subscribe(
      (response) => {
        console.log('response: ', response);
        this.router.navigate(['/']);
        this.notificationService.createSuccessfullyDeletedNotification(
          this.item.item_name,
          true
        );
      },
      (error) => {
        console.log('error: ', error);
      }
    );
  }
}
