import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {

  private cartItemsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private wishlistItemsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  // Expose observables
  cartItems$: Observable<any[]> = this.cartItemsSubject.asObservable();
  wishlistItems$: Observable<any[]> = this.wishlistItemsSubject.asObservable();

  addToCart(item: any) {
    const wishlistIndex = this.wishlistItemsSubject.value.findIndex(wishlistItem => wishlistItem.courseName === item.courseName);

    if (wishlistIndex !== -1) {
      const updatedWishlist = [...this.wishlistItemsSubject.value];
      updatedWishlist.splice(wishlistIndex, 1);
      this.wishlistItemsSubject.next(updatedWishlist);
    }

    const cartIndex = this.cartItemsSubject.value.findIndex(cartItem => cartItem.courseName === item.courseName);

    if (cartIndex !== -1) {
      return;
    }

    const updatedCart = [...this.cartItemsSubject.value, item];
    this.cartItemsSubject.next(updatedCart);
  }

  addToWishlist(item: any) {
    const cartIndex = this.cartItemsSubject.value.findIndex(cartItem => cartItem.courseName === item.courseName);

    if (cartIndex !== -1) {
      const updatedCart = [...this.cartItemsSubject.value];
      updatedCart.splice(cartIndex, 1);
      this.cartItemsSubject.next(updatedCart);
    }

    const wishlistIndex = this.wishlistItemsSubject.value.findIndex(wishlistItem => wishlistItem.courseName === item.courseName);

    if (wishlistIndex !== -1) {
      return;
    }

    const updatedWishlist = [...this.wishlistItemsSubject.value, item];
    this.wishlistItemsSubject.next(updatedWishlist);
  }

  getCartItems() {
    return [...this.cartItemsSubject.value];
  }

  getWishlistItems() {

    return [...this.wishlistItemsSubject.value];
  }
}
