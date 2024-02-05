import { Component } from '@angular/core';

import { BookService } from '../book.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  constructor(private bookService: BookService) { }

  books: any = [];

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe((res: any) => {
      this.books = res;
    });
  }

}
