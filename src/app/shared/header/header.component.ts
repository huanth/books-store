import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../auth/auth.service'
import { CartService } from '../../cart/cart.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private authService: AuthService, private router: Router, private cartService: CartService) { }

  isLogin: string | boolean = '';
  userRole: string = '';
  totalItemInCart: number = 0;

  ngOnInit(): void {
    this.isLogin = localStorage.getItem('loggedIn') == 'true' ? true : false;
    this.userRole = localStorage.getItem('userRole') || '';
    this.totalItemInCart = parseInt(localStorage.getItem('totalItemInCart') || '0');

    this.authService.isLoggedIn().subscribe((value) => {
      if (value) {
        this.isLogin = true;
      }
    });

    this.authService.getUserRole().subscribe((value) => {
      if (value) {
        this.userRole = value;
      }
    });

    this.cartService.totalItemsInCart().subscribe((value) => {
      console.log(value);
      this.totalItemInCart = value.length;
    });
  }

  logout() {

    this.isLogin = false;
    this.userRole = '';

    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
