import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { FilterByNamePipe } from './pipes/filter-by-name/filter-by-name.pipe';

import { NgNumberDirective } from './directives/ng-number/ng-number.directive';

import { AppComponent } from './app.component';
import { RightSidebarComponent } from './components/right-sidebar/right-sidebar.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { TableComponent } from './components/table/table.component';
import { ItemPageComponent } from './components/item-page/item-page.component';
import { CartComponent } from './components/cart/cart.component';
import { ExportComponent } from './components/export/export.component';
import { ExportRegistrationComponent } from './components/export-registration/export-registration.component';
import { ImportRegistrationComponent } from './components/import-registration/import-registration.component';
import { InventoryStatementComponent } from './components/inventory-statement/inventory-statement.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { SiteSettingsComponent } from './components/site-settings/site-settings.component';
import { NotificationsComponent } from './components/helpers/notifications/notifications.component';
import { EntryComponent } from './components/entry/entry.component';
import { RegistrateImportOrderComponent } from './components/registrate-import-order/registrate-import-order.component';
import { RegistrateExportOrderComponent } from './components/registrate-export-order/registrate-export-order.component';
import { ModalDialogComponent } from './components/helpers/modal-dialog/modal-dialog.component';
import { CheckLengthPipe } from './pipes/check-length/check-length.pipe';

@NgModule({
  declarations: [
    AppComponent,
    RightSidebarComponent,
    TopbarComponent,
    TableComponent,
    ItemPageComponent,
    CartComponent,
    ExportComponent,
    ExportRegistrationComponent,
    ImportRegistrationComponent,
    InventoryStatementComponent,
    UserPageComponent,
    SiteSettingsComponent,
    NotificationsComponent,
    FilterByNamePipe,
    RegistrateImportOrderComponent,
    RegistrateExportOrderComponent,
    ModalDialogComponent,
    NgNumberDirective,
    EntryComponent,
    CheckLengthPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
