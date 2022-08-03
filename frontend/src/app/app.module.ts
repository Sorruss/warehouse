import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { InterceptorService } from './services/interceptor/interceptor.service';
import { CookieService } from 'ngx-cookie-service';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { FilterByNamePipe } from './pipes/filter-by-name/filter-by-name.pipe';
import { ShortenPipe } from './pipes/shorten/shorten.pipe';

import { NgNumberDirective } from './directives/ng-number/ng-number.directive';
import { DateFormatDirective } from './directives/dateFormat/date-format.directive';

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
import { AdminFeaturesComponent } from './components/helpers/admin-features/admin-features.component';
import { ProducersComponent } from './components/producers/producers.component';
import { ProducerComponent } from './components/producer/producer.component';
import { UsersComponent } from './components/users/users.component';
import { UserComponent } from './components/user/user.component';
import { TranslateDatePipe } from './pipes/translateDate/translate-date.pipe';

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
    AdminFeaturesComponent,
    ProducersComponent,
    ProducerComponent,
    UsersComponent,
    UserComponent,
    ShortenPipe,
    DateFormatDirective,
    TranslateDatePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function httpTranslateLoader(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}
