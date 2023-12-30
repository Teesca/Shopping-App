import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private cartItemsSubject = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() { }

  addToCart(item: any) {
    const currentCart = this.cartItemsSubject.value;
    const updatedCart = [...currentCart, item];
    this.cartItemsSubject.next(updatedCart);
  }

  getCartCount() {
    return this.cartItemsSubject.value.length;
  }
}
