import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  public srcToPhotos: string = 'http://localhost:8080/api/users/photo/';
  public user: any = [];
  public id!: number;

  constructor(
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    this.retrieveUser();
  }

  retrieveUser(): void {
    this.usersService.get(this.id).subscribe({
      next: (data) => {
        this.user = data;
        console.log('data: ', data);
      },
      error: (error) => {
        console.log('error: ', error);
      },
    });
  }
}
