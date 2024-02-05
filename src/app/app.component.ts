import { Component } from '@angular/core';

import { BookService } from './book/book.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'book-store';

  constructor(private bookService: BookService) { }

  books: any = [];

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe((res: any) => {
      this.books = res;
    });
  }
}
