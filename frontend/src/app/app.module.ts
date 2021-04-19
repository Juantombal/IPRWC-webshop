import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

import { NavigationComponent } from './components/navigation/navigation.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

import { AuthInterceptorService } from './services/auth-interceptor.service';
import { ProductsComponent } from './components/products/products.component';
import { ShoppingcartComponent } from './components/shoppingcart/shoppingcart.component';
import { ConfirmModalComponent } from './components/modal/confirm-modal/confirm-modal.component';
import {MatDialogModule} from '@angular/material/dialog';
import { PayModalComponent } from './components/modal/pay-modal/pay-modal.component';
import { AdminpanelComponent } from './components/adminpanel/adminpanel.component';
import { UpdateproductComponent } from './components/adminpanel/updateproduct/updateproduct.component';
import { CreateproductComponent } from './components/adminpanel/createproduct/createproduct.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingcartComponent,
    ConfirmModalComponent,
    PayModalComponent,
    AdminpanelComponent,
    UpdateproductComponent,
    CreateproductComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NoopAnimationsModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatToolbarModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatDialogModule,
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
