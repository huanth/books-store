import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private authService: AuthService) { }

  userRole: string = '';
  loginForm!: FormGroup;

  ngOnInit(): void {

    // Check user login then redirect to home page
    if (localStorage.getItem('loggedIn') === 'true') {
      this.router.navigate(['/']);
    }

    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3),
      Validators.maxLength(20), Validators.pattern(/^[a-zA-Z0-9]*$/)]],
      password: ['', [Validators.required, Validators.minLength(8), 
      Validators.maxLength(32), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/)]],
    });
  }

  login() {

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
    
    if ( this.loginForm.value.username === '' || this.loginForm.value.password === '') {
      info.fire({
          icon: "error",
          title: "Username and password are not empty"
        });
      return;
    }

    this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe((res: any) => {

      if (res.length > 0) {
        info.fire({
          icon: "success",
          title: "Signed in successfully"
        });
      }
      else {
        info.fire({
          icon: "error",
          title: "Username and password are not correct"
        });
        return;
      }

      // Save user login
      this.authService.saveUserLogin(res);

      this.router.navigate(['/']);

    });

  }
}
