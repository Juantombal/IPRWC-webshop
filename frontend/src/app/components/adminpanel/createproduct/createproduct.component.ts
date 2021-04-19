import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {ProductService} from '../../../services/product.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-createproduct',
  templateUrl: './createproduct.component.html',
  styleUrls: ['./createproduct.component.scss']
})
export class CreateproductComponent implements OnInit {
  signupForm: FormGroup;
  public showErrormessage = false;

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.signupForm = this.createFormGroup();
  }


  createFormGroup(): FormGroup {
    return new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(2)]),
      image: new FormControl('', [Validators.required, Validators.minLength(2)]),
      description: new FormControl('', [Validators.required, Validators.minLength(2)]),
      price: new FormControl('', [Validators.required, Validators.minLength(2)]),
      quantity: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
    });
  }

  addProduct(): void {
    this.productService.addProduct(this.signupForm.value).subscribe((msg) => {
      this.router.navigate(['adminpanel']);
    }, (error: HttpErrorResponse) => {
      this.showErrormessage = true;
    });
  }
}
