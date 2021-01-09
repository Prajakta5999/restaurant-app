import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import {FormsModule} from '@angular/forms';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
 import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
 import { InMemoryDataService } from './in-memory-data.service';
import { RestaurantSearchComponent } from './restaurant-search/restaurant-search.component';

@NgModule({
  declarations: [
    AppComponent,
    RestaurantsComponent,
    RestaurantDetailComponent,
    MessagesComponent,
    DashboardComponent,
    RestaurantSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
// and returns simulated server responses.
// Remove it when a real server is ready to receive requests.
HttpClientInMemoryWebApiModule.forRoot(
  InMemoryDataService, { dataEncapsulation: false }
)
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
