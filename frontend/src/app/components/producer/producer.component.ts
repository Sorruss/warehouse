import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { FilterService } from 'src/app/services/filter/filter.service';
import { ProducersService } from 'src/app/services/producers/producers.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { DirectAccessGuard } from 'src/app/services/direct-access-guard/direct-access-guard.service';
import { ItemsService } from 'src/app/services/items/items.service';

import { getRandomNumber } from 'src/app/functions';

import { fadeIn, slide2right } from 'src/app/animations/animations';

@Component({
  selector: 'app-producer',
  templateUrl: './producer.component.html',
  styleUrls: ['./producer.component.css'],
  animations: [fadeIn, slide2right],
})
export class ProducerComponent implements OnInit {
  public prod: any;
  public items: any = [];
  public srcToPhotos: string = 'http://localhost:8080/api/producer/photo/';
  public srcToPhotos2: string =
    'http://localhost:8080/api/producer/prod_photo/';

  public editingProcess: boolean = false;
  public editedItem: any = {};
  public fileIsLoading: boolean = false;
  public modalActive: boolean = false;

  constructor(
    private filterService: FilterService,
    private producersService: ProducersService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    private directAccessGuard: DirectAccessGuard,
    private itemsService: ItemsService
  ) {}

  ngOnInit(): void {
    this.retrieveProducer();
    this.filterService.hideSearchBar();
  }
  retrieveProducer(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.producersService.get(id).subscribe({
      next: (data) => {
        this.prod = data;
        this.directAccessGuard.guard(this.prod.company_id);
        this.items = [...data.Items];
        console.log('data: ', data);
      },
      error: (error) => {
        console.log('error: ', error);
      },
    });
  }
  toItemDetails(id: number, name: string): void {
    this.router.navigate([`/item/${id}`], { state: { pageName: name } });
  }

  edit(): void {
    this.editedItem = { ...this.prod };
    this.editingProcess = true;
  }
  save(): void {
    // Doing stuff with images of the producer.
    if (
      this.editedItem.photo_src !== this.prod.photo_src &&
      this.prod.photo_src !== 'default'
    ) {
      this.producersService.deletePhotoById(this.prod.id).subscribe({
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

    // Patching an producer.
    this.producersService.patch(this.prod.id, this.editedItem).subscribe({
      next: (data) => {
        console.log('!response: ', data);
        this.retrieveProducer();
        this.editingProcess = false;
        this.notificationService.createSuccessNotification();
      },
      error: (error) => {
        console.log('error: ', error);
      },
    });
  }
  cancel(): void {
    this.editingProcess = false;
    this.deletePrevPhoto();
  }

  choosePhoto(event: any): void {
    this.fileIsLoading = true;

    const file: File = <File>event.target.files[0];
    const formData = new FormData();
    const filename = `${getRandomNumber(10001, 99999)}_${file.name}`;
    formData.append('file', file, filename);

    this.deletePrevPhoto();
    this.producersService.attach(formData).subscribe(
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
    if (this.editedItem.photo_src !== this.prod.photo_src) {
      this.producersService
        .deletePhotoByName(this.editedItem.photo_src)
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

  async delete() {
    // Deleting prod's photo
    await this.producersService.deletePhotoById(this.prod.id).subscribe({
      next: (data) => {
        console.log('response: ', data);
      },
      error: (error) => {
        console.log('error: ', error);
      },
    });

    // Deleting prod
    await this.producersService.delete(this.prod.id).subscribe(
      (response) => {
        console.log('response: ', response);
        this.router.navigate(['/producers']);
        this.notificationService.createSuccessfullyDeletedNotification(
          this.prod.producer_name,
          true
        );
      },
      (error) => {
        console.log('error: ', error);
      }
    );
  }
  deleteItem(id: number, name: string): void {
    // Deleting item from the array to cause an animation.
    this.items = this.items.filter((item: any) => item.id !== id);

    // Deleting item's photo
    this.itemsService.deletePhotoById(id).subscribe({
      next: (data) => {
        console.log('response: ', data);
      },
      error: (error) => {
        console.log('error: ', error);
      },
    });

    // Deleting item
    this.itemsService.delete(id).subscribe(
      (response) => {
        console.log('response: ', response);
        this.notificationService.createSuccessfullyDeletedNotification(
          name,
          true
        );
      },
      (error) => {
        console.log('error: ', error);
      }
    );
  }

  onCloseEvent(confirm: boolean): void {
    this.modalActive = false;
    if (confirm) {
      this.delete();
    }
  }
}
