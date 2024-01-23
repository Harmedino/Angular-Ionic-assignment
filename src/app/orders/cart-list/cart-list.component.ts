import { Component, OnInit } from '@angular/core';
import { NavigationbarComponent } from '../../home/navigationbar/navigationbar.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-cart-list',
  standalone: true,
  imports: [NavigationbarComponent, NgFor],
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.css',
})
export class CartListComponent implements OnInit {
  cartItems: any[] = [
    {
      courseName: 'Mobile App UX Design',
      author: 'Daniel Smith',
      actualPrice: '₹999',
      discountPercentage: '18%',
      tags: ['UX Design', 'Mobile App Development'],
      img: '../../../assets/images/Image.png',
      quantity: 1,
      total: 999,
    },
    // Add more dummy data as needed
  ];

  grand: number = 999; // Assuming an initial value for the total

  constructor() {}

  ngOnInit(): void {}

  sub(index: number): void {
    // Handle subtraction logic
  }

  add(index: number): void {
    // Handle addition logic
  }

  onDelete(index: number): void {
    // Handle deletion logic
  }

  checkOut(grandTotal: number): void {
    // Handle checkout logic
  }
}
