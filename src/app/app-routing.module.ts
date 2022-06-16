import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ItemPageComponent } from './item-page/item-page.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  { path: '', component: TableComponent },
  { path: 'item/:id', component: ItemPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
