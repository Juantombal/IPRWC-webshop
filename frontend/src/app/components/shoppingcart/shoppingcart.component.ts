import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';

import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';

import { OrderService } from 'src/app/services/order.service';
import { AuthService } from 'src/app/services/auth.service';

import { Order } from 'src/app/models/Order';
import { User } from 'src/app/models/User';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.scss']
})
export class ShoppingcartComponent implements OnInit {
  @Output() create: EventEmitter<any> = new EventEmitter();
  orders$: Observable<Order[]>;
  userId: Pick<User, 'id'>;

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.orders$ = this.fetchAll();
    this.userId = this.authService.userId;
  }

  fetchAll(): Observable<Order[]> {
    return this.orderService.fetchAll();
  }

  delete(orderId: number): void {
    this.orderService.deleteOrder(orderId)
      .subscribe(() => (this.orders$ = this.fetchAll()));
  }
}
