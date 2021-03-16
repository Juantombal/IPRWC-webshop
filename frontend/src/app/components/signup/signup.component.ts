import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  public showErrormessage = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.signupForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      postcode: new FormControl('', [Validators.required, Validators.minLength(6)]),
      street: new FormControl('', [Validators.required, Validators.minLength(2)]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(7),
      ]),
    });
  }

  signup(): void {
    this.authService.signup(this.signupForm.value).subscribe((msg) => {
      console.log(msg);
      this.router.navigate(['login']);
    }, (error: HttpErrorResponse) => {
      this.showErrormessage = true;
    });
  }
}
