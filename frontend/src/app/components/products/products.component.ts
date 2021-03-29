import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import { Observable } from 'rxjs';

import { ProductService } from 'src/app/services/product.service';

import { Product } from 'src/app/models/Product';
import {Order} from '../../models/Order';
import {first} from 'rxjs/operators';
import {OrderService} from '../../services/order.service';
import {AuthService} from '../../services/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmModalComponent} from '../modal/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  @Output() create: EventEmitter<any> = new EventEmitter();
  products$: Observable<Product[]>;
  isAuthenticated = false;
  textVisible = false;

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private authService: AuthService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.products$ = this.fetchAll();
    this.authService.isUserLoggedIn$.subscribe((isLoggedIn) => {
      this.isAuthenticated = isLoggedIn;
    });
  }
  fetchAll(): Observable<Product[]> {
    return this.productService.fetchAll();
  }

  addToShoppingCart(formData: Partial<Order>): void {
    if (!this.isAuthenticated) {
      this.dialog.open(ConfirmModalComponent);
    } else {
      this.textVisible = true;
      setTimeout(() => this.textVisible = false, 2000);
      this.orderService
        .addtoShoppingCart(formData, this.authService.userId)
        .pipe(first())
        .subscribe(() => {
          this.create.emit(null);
        });
    }
  }
}
