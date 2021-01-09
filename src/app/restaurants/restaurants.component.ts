//import { MessageService } from './../message.service';
import { RestaurantService } from './../restaurant.service';
import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../restaurant';
//import { RESTAURANTS } from './../mock-restaurants';




@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

  restaurants: Restaurant[] ;
  //selectedRestaurant: Restaurant;

  constructor( private restaurantService: RestaurantService){}
    // private messageService: MessageService) { }

  ngOnInit(): void {

    this.getRestaurants();
  }
  // onSelect(restaurant: Restaurant): void
  // {
  //   this.selectedRestaurant = restaurant;
  //   this.messageService.add(`RestaurantsComponent: Selected restaurant id=${restaurant.id}`);

  // }

  getRestaurants(): void {
    this.restaurantService.getRestaurants()
    .subscribe(restaurants => this.restaurants = restaurants) ;
  }

  add(name: string): void {
  name = name.trim();
  if (!name) { return; }
  this.restaurantService.addRestaurant({ name } as Restaurant)
    .subscribe(restaurant => {
      this.restaurants.push(restaurant);
    });
}

delete(restaurant: Restaurant): void {
  this.restaurants = this.restaurants.filter(r => r !== restaurant);
  this.restaurantService.deleteRestaurant(restaurant).subscribe();
}


}
