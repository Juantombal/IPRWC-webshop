import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './services/auth-guard.service';

import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import {ShoppingcartComponent} from './components/shoppingcart/shoppingcart.component';
import {AdminpanelComponent} from './components/adminpanel/adminpanel.component';
import {UpdateproductComponent} from './components/adminpanel/updateproduct/updateproduct.component';
import {CreateproductComponent} from './components/adminpanel/createproduct/createproduct.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent }, // canActivate: [AuthGuard]
  { path: 'shoppingcart', component: ShoppingcartComponent , canActivate: [AuthGuard]},
  { path: 'adminpanel', component: AdminpanelComponent , canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'updateproduct/:id', component: UpdateproductComponent, canActivate: [AuthGuard]},
  { path: 'createproduct', component: CreateproductComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
