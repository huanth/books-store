import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UsersService } from '../users.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  constructor(private fb: FormBuilder, private router: Router, private usersService: UsersService) { }

  createForm!: FormGroup;

  ngOnInit(): void {
    this.createForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      name: ['', Validators.required],
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

    // Add default role is user
    this.createForm.value.role = 'user';

    this.usersService.createUser(this.createForm.value).subscribe((res: any) => {

      if (res) {
        info.fire({
          icon: "success",
          title: "Create user success"
        });
        this.router.navigate(['/admin/users']);
      } else {
        info.fire({
          icon: "error",
          title: "Create user fail"
        });
      }
    });
  }
}
