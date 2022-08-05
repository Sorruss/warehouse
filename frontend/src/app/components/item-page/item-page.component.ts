import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ItemsService } from '../../services/items/items.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { ExportService } from 'src/app/services/export/export.service';
import { FilterService } from 'src/app/services/filter/filter.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProducersService } from 'src/app/services/producers/producers.service';

import { getRandomNumber } from 'src/app/functions';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.css'],
})
export class ItemPageComponent implements OnInit, OnDestroy {
  public srcToPhotos: string = 'http://localhost:8080/api/items/photo/';
  public srcToPhotos2: string = 'http://localhost:8080/api/items/item_photo/';
  public item: any;

  private id!: number;
  public user: any;

  public editingProcess: boolean = false;
  public editedItem: any = {};
  public producers: any = [];
  public fileIsLoading: boolean = false;

  private ngUnsubscribe: Subject<boolean> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private itemsService: ItemsService,
    private notificationService: NotificationService,
    private cartService: CartService,
    private exportService: ExportService,
    private filterService: FilterService,
    private router: Router,
    private authService: AuthService,
    private producersService: ProducersService
  ) {}
  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.retrieveItem();
    this.filterService.hideSearchBar();

    this.user = this.authService.getUserDetails();
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }

  retrieveItem(): void {
    this.itemsService
      .get(this.id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
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
        owner_id: this.user.id,
        ordered_quantity: Number(quantity),
      })
      .pipe(takeUntil(this.ngUnsubscribe))
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
        owner_id: this.user.id,
        ordered_quantity: Number(quantity),
      })
      .pipe(takeUntil(this.ngUnsubscribe))
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
    return (
      !(exportQuantity > quantity) &&
      this.item.company_id === this.user.company_id
    );
  }
  removeItem(): void {
    if (this.user.role !== 'admin') {
      return;
    }

    // Deleting item
    this.itemsService
      .delete(this.id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
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

    // Deleting item's photo
    this.itemsService
      .deletePhotoById(this.item.id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (data) => {
          console.log('response: ', data);
        },
        error: (error) => {
          console.log('error: ', error);
        },
      });
  }

  editItem(): void {
    if (this.user.role !== 'admin') {
      return;
    }

    this.editedItem = { ...this.item };
    this.editingProcess = true;
    this.retrieveProducers();
  }
  retrieveProducers(): void {
    this.producersService
      .getAll()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (data) => {
          this.producers = data;
          console.log('data: ', data);
        },
        error: (error) => {
          console.log('error: ', error);
        },
      });
  }
  cancelFormatting(): void {
    this.editingProcess = false;
    this.deletePrevPhoto();
  }
  saveFormatting(): void {
    // Doing stuff with images of the item.
    if (
      this.editedItem.photo_src !== this.item.photo_src &&
      this.item.photo_src !== 'default'
    ) {
      this.itemsService
        .deletePhotoById(this.item.id)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe({
          next: (data) => {
            console.log('response: ', data);
          },
          error: (error) => {
            console.log('error: ', error);
          },
        });

      if (!this.editedItem.photo_src) {
        this.editedItem.photo_src = 'default';
      }
    }

    // Patching an item.
    this.itemsService
      .patch(this.item.id, this.editedItem)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (data) => {
          console.log('!response: ', data);
          this.retrieveItem();
          this.editingProcess = false;
          this.notificationService.createSuccessNotification();
        },
        error: (error) => {
          console.log('error: ', error);
        },
      });
  }
  choosePhoto(event: any): void {
    this.fileIsLoading = true;

    const file: File = <File>event.target.files[0];
    const formData = new FormData();
    const filename = `${getRandomNumber(10001, 99999)}_${file.name}`;
    formData.append('file', file, filename);

    this.deletePrevPhoto();
    this.itemsService
      .attach(formData)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          this.editedItem.photo_src = filename;
          this.fileIsLoading = false;
          console.log('response: ', response);
        },
        (error) => {
          console.log('error: ', error);
        }
      );
  }
  deletePrevPhoto(): void {
    if (this.editedItem.photo_src !== this.item.photo_src) {
      this.itemsService
        .deletePhotoByName(this.editedItem.photo_src)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
          (response) => {
            console.log('response: ', response);
          },
          (error) => {
            console.log('error: ', error);
          }
        );
    }
  }

  setDate(): any {
    const now = new Date(this.item.income_date_orig);
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  }
}
