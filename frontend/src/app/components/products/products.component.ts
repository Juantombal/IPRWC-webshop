import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { ProductService } from 'src/app/services/product.service';

import { Product } from 'src/app/models/Product';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(
    private productService: ProductService,
  ) {}

  ngOnInit(): void {
    this.products$ = this.fetchAll();
  }
  fetchAll(): Observable<Product[]> {
    return this.productService.fetchAll();
  }
}
