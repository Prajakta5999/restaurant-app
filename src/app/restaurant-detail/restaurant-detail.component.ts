import { RestaurantService } from './../restaurant.service';
import { Restaurant } from './../restaurant';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';





@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.css']
})
export class RestaurantDetailComponent implements OnInit {

  // @Input() restaurant: Restaurant;
  restaurant: Restaurant;

  constructor(
    private route: ActivatedRoute ,
    private restaurantService: RestaurantService,
    private location: Location

  ) { }

  ngOnInit(): void {
    this.getRestaurant();
  }

  getRestaurant(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.restaurantService.getRestaurant(id)
      .subscribe(restaurant => this.restaurant = restaurant);
  }

  goBack(): void{

      this.location.back() ;

  }

  save(): void {
    this.restaurantService.updateRestaurant(this.restaurant)
      .subscribe(() => this.goBack());
  }

}
