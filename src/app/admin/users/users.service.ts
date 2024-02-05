// auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
    private allUser = new BehaviorSubject<any>([]);

    private apiUrl = 'http://localhost:3000/users';

    constructor(private router: Router, private http: HttpClient) { }


    getAllUser(): Observable<any> {
        return this.http.get(this.apiUrl);
    }

    deleteUser(id: any): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }

    createUser(data: any): Observable<any> {
        return this.http.post(this.apiUrl, data);
    }

    getUserById(id: any): Observable<any> {
        return this.http.get(`${this.apiUrl}/${id}`);
    }

    updateUser(id: any, data: any): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`, data);
    }

}