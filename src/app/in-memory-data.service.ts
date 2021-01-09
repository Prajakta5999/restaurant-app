import { Restaurant } from './restaurant';
import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';


@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const restaurants = [
      {id : 1, name: "Taj Hotel"},
      {id : 2, name: "Jain Plaza"},
      {id : 3, name: "Patel Residency"},
      {id : 4, name: "Sarang Hotel"},
      {id : 5, name: "Niharika Hotel"},
      {id : 6, name: "Nandanvan Hotel"},
      {id : 7, name: "Samar Hotel"}
    ];
    return {restaurants};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(restaurants: Restaurant[]): number {
    return restaurants.length > 0 ? Math.max(...restaurants.map(restaurant => restaurant.id)) + 1 : 1;
  }
}