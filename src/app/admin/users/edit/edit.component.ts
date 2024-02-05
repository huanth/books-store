import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { UsersService } from '../users.service';

@Component({
  selector: 'app-create',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {

  constructor(private fb: FormBuilder, private router: Router, private usersService: UsersService, private route: ActivatedRoute) { }

  editForm!: FormGroup;
  id : string = '';

  ngOnInit(): void {
    this.editForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      name: ['', Validators.required],
    });

    this.route.params.subscribe(params => {
      
      this.id = params['id'];
      
      this.get_user();
    });
  }

  get_user() {
    this.usersService.getUserById(this.id).subscribe((res: any) => {
      this.editForm.patchValue({
        username: res.username,
        password: res.password,
        email: res.email,
        phone: res.phone,
        name: res.name
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

    // Add default role is user
    this.editForm.value.role = 'user';

    this.usersService.updateUser(this.id, this.editForm.value).subscribe((res: any) => {

      if (res) {
        info.fire({
          icon: "success",
          title: "Update user success"
        });
        this.router.navigate(['/admin/users']);
      } else {
        info.fire({
          icon: "error",
          title: "Update user fail"
        });
      }
    });
  }
}
