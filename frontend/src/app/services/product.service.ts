import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

import { Product } from '../models/product';
import { ErrorHandlerService } from './error-handler.service';
import {User} from '../models/User';
import {Order} from '../models/Order';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url = 'http://localhost:3000/product';

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  fetchAll(): Observable<Product[]> {
    return this.http
      .get<Product[]>(this.url, { responseType: 'json' })
      .pipe(
        catchError(this.errorHandlerService.handleError<Product[]>('fetchAll', []))
      );
  }

  getProductById(productId: number): Observable<Product> {
    return this.http
      .get<Product>(`${this.url}/${productId}`, { responseType: 'json' })
      .pipe(
        catchError(this.errorHandlerService.handleError<Product>('fetchProduct'))
      );
  }

  addProduct(product: Omit<Product, 'id'>): Observable<Product> {
    return this.http
      .post<Product>(
        this.url, product, this.httpOptions
      );
  }

  updateProduct(productId: number, formData: Partial<Product>): Observable<Product> {
    return this.http
      .put<Product>(
        `${this.url}/${productId}`, { title: formData.title, image: formData.image,
          description: formData.description, price: formData.price, quantity: formData.quantity}, this.httpOptions
      );
  }

  deleteOrder(productId: number): Observable<{}> {
    return this.http
      .delete<Order>(`${this.url}/${productId}`, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<Product>('deleteOrder'))
      );
  }
}
