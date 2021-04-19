import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '../../models/Product';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../models/User';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.scss']
})
export class AdminpanelComponent implements OnInit {
  products$: Observable<Product[]>;
  users$: Observable<User[]>;

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.products$ = this.fetchAll();
    this.users$ = this.fetchAllUsers();
  }

  makeAdmin(userId: number, btnNr: number): void {
    this.authService.makeAdmin(userId, btnNr)
      .subscribe(() => (this.users$ = this.fetchAllUsers()));
  }

  fetchAll(): Observable<Product[]> {
    return this.productService.fetchAll();
  }

  fetchAllUsers(): Observable<User[]> {
    return this.authService.fetchAll();
  }

  delete(productId: number): void {
    this.productService.deleteOrder(productId)
      .subscribe(() => (this.products$ = this.fetchAll()));
  }

  getNavigation(link, id) {
    if (id === '') {
      this.router.navigate([link]);
    } else {
      this.router.navigate([link + '/' + id]);
    }
  }

  addProductPage(link) {
    this.router.navigate([link]);
  }
}
