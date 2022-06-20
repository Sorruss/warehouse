import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ItemPageComponent } from './item-page/item-page.component';
import { TableComponent } from './table/table.component';
import { CartComponent } from './cart/cart.component';
import { ExportComponent } from './export/export.component';
import { ExportRegistrationComponent } from './export-registration/export-registration.component';
import { ImportRegistrationComponent } from './import-registration/import-registration.component';
import { InventoryStatementComponent } from './inventory-statement/inventory-statement.component';

const routes: Routes = [
  { path: '', component: TableComponent },
  { path: 'item/:id', component: ItemPageComponent },
  { path: 'cart', component: CartComponent },
  { path: 'export', component: ExportComponent },
  { path: 'export-registration', component: ExportRegistrationComponent },
  { path: 'import-registration', component: ImportRegistrationComponent },
  { path: 'inventory-statement', component: InventoryStatementComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
