import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
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
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
