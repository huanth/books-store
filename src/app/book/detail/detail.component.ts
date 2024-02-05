import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';


import { BookService } from '../book.service';
import { CartService } from '../../cart/cart.service';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {

  constructor(private router: Router, private route: ActivatedRoute, private bookService: BookService, private cartService: CartService) { }

  id : string = '';
  book: any;

  ngOnInit() {
    this.route.params.subscribe(params => {
      
      this.id = params['id'];
      
      this.get_book();
    });
  }

  get_book() {
    this.bookService.getBookById(this.id).subscribe((res: any) => {
      this.book = res;
    });
  }

  addToCart() {

    // Check if the book is already in the cart
    this.cartService.isExisingInCart(this.id).subscribe((res: any) => {
      if (res.length > 0) {
        // Update the quantity in the cart
        var book_data = {
          bookId: this.id,
          title: this.book.title,
          price: this.book.price,
          quantity: res[0].quantity + 1
        };

        var id = res[0].id;
        this.cartService.updateCartItem(id, book_data).subscribe((res: any) => {
          Swal.mixin({
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          }).fire({
            icon: "success",
            title: "Book added to cart"
          });
        });
      } else {
        // Add the book to the cart
        this.cartService.addToCart({bookId: this.id, title: this.book.title, price: this.book.price, quantity: 1 }).subscribe((res: any) => {
          Swal.mixin({
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          }).fire({
            icon: "success",
            title: "Book added to cart"
          });
        });
      }
    });
  }

}
