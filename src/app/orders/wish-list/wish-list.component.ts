import { Component } from '@angular/core';
import { OrdersService } from '../orders.service';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { NavigationbarComponent } from '../../home/navigationbar/navigationbar.component';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [NavigationbarComponent, NgFor, NgIf, RouterLink],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css'
})
export class WishListComponent {

  wishItems: any[] = [];

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    // Fetch cart items from the service
    this.wishItems = this.ordersService.getWishlistItems();


  }



  onDelete(index: number): void {
    // Handle deletion logic
  }

  checkOut(grandTotal: number): void {
    // Handle checkout logic
  }


}
