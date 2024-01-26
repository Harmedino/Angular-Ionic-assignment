import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  // BehaviorSubjects to manage the state of cart items and wishlist items
  private cartItemsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    []
  );
  private wishlistItemsSubject: BehaviorSubject<any[]> = new BehaviorSubject<
    any[]
  >([]);

  // Expose observables for external components to subscribe to changes
  cartItems$: Observable<any[]> = this.cartItemsSubject.asObservable();
  wishlistItems$: Observable<any[]> = this.wishlistItemsSubject.asObservable();

  // Method to add a course to the cart and handle wishlist removal if applicable
  addToCart(item: any): string {
    // Check if the course is in the wishlist
    const wishlistIndex = this.wishlistItemsSubject.value.findIndex(
      (wishlistItem) => wishlistItem.courseName === item.courseName
    );

    // If in wishlist, remove from wishlist and add to cart
    if (wishlistIndex !== -1) {
      const updatedWishlist = [...this.wishlistItemsSubject.value];
      updatedWishlist.splice(wishlistIndex, 1);
      this.wishlistItemsSubject.next(updatedWishlist);

      const updatedCart = [
        ...this.cartItemsSubject.value,
        { ...item, wishlist: false },
      ];
      this.cartItemsSubject.next(updatedCart);

      return 'Course added to cart successfully. Removed from wishlist.';
    }

    // Check if the course is already in the cart
    const cartIndex = this.cartItemsSubject.value.findIndex(
      (cartItem) => cartItem.courseName === item.courseName
    );

    // If already in cart, return a message
    if (cartIndex !== -1) {
      return 'Course already exists in the cart.';
    }

    // Add the course to the cart
    const updatedCart = [
      ...this.cartItemsSubject.value,
      { ...item, wishlist: false },
    ];
    this.cartItemsSubject.next(updatedCart);

    return 'Course added to cart successfully.';
  }

  // Method to clear the cart by setting it to an empty array
  clearCart(): void {
    this.cartItemsSubject.next([]); // Set an empty array to clear the cart
  }

  // Method to add a course to the wishlist and handle cart removal if applicable
  addToWishlist(item: any): string {
    // Check if the course is in the cart
    const cartIndex = this.cartItemsSubject.value.findIndex(
      (cartItem) => cartItem.courseName === item.courseName
    );

    // If in cart, remove from cart and add to wishlist
    if (cartIndex !== -1) {
      const updatedCart = [...this.cartItemsSubject.value];
      updatedCart.splice(cartIndex, 1);
      this.cartItemsSubject.next(updatedCart);

      const updatedWishlist = [
        ...this.wishlistItemsSubject.value,
        { ...item, wishlist: true },
      ];
      this.wishlistItemsSubject.next(updatedWishlist);

      return 'Course removed from cart. Added to wishlist successfully.';
    }

    // Check if the course is already in the wishlist
    const wishlistIndex = this.wishlistItemsSubject.value.findIndex(
      (wishlistItem) => wishlistItem.courseName === item.courseName
    );

    // If already in wishlist, return a message
    if (wishlistIndex !== -1) {
      return 'Course already exists in the wishlist.';
    }

    // Add the course to the wishlist
    const updatedWishlist = [
      ...this.wishlistItemsSubject.value,
      { ...item, wishlist: true },
    ];
    this.wishlistItemsSubject.next(updatedWishlist);

    return 'Course added to wishlist successfully.';
  }

  // Method to delete a course from the cart
  deleteFromCart(item: any): string {
    // Check if the course is in the cart
    const cartIndex = this.cartItemsSubject.value.findIndex(
      (cartItem) => cartItem.courseName === item.courseName
    );

    // If in cart, remove it
    if (cartIndex !== -1) {
      const updatedCart = [...this.cartItemsSubject.value];
      updatedCart.splice(cartIndex, 1);
      this.cartItemsSubject.next(updatedCart);

      return 'Course removed from cart successfully.';
    }

    // If not in cart, return a message
    return 'Course not found in the cart.';
  }

  // Method to delete a course from the wishlist
  deleteFromWishlist(item: any): string {
    // Check if the course is in the wishlist
    const wishlistIndex = this.wishlistItemsSubject.value.findIndex(
      (wishlistItem) => wishlistItem.courseName === item.courseName
    );

    // If in wishlist, remove it
    if (wishlistIndex !== -1) {
      const updatedWishlist = [...this.wishlistItemsSubject.value];
      updatedWishlist.splice(wishlistIndex, 1);
      this.wishlistItemsSubject.next(updatedWishlist);

      return 'Course removed from wishlist successfully.';
    }

    // If not in wishlist, return a message
    return 'Course not found in the wishlist.';
  }

  // Method to get a copy of the cart items
  getCartItems() {
    return [...this.cartItemsSubject.value];
  }

  // Method to get a copy of the wishlist items
  getWishlistItems() {
    return [...this.wishlistItemsSubject.value];
  }
}
