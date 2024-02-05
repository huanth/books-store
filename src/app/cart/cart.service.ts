// auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
    private totalItemInCart = new BehaviorSubject<number>(0);
    private userRole = new BehaviorSubject<string>('');
    
    private apiUrl = 'http://localhost:3000/carts';

    constructor(private router: Router, private http: HttpClient) { }

    getCartItems() {
        return this.http.get(this.apiUrl);
    }

    addToCart(data: any) {
        return this.http.post(this.apiUrl, data);
    }

    updateCartItem(id: string, data: any) {
        console.log('cart id: ', id);
        return this.http.put(`${this.apiUrl}/${id}`, data);
    }

    deleteCartItem(id: string) {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }

    isExisingInCart(id: string) {
        return this.http.get(`${this.apiUrl}?bookId=${id}`);
    }

    totalItemsInCart() {
        return this.http.get(`${this.apiUrl}`).pipe(
            tap((res: any) => {
                this.totalItemInCart.next(res.length);
                localStorage.setItem('totalItemInCart', res.length);
            })
        );
    }

    getTotalItemsInCart(): Observable<number> {
        return this.totalItemInCart.asObservable();
    }
}