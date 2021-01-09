import { RestaurantService } from './../restaurant.service';
import { Restaurant } from './../restaurant';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  restaurants: Restaurant[] = [] ;
  myimage: string = "assets/images/K.jpg" ;

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.getRestaurants();
  }

  getRestaurants(): void {
    this.restaurantService.getRestaurants()
      .subscribe(restaurants => this.restaurants = restaurants.slice(1, 5));
  }

  dash_image1 : string = "assets/dash-images/1.jpg" ;
 //title : string = "dashboard";
 //dash_image : string = "assets/dash-images/G.jpg" ;


  
}
