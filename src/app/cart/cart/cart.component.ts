import { Component } from '@angular/core';

import Swal from 'sweetalert2';


import { CartService } from '../cart.service';

@Component({
  selector: 'cart-list',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  constructor(private cartService: CartService) { }

  cartItems: any = [];
  total : number = 0;

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe((res: any) => {
      this.cartItems = res;

      this.cartItems.forEach((item: any) => {
        this.total += item.price * item.quantity;
      });
    });
  }

  removeItem(id: string) {
    this.cartService.deleteCartItem(id).subscribe((res: any) => {
      this.cartService.totalItemsInCart().subscribe((res: any) => {
        this.cartItems = res;
        Swal.fire({
          icon: 'success',
          title: 'Book has been deleted',
          showConfirmButton: false,
          timer: 1500
        });
        this.total = 0;
        this.cartItems.forEach((item: any) => {
          this.total += item.price * item.quantity;
        });
      });
    });
  }

}
