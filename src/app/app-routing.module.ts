import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemDetailsComponent } from './item-details/item-details.component'; // Adjust the path as needed
import { DisplayComponent } from './display/display.component';
import { CartComponent } from './cart/cart.component';
import { RegisterComponent } from './register/register.component';
import  { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: DisplayComponent },
  { path: 'products/:id', component: ItemDetailsComponent },
  { path: 'cart', component: CartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
