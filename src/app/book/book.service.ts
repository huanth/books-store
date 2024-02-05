// auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

    private apiUrl = 'http://localhost:3000/books';

    constructor(private router: Router, private http: HttpClient) { }


    getAllBooks(): Observable<any> {
        return this.http.get(this.apiUrl);
    }

    getBookById(id: any): Observable<any> {
        return this.http.get(`${this.apiUrl}/${id}`);
    }

}