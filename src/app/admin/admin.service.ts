// auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private loggedIn = new BehaviorSubject<any>('');
  private userRole = new BehaviorSubject<string>('');
  
  private apiUrl = 'http://localhost:3000/users';

  constructor(private router: Router, private http: HttpClient) { }


}