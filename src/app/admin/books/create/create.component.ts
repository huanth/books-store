import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { BooksService } from '../books.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private booksService: BooksService) { }

  createForm!: FormGroup;

  ngOnInit(): void {
    this.createForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  create() {

    const info = Swal.mixin({
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });

    if (this.createForm.invalid) {
      info.fire({
        icon: "error",
        title: "Please fill in all fields"
      });
      return;
    }

    this.booksService.createBook(this.createForm.value).subscribe((res: any) => {

      if (res) {
        info.fire({
          icon: "success",
          title: "Create books success"
        });
        this.router.navigate(['/admin/books']);
      } else {
        info.fire({
          icon: "error",
          title: "Create book fail"
        });
      }
    });
  }
}
