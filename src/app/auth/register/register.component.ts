import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private authService: AuthService) { }

  registerForm!: FormGroup;

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      name: ['', Validators.required],
    });
  }

  register() {

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

    if (this.registerForm.invalid) {
      info.fire({
        icon: "error",
        title: "Please fill in all fields"
      });
      return;
    }

    // Add default role is user
    this.registerForm.value.role = 'user';

    this.authService.register(this.registerForm.value).subscribe((res: any) => {

      if (res) {
        info.fire({
          icon: "success",
          title: "Register success"
        });

        this.router.navigate(['/login']);
      } else {
        info.fire({
          icon: "error",
          title: "Register failed"
        });
      }
    });


  }
}
