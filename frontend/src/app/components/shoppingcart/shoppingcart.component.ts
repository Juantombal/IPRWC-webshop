import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';

import { Observable } from 'rxjs';

import { OrderService } from 'src/app/services/order.service';
import { AuthService } from 'src/app/services/auth.service';

import { Order } from 'src/app/models/Order';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.scss']
})
export class ShoppingcartComponent implements OnInit {
  @Output() create: EventEmitter<any> = new EventEmitter();
  orders$: Observable<Order[]>;
  userId: Pick<User, 'id'>;
  total = 0;

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.userId;
    this.orders$ = this.fetchAll(this.userId);
  }
  fetchAll(userId: Pick<User, 'id'>): Observable<Order[]> {
    return this.orderService.fetchAll(userId);
  }

  delete(orderId: number): void {
    this.orderService.deleteOrder(orderId)
      .subscribe(() => (this.orders$ = this.fetchAll(this.userId)));
  }

  getTotal(): number {
    for (const order of this.orders$[length].subscribe()) {
      this.total = this.total + order.price;
    }
    return this.total;
  }
}
