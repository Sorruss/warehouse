import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RightSidebarComponent } from './right-sidebar/right-sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { TableComponent } from './table/table.component';
import { ItemPageComponent } from './item-page/item-page.component';
import { CartComponent } from './cart/cart.component';
import { ExportComponent } from './export/export.component';
import { ExportRegistrationComponent } from './export-registration/export-registration.component';
import { ImportRegistrationComponent } from './import-registration/import-registration.component';
import { InventoryStatementComponent } from './inventory-statement/inventory-statement.component';

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
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
