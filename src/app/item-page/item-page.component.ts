import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.css'],
})
export class ItemPageComponent implements OnInit {
  constructor(private route: ActivatedRoute, private location: Location) {}
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
  }
}
