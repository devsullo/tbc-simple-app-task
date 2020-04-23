import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { AppStoreModule } from './store/app.store.module';
import { SharedModule } from './shared/shared.module';
import { AddClientComponent } from './pages/clients/add-client/add-client.component';
import { AddClientAddressComponent } from './pages/clients/add-client/add-client-address/add-client-address.component';
import { EditClientComponent } from './pages/clients/edit-client/edit-client.component';
import { ClientDetailComponent } from './pages/clients/client-detail/client-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    AddClientComponent,
    AddClientAddressComponent,
    EditClientComponent,
    ClientDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppStoreModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
