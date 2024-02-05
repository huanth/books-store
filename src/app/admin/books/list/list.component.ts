import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { BooksService } from '../books.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  constructor(private http: HttpClient, private router: Router, private BooksService: BooksService) { }

  books: any = [];
  public confirmDeleteUserID: number = 0;


  ngOnInit(): void {
    this.BooksService.getAllBooks().subscribe((res: any) => {
      this.books = res;
    });
  }

  deleteBooks(id: number): void {
    this.confirmDeleteUserID = id;
  }

  confirmDelete(): void {
    this.BooksService.deleteBook(this.confirmDeleteUserID).subscribe((res: any) => {
      this.BooksService.getAllBooks().subscribe((res: any) => {
        this.books = res;
        Swal.fire({
          icon: 'success',
          title: 'User has been deleted',
          showConfirmButton: false,
          timer: 1500
        });
      });
    });
  }


}
