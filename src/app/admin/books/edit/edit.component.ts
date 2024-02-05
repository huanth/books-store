import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { BooksService } from '../books.service';

@Component({
  selector: 'app-create',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private booksService: BooksService, private route: ActivatedRoute) { }

  editForm!: FormGroup;
  id : string = '';

  ngOnInit(): void {
    this.editForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      image: ['', Validators.required],
    });


    this.route.params.subscribe(params => {
      
      this.id = params['id'];
      
      this.get_user();
    });
  }

  get_user() {
    this.booksService.getBookById(this.id).subscribe((res: any) => {
      this.editForm.patchValue({
        title: res.title,
        author: res.author,
        price: res.price,
        quantity: res.quantity,
        image: res.image
      });
    });
  }

  update() {

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

    if (this.editForm.invalid) {
      info.fire({
        icon: "error",
        title: "Please fill in all fields"
      });
      return;
    }

    this.booksService.updateBook(this.id, this.editForm.value).subscribe((res: any) => {

      if (res) {
        info.fire({
          icon: "success",
          title: "Update book success"
        });
        this.router.navigate(['/admin/books']);
      } else {
        info.fire({
          icon: "error",
          title: "Update books fail"
        });
      }
    });
  }
}
