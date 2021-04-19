import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '../../../models/Product';
import {ProductService} from '../../../services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-updateproduct',
  templateUrl: './updateproduct.component.html',
  styleUrls: ['./updateproduct.component.scss']
})
export class UpdateproductComponent implements OnInit {
  product: Observable<Product>;
  productId: any;
  signupForm: FormGroup;

  constructor(
    private productService: ProductService,
    private router: Router,
    private actRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.productId = this.actRoute.snapshot.params.id;
    this.product = this.getProductById(this.productId);
    this.signupForm = this.createFormGroup();
  }

  getProductById(productId: number): Observable<Product> {
    return this.productService.getProductById(productId);
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(2)]),
      image: new FormControl('', [Validators.required, Validators.minLength(2)]),
      description: new FormControl('', [Validators.required, Validators.minLength(2)]),
      price: new FormControl('', [Validators.required, Validators.minLength(1)]),
      quantity: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
    });
  }

  updateProduct(): void {
    this.productService.updateProduct(this.productId , this.signupForm.value).subscribe((msg) => {
      this.product = this.getProductById(this.productId);
    }, (error: HttpErrorResponse) => {
    });
  }
}
