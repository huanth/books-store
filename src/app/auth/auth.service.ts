// auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<any>('');
  private userRole = new BehaviorSubject<string>('');
  
  private apiUrl = 'http://localhost:3000/users';

  constructor(private router: Router, private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    // json-sever get user by username and password
    return this.http.get(`${this.apiUrl}?username=${username}&password=${password}`);
  }

  register(user: any): Observable<any> {
    // json-sever add new user
    return this.http.post(this.apiUrl, user);
  }

  saveUserLogin(user: any) {
    this.loggedIn.next(true);
    this.userRole.next(user[0].role);

    // Save user to local storage
    localStorage.setItem('user', JSON.stringify(user[0]));
    localStorage.setItem('loggedIn', 'true');
  }

  logout() {

    this.loggedIn.next(false);
    this.userRole.next('');

    localStorage.removeItem('user');
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('userRole');
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  getUserRole() {
    return this.userRole.asObservable();
  }

}