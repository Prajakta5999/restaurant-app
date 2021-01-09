import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [

  {path: 'restaurants', component: RestaurantsComponent},
  {path: 'dashboard', component:DashboardComponent},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {path: 'detail/:id', component: RestaurantDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
