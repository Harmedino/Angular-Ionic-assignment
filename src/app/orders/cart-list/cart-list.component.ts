import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service';
import { NgFor, NgIf } from '@angular/common';
import { NavigationbarComponent } from '../../home/navigationbar/navigationbar.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-list',
  standalone: true,
  imports: [NavigationbarComponent, NgFor, NgIf, RouterLink],
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css'],
})
export class CartListComponent implements OnInit {
  cartItems: any[] = [];
  grand: number = 0;

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    // Fetch cart items from the service
    this.cartItems = this.ordersService.getCartItems();

    // Calculate grand total
    this.calculateGrandTotal();


  }



  onDelete(index: number): void {
    // Remove the item from the cartItems array based on the index
    this.cartItems.splice(index, 1);

    // Recalculate the grand total after deleting an item
    this.calculateGrandTotal();
  }

  checkOut(grandTotal: number): void {
    // Handle checkout logic
  }

  private calculateGrandTotal(): void {
    // Calculate grand total based on cart items
    this.grand = this.cartItems.reduce((total, item) => {
      const actualPrice = +item.actualPrice.replace('₹', '');
      const discountPercentage = +item.discountPercentage.replace('%', '') / 100;


      const discountedPrice = actualPrice - (actualPrice * discountPercentage);
      console.log( discountedPrice);
      return total + discountedPrice
    }, 0);
  }

}
