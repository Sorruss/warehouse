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

import { AuthGuardService } from './services/auth-guard/auth-guard.service';

const routes: Routes = [
  { path: '', canActivate: [AuthGuardService], component: TableComponent },
  {
    path: 'item/:id',
    canActivate: [AuthGuardService],
    component: ItemPageComponent,
  },
  { path: 'cart', canActivate: [AuthGuardService], component: CartComponent },
  {
    path: 'export',
    canActivate: [AuthGuardService],
    component: ExportComponent,
  },
  {
    path: 'export-registration',
    canActivate: [AuthGuardService],
    component: ExportRegistrationComponent,
  },
  {
    path: 'import-registration',
    canActivate: [AuthGuardService],
    component: ImportRegistrationComponent,
  },
  {
    path: 'inventory-statement',
    canActivate: [AuthGuardService],
    component: InventoryStatementComponent,
  },
  {
    path: 'user-page',
    canActivate: [AuthGuardService],
    component: UserPageComponent,
  },
  {
    path: 'site-settings',
    canActivate: [AuthGuardService],
    component: SiteSettingsComponent,
  },
  {
    path: 'registrate-import-order/:id',
    canActivate: [AuthGuardService],
    component: RegistrateImportOrderComponent,
  },
  {
    path: 'registrate-export-order/:id',
    canActivate: [AuthGuardService],
    component: RegistrateExportOrderComponent,
  },
  { path: 'entry', component: EntryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
