import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ItemPageComponent } from './components/item-page/item-page.component';
import { TableComponent } from './components/table/table.component';
import { CartComponent } from './components/cart/cart.component';
import { ExportComponent } from './components/export/export.component';
import { ExportRegistrationComponent } from './components/export-registration/export-registration.component';
import { ImportRegistrationComponent } from './components/import-registration/import-registration.component';
import { InventoryStatementComponent } from './components/inventory-statement/inventory-statement.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { SiteSettingsComponent } from './components/site-settings/site-settings.component';
import { RegistrateImportOrderComponent } from './components/registrate-import-order/registrate-import-order.component';
import { RegistrateExportOrderComponent } from './components/registrate-export-order/registrate-export-order.component';
import { EntryComponent } from './components/entry/entry.component';

const routes: Routes = [
  { path: '', component: TableComponent },
  { path: 'item/:id', component: ItemPageComponent },
  { path: 'cart', component: CartComponent },
  { path: 'export', component: ExportComponent },
  { path: 'export-registration', component: ExportRegistrationComponent },
  { path: 'import-registration', component: ImportRegistrationComponent },
  { path: 'inventory-statement', component: InventoryStatementComponent },
  { path: 'user-page', component: UserPageComponent },
  { path: 'site-settings', component: SiteSettingsComponent },
  {
    path: 'registrate-import-order/:id',
    component: RegistrateImportOrderComponent,
  },
  {
    path: 'registrate-export-order/:id',
    component: RegistrateExportOrderComponent,
  },
  { path: 'entry', component: EntryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
