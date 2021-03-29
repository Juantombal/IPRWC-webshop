import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';

import {Observable, of} from 'rxjs';

import { OrderService } from 'src/app/services/order.service';
import { AuthService } from 'src/app/services/auth.service';

import { Order } from 'src/app/models/Order';
import { User } from 'src/app/models/User';
import {MatDialog} from '@angular/material/dialog';
import {PayModalComponent} from '../modal/pay-modal/pay-modal.component';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.scss']
})
export class ShoppingcartComponent implements OnInit {
  @Output() create: EventEmitter<any> = new EventEmitter();
  orders$: Observable<Order[]>;
  userId: Pick<User, 'id'>;
  total: any;

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.userId;
    this.orders$ = this.fetchAll(this.userId);
    this.total = this.getTotalPrice(this.userId);
  }

  fetchAll(userId: Pick<User, 'id'>): Observable<Order[]> {
    this.total = this.getTotalPrice(this.userId);
    return this.orderService.fetchAll(userId);
  }

  getTotalPrice(userId: Pick<User, 'id'>): any {
    return this.orderService.getTotalPrice(userId);
  }

  upQuantity(orderId: number): void {
    this.orderService.upQuantity(orderId)
      .subscribe(() => (this.orders$ = this.fetchAll(this.userId)));
  }
  downQuantity(orderId: number, buttonNr: number, quantity: number): void {
    this.orderService.downQuantity(orderId, buttonNr, quantity)
      .subscribe(() => (this.orders$ = this.fetchAll(this.userId)));
  }
  delete(orderId: number): void {
    this.orderService.deleteOrder(orderId)
      .subscribe(() => (this.orders$ = this.fetchAll(this.userId)));
  }

  deleteAll(userId: Pick<User, 'id'>): void {
    this.orderService.deleteAll(userId)
      .subscribe(() => (this.orders$ = this.fetchAll(this.userId)));
  }
  payButton(): void {
    this.dialog.open(PayModalComponent);
    this.deleteAll(this.userId);
  }
}
