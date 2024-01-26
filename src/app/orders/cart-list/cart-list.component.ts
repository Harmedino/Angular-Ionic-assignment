import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service';
import { NgFor, NgIf } from '@angular/common';
import { NavigationbarComponent } from '../../home/navigationbar/navigationbar.component';
import { RouterLink } from '@angular/router';
import { PopupModalComponent } from '../../popup-modal/popup-modal.component';
import { CheckoutModalComponent } from '../../checkout-modal/checkout-modal.component';

@Component({
  selector: 'app-cart-list',
  standalone: true,
  imports: [
    NavigationbarComponent,
    NgFor,
    NgIf,
    RouterLink,
    PopupModalComponent,
    CheckoutModalComponent,
  ],
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css'],
})
export class CartListComponent implements OnInit {
  cartItems: any[] = [];
  grand: number = 0;
  popupText: String = '';
  popupModal: Boolean = false;
  popupBackground: String = '';
  showCheckoutModal: boolean = false;

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    // Fetch cart items from the service
    this.cartItems = this.ordersService.getCartItems();

    // Calculate grand total
    this.calculateGrandTotal();
  }

  onDelete(item: any): void {
    // Remove the item from the cartItems array based on the item
    const result = this.ordersService.deleteFromCart(item);
    this.cartItems = this.ordersService.getCartItems();
    this.showPopup(result);
    // Recalculate the grand total after deleting an item
    this.calculateGrandTotal();
  }

  checkOut(grandTotal: number): void {
    this.showCheckoutModal = true;
    this.ordersService.clearCart();
    this.cartItems = this.ordersService.getCartItems();
  }

  moveToWishlist(item: any) {
    const result = this.ordersService.addToWishlist(item);
    this.cartItems = this.ordersService.getCartItems();
    this.showPopup(result);
    // Recalculate the grand total after deleting an item
    this.calculateGrandTotal();
  }
  showPopup(message: string): void {
    this.popupModal = true;
    this.popupText = message;

    if (message.includes('successfully')) {
      this.popupBackground = 'green';
    } else {
      this.popupBackground = 'red';
    }

    setTimeout(() => {
      this.popupModal = false;
    }, 1000);
  }

  private calculateGrandTotal(): void {
    // Calculate grand total based on cart items
    this.grand = this.cartItems.reduce((total, item) => {
      const actualPrice = +item.actualPrice.replace('₹', '');
      const discountPercentage =
        +item.discountPercentage.replace('%', '') / 100;

      const discountedPrice = actualPrice - actualPrice * discountPercentage;
      console.log(discountedPrice);
      return total + discountedPrice;
    }, 0);
  }
}
