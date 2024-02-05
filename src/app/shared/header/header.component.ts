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

  ngOnInit(): void {
    this.isLogin = localStorage.getItem('loggedIn') == 'true' ? true : false;
    this.userRole = localStorage.getItem('userRole') || '';

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
  }

  logout() {

    this.isLogin = false;
    this.userRole = '';

    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
