import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, BehaviorSubject } from 'rxjs';
import { first, catchError, tap } from 'rxjs/operators';

import { User } from '../models/User';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:3000/auth';

  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
  userId: Pick<User, 'id'>;
  userName: Pick<User, 'name'>;

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
      .post<User>(`${this.url}/signup`, user, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError)
      );
  }

  login(email: Pick<User, 'email'>, password: Pick<User, 'password'>): Observable<{
    token: string;
    userId: Pick<User, 'id'>;
    userName: Pick<User, 'name'>;
  }> {
    return this.http
      .post(`${this.url}/login`, { email, password }, this.httpOptions)
      .pipe(
        first(),
        tap((tokenObject: { token: string; userId: Pick<User, 'id'> , userName: Pick<User, 'name'>}) => {
          this.userId = tokenObject.userId;
          this.userName = tokenObject.userName;
          localStorage.setItem('token', tokenObject.token);
          this.isUserLoggedIn$.next(true);
          this.router.navigate(['posts']);
        }),
        catchError(
          this.errorHandlerService.handleError<{
            token: string;
            userId: Pick<User, 'id'>;
            userName: Pick<User, 'name'>;
          }>('login')
        )
      );
  }
}
