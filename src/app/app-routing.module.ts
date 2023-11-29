import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemDetailsComponent } from './item-details/item-details.component'; // Adjust the path as needed
import { DisplayComponent } from './display/display.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  { path: 'products/:id', component: ItemDetailsComponent },
  { path: '', component: DisplayComponent },
  {path:'cart', component:CartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
