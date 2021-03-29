import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import {catchError, first, map, tap} from 'rxjs/operators';

import { Order } from '../models/Order';
import { User } from '../models/User';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private url = 'http://localhost:3000/order';

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  fetchAll(userId: Pick<User, 'id'>): Observable<Order[]> {
    return this.http
      .get<Order[]>(`${this.url}/${userId}`, { responseType: 'json' })
      .pipe(
        catchError(this.errorHandlerService.handleError<Order[]>('fetchAll', [])),
      );
  }

  getTotalPrice(userId: Pick<User, 'id'>): any {
    return this.http
      .get(`${this.url}/price/${userId}`, { responseType: 'json' })
      .pipe(
        catchError(this.errorHandlerService.handleError<Order[]>('fetchAll', [])),
    );
  }

  addtoShoppingCart(formData: Partial<Order>, userId: Pick<User, 'id'>): Observable<Order> {
    return this.http
      .post<Order>(
        this.url,
        { title: formData.title, image: formData.image, price: formData.price, user: userId, quantity: 1},
        this.httpOptions
      )
      .pipe(
        catchError(this.errorHandlerService.handleError<Order>('addToShoppingCart'))
      );
  }

  upQuantity(orderId: number): Observable<{}> {
    return this.http
      .put<Order>(`${this.url}/${orderId}`, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<Order>('deleteOrder'))
      );
  }

  downQuantity(orderId: number, buttonNr: number, quantity: number): Observable<{}> {
    return this.http
      .put<Order>(`${this.url}/${orderId}`, {buttonNr, quantity}, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<Order>('deleteOrder'))
      );
  }
  deleteOrder(orderId: number): Observable<{}> {
    return this.http
      .delete<Order>(`${this.url}/${orderId}`, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<Order>('deleteOrder'))
      );
  }

  deleteAll(userId: Pick<User, 'id'>): Observable<{}> {
    return this.http
      .delete<Order>(`${this.url}/${userId}`, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<Order>('deleteAll'))
      );
  }
}
