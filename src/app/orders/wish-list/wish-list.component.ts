import { Component } from '@angular/core';
import { OrdersService } from '../orders.service';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { NavigationbarComponent } from '../../home/navigationbar/navigationbar.component';
import { PopupModalComponent } from '../../modal/popup-modal/popup-modal.component';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [
    NavigationbarComponent,
    NgFor,
    NgIf,
    RouterLink,
    PopupModalComponent,
  ],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css',
})
export class WishListComponent {
  wishItems: any[] = [];
  popupText: String = '';
  popupModal: Boolean = false;
  popupBackground: String = '';

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    // Fetch cart items from the service
    this.wishItems = this.ordersService.getWishlistItems();
  }

  onDelete(item: any): void {
    const result = this.ordersService.deleteFromWishlist(item);
    this.wishItems = this.ordersService.getWishlistItems();
    this.showPopup(result);
  }

  moveToCart(item: any) {
    const result = this.ordersService.addToCart(item);
    this.wishItems = this.ordersService.getWishlistItems();
    this.showPopup(result);
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
}
