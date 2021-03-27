import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import {catchError, first, tap} from 'rxjs/operators';

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

  deleteOrder(orderId: number): Observable<{}> {
    return this.http
      .delete<Order>(`${this.url}/${orderId}`, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<Order>('deleteOrder'))
      );
  }
}
