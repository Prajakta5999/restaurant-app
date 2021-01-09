import { MessageService } from './message.service';
import { RESTAURANTS } from './mock-restaurants';
import { Restaurant } from './restaurant';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  // addRestaurant(arg0: Restaurant) {
  //   throw new Error('Method not implemented.');
  // }
  // getRestaurant(id: number) {
  //   throw new Error('Method not implemented.');
  // }

  private restaurantsUrl = 'api/restaurants';  // URL to web api
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor( private http: HttpClient,private messageService: MessageService) { }
  
  // getRestaurants(): Observable<Restaurant[]> {

  //   // TODO: send the message _after_ fetching the heroes
  //   this.messageService.add('RestaurantService: fetched restaurants');
  //   return of(RESTAURANTS) ;
  // }

/** GET heroes from the server */
// getRestaurants(): Observable<Restaurant[]> {
//   return this.http.get<Restaurant[]>(this.restaurantsUrl)
// }

// getRestaurants(): Observable<Restaurant[]> {
//   return this.http.get<Restaurant[]>(this.restaurantsUrl)
//     .pipe(
//       catchError(this.handleError<Restaurant[]>('getRestaurants', []))
//     );
// }

/** GET heroes from the server */
getRestaurants(): Observable<Restaurant[]> {
  return this.http.get<Restaurant[]>(this.restaurantsUrl)
    .pipe(
      tap(_ => this.log('fetched restaurants')),
      catchError(this.handleError<Restaurant[]>('getRestaurants', []))
    );
}

 /** GET hero by id. Return `undefined` when id not found */
 getHeroNo404<Data>(id: number): Observable<Restaurant> {
  const url = `${this.restaurantsUrl}/?id=${id}`;
  return this.http.get<Restaurant[]>(url)
    .pipe(
      map(restaurants => restaurants[0]), // returns a {0|1} element array
      tap(h => {
        const outcome = h ? `fetched` : `did not find`;
        this.log(`${outcome} restaurant id=${id}`);
      }),
      catchError(this.handleError<Restaurant>(`getRestaurant id=${id}`))
    );
}



/** GET hero by id. Will 404 if id not found */
getRestaurant(id: number): Observable<Restaurant> {
  const url = `${this.restaurantsUrl}/${id}`;
  return this.http.get<Restaurant>(url).pipe(
    tap(_ => this.log(`fetched restaurant id=${id}`)),
    catchError(this.handleError<Restaurant>(`getRestaurant id=${id}`))
  );
}


searchRestaurants(term: string): Observable<Restaurant[]> {
  if (!term.trim()) {
    // if not search term, return empty hero array.
    return of([]);
  }
  return this.http.get<Restaurant[]>(`${this.restaurantsUrl}/?name=${term}`).pipe(
    tap(x => x.length ?
       this.log(`found restaurants matching "${term}"`) :
       this.log(`no restaurants matching "${term}"`)),
    catchError(this.handleError<Restaurant[]>('searchRestaurants', []))
  );
}

/** POST: add a new hero to the server */
addRestaurant(restaurant: Restaurant): Observable<Restaurant> {
  return this.http.post<Restaurant>(this.restaurantsUrl, restaurant, this.httpOptions).pipe(
    tap((newRestaurant: Restaurant) => this.log(`added restaurant w/ id=${newRestaurant.id}`)),
    catchError(this.handleError<Restaurant>('addRestaurant'))
  );
}


/** DELETE: delete the hero from the server */
deleteRestaurant(restaurant: Restaurant | number): Observable<Restaurant> {
  const id = typeof restaurant === 'number' ? restaurant : restaurant.id;
  const url = `${this.restaurantsUrl}/${id}`;

  return this.http.delete<Restaurant>(url, this.httpOptions).pipe(
    tap(_ => this.log(`deleted restaurant id=${id}`)),
    catchError(this.handleError<Restaurant>('deleteRestaurant'))
  );
}


/** PUT: update the hero on the server */
updateRestaurant(restaurant: Restaurant): Observable<any> {
  return this.http.put(this.restaurantsUrl, restaurant, this.httpOptions).pipe(
    tap(_ => this.log(`updated restaurant id=${restaurant.id}`)),
    catchError(this.handleError<any>('updateRestaurant'))
  );
}






private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

  // getRestaurant(id: number): Observable<Restaurant> {
  //   // TODO: send the message _after_ fetching the hero
  //   this.messageService.add(`RestaurantService: fetched restaurant id=${id}`);
  //   return of(RESTAURANTS.find(restaurant => restaurant.id === id));
  // }

  /** Log a RestaurantService message with the MessageService */
private log(message: string) {
  this.messageService.add(`RestaurantService: ${message}`);
}

 
}
