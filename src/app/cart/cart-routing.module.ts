import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  { path: 'cart', redirectTo: 'cart/cart', pathMatch: 'full'},
  { path: 'cart/cart', component: CartComponent },
  { path: 'cart/checkout', component: CheckoutComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class CartRoutingModule { }