import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import { Observable } from 'rxjs';

import { ProductService } from 'src/app/services/product.service';

import { Product } from 'src/app/models/Product';
import {Order} from '../../models/Order';
import {first} from 'rxjs/operators';
import {OrderService} from '../../services/order.service';
import {AuthService} from '../../services/auth.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  @Output() create: EventEmitter<any> = new EventEmitter();
  products$: Observable<Product[]>;

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.products$ = this.fetchAll();
  }
  fetchAll(): Observable<Product[]> {
    return this.productService.fetchAll();
  }

  onSubmit(formData: Partial<Order>): void {
    this.orderService
      .createOrder(formData, this.authService.userId)
      .pipe(first())
      .subscribe(() => {
        this.create.emit(null);
      });
  }
}
