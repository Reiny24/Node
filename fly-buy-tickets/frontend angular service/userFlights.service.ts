import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

import { tap, catchError, last } from 'rxjs';

import { ErrorHandlerService } from './error-handler.service';
import { UserFlights } from '../models/user_flights';
import { FlightPlaces } from '../models/flight_places';
import { Flight } from '../models/flight';
import { newAccount } from '../models/new_account';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    @Inject(PLATFORM_ID) private platformId: any
  ) { }

  private url = "http://localhost:2222/users_flights";
  private url2 = "http://localhost:2222/flights_places";
  private url3 = "http://localhost:2222/flights";
  private url4 = "http://localhost:2222/registration";
  private url5 = "http://localhost:2222/login";

  httpOptions = { headers: new HttpHeaders({ "Content-Type": "application/json" }) }

  // For filters page
  setFilters(filters: any) { sessionStorage.setItem("filters", JSON.stringify(filters)) }

  // For compare page
  getFilters() {
    if (isPlatformBrowser(this.platformId)) {
      const retrievedFilters = sessionStorage.getItem("filters");
      return JSON.parse(retrievedFilters || '{}');
    }
  }

  fetchFilters(filters: any) {
    let params = new HttpParams();

    // Adding filters as params to request
    Object.entries(filters).forEach(([key, value]) => {
      params = params.append(key, String(value));
    });
    
    return this.http
      .get<Flight[]>(this.url3, { params, responseType: "json" })
      .pipe(tap(() => console.log('fetched flights')),
        catchError(this.errorHandlerService.handleError<Flight[]>("fetchFilters", []))
    )
  }
  
  setSelectedFlight(flight: any) { sessionStorage.setItem("flight", JSON.stringify(flight)) }

  // For places page
  fetchPlaces(flightID: number) {
    let params = new HttpParams();
    params = params.append("flightID", String(flightID));
    return this.http
      .get<FlightPlaces[]>(this.url2, { params, responseType: "json" })
      .pipe(tap(() => console.log('fetched flight_places')),
        catchError(this.errorHandlerService.handleError<FlightPlaces[]>("fetchPlaces", []))
      )
  }

  getFlightById() { 
    if (isPlatformBrowser(this.platformId)) {
      const retrievedFlight = sessionStorage.getItem("flight");
      return JSON.parse(retrievedFlight || '{}');
    }
  }

  post(flights: UserFlights[], mobile: string) {
    return this.http
      .post(this.url, [flights, this.getUser().id, mobile], this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("post")))
  }

  setNewCart() {
    localStorage.setItem('userCart', JSON.stringify({0: 0}))
  }

  getUserCart() {
    if (isPlatformBrowser(this.platformId)) {
      const cartData = localStorage.getItem('userCart');
      return cartData ? JSON.parse(cartData) : [];
    }
    else return [];
  }

  updateUserCart(place: any, flightID: number, price: number, flight: any) {
    if (isPlatformBrowser(this.platformId)) {
      let userCart: any = localStorage.getItem('userCart');
      if (userCart) userCart = JSON.parse(userCart);
      else userCart = { 0: 0 };

      userCart[0] += price;
      
      const keys = Object.keys(userCart);
      const newKey = keys.length === 0 ? 1 : Math.max(...keys.map(Number)) + 1;
      const newFlight = { place, flightID, flight }
      userCart[newKey] = newFlight;
      
      localStorage.setItem('userCart', JSON.stringify(userCart));
    }
  }

  updatePlaces(flights: any, userID: number) {
    console.log(flights)
    return this.http
      .put(this.url2, {flights, userID}, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("update")))
  }

  getUser() {
    if (isPlatformBrowser(this.platformId)) {
      let userData = localStorage.getItem('user');
      if (userData) return JSON.parse(userData);
    } 
    return {}
  }

  storeUserData(id: number, lastname: string, firstname: string, login: string, mobile: string) {
    localStorage.setItem("user", JSON.stringify({id, lastname, firstname, login, mobile}))
  }

  fetchUsersFlights(flightID: number, userID: number) {
    console.log(flightID, userID)
    return this.http
      .get(this.url, { params: { flightID: flightID.toString(), userID: userID.toString() }, responseType: 'json' })
      .pipe(
        tap(() => console.log('fetched user_flights')),
        catchError(this.errorHandlerService.handleError('fetchUsersFlights', []))
      );
  }

  // For pay page

  delete(id: number) {
    const url = `http://localhost:2222/user_flights/${id}`;
    return this.http
      .delete<Partial<UserFlights>>(url, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("delete")))
  }

  // For login page
  isLoggedIn() {
    if (isPlatformBrowser(this.platformId)) {
      let login = localStorage.getItem('login');
      if (login) return JSON.parse(login);
    } 
    return false
  }

  changeLoginStatus(value: boolean) {
    localStorage.setItem('refreshpage', String(true))
    localStorage.setItem('login', String(value));
  }

  changeRefreshPage() {
    localStorage.setItem('refreshpage', String(false))
  }

  getRefreshPage() {
    if (isPlatformBrowser(this.platformId)) {
      let refreshpage = localStorage.getItem('refreshpage');
      if (refreshpage) return JSON.parse(refreshpage);
    } 
    return false
  }

  postAccount(account: newAccount) {
    return this.http
      .post(this.url4, account, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("postAccount")))
  }

  fetchLogin(login: Login) {
    let params = new HttpParams();

    // Adding filters as params to request
    Object.entries(login).forEach(([key, value]) => {
      params = params.append(key, String(value));
    });
    
    return this.http
      .get<any>(this.url5, { params, responseType: "json" })
      .pipe(tap(() => console.log('fetched login')),
        catchError(this.errorHandlerService.handleError<any>("fetchLogin", []))
    )
  }

  formatData(placesSlice: Flight[]) {
    const copiedFlights = [...placesSlice];

    const modifiedFlights = copiedFlights.map(flight => {
      const dateParts = flight.date.split('T')[0].split('-');
      const year = parseInt(dateParts[0]);
      const month = parseInt(dateParts[1]) - 1;
      const day = parseInt(dateParts[2]);

      const newDate = new Date(year, month, day);
      newDate.setDate(newDate.getDate() + 2);

      const modifiedDate = newDate.toISOString().split('T')[0];

      flight.date = modifiedDate;
      return flight;
    });

    return modifiedFlights
  }
}