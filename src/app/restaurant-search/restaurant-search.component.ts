import { RestaurantService } from './../restaurant.service';
import { Restaurant } from './../restaurant';
import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';


@Component({
  selector: 'app-restaurant-search',
  templateUrl: './restaurant-search.component.html',
  styleUrls: [ './restaurant-search.component.css' ]
})
export class RestaurantSearchComponent implements OnInit {
  
  private searchTerms = new Subject<string>();
  
  restaurants$: Observable<Restaurant[]>;

  constructor(private restaurantService: RestaurantService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.restaurants$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.restaurantService.searchRestaurants(term)),
    );
  }
}