import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, BehaviorSubject } from 'rxjs';
import { first, catchError, tap } from 'rxjs/operators';

import { User } from '../models/User';
import { ErrorHandlerService } from './error-handler.service';
import {Product} from "../models/Product";
import {Order} from "../models/Order";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:3000/auth';

  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
  userId: Pick<User, 'id'>;
  userName: Pick<User, 'name'>;
  userRole = new BehaviorSubject<boolean>(false);

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private router: Router
  ) {}

  signup(user: Omit<User, 'id'>): Observable<User> {
    return this.http
      .post<User>(`${this.url}/signup`, user, this.httpOptions);
  }

  login(email: Pick<User, 'email'>, password: Pick<User, 'password'>): Observable<{
    token: string;
    userId: Pick<User, 'id'>;
    userName: Pick<User, 'name'>;
    userRole: boolean;
  }> {
    return this.http
      .post(`${this.url}/login`, { email, password }, this.httpOptions)
      .pipe(
        first(),
        tap((tokenObject: { token: string; userId: Pick<User, 'id'> , userName: Pick<User, 'name'>, userRole: boolean}) => {
          this.userId = tokenObject.userId;
          this.userName = tokenObject.userName;
          this.userRole.next(tokenObject.userRole);
          localStorage.setItem('token', tokenObject.token);
          this.isUserLoggedIn$.next(true);
          this.router.navigate(['product']);
        }),
        catchError(
          this.errorHandlerService.handleError<{
            token: string;
            userId: Pick<User, 'id'>;
            userName: Pick<User, 'name'>;
            userRole: boolean;
          }>('login')
        )
      );
  }

  fetchAll(): Observable<User[]> {
    return this.http
      .get<User[]>(this.url, { responseType: 'json' })
      .pipe(
        catchError(this.errorHandlerService.handleError<User[]>('FetchAllUsers', []))
      );
  }

  makeAdmin(userId: number, btnNr: number): Observable<{}> {
    return this.http
      .put<User>(`${this.url}/${userId}` , {btnNr}, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<User>('makeAdmin'))
      );
  }
}
