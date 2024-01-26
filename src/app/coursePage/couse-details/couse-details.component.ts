import { Component, OnInit } from '@angular/core';
import { NavigationbarComponent } from '../../home/navigationbar/navigationbar.component';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../orders/orders.service';
import { PopupModalComponent } from '../../modal/popup-modal/popup-modal.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-couse-details',
  standalone: true,
  imports: [NavigationbarComponent, PopupModalComponent, NgIf],
  templateUrl: './couse-details.component.html',
  styleUrl: './couse-details.component.css',
})
export class CouseDetailsComponent implements OnInit {
  course: any;
  timeLeft: number = 0;
  popupText: String = '';
  popupModal: Boolean = true;
  popupBackground: String = '';

  constructor(
    private route: ActivatedRoute,
    private orderService: OrdersService
  ) {}

  ngOnInit(): void {
    // Fetch course details from route parameters
    this.route.params.subscribe((params) => {
      // In a real scenario, you might fetch the course details from a service based on the course ID
      // For simplicity, I'm using a hardcoded example here
      this.course = {
        courseName: 'JavaScript Frameworks Masterclass',
        author: 'Emily White',
        actualPrice: '₹899',
        discountPercentage: '20%',
        tags: ['JavaScript', 'React', 'Vue'],
        description:
          'Master the art of building web applications with JavaScript frameworks.',
        duration: 15, // Course duration in hours
        thumbnail: 'path/to/thumbnail.jpg', // Update with the actual path
        saleEndDate: new Date('2024-02-01T23:59:59'), // Sale end date (replace with actual date)
      };

      // Calculate time left for the sale
      const now = new Date();
      if (this.course && this.course.saleEndDate) {
        const timeDiff = this.course.saleEndDate.getTime() - now.getTime();
        this.timeLeft = Math.ceil(timeDiff / (1000 * 60 * 60));
      } else {
        // Handle the case where this.course or this.course.saleEndDate is undefined
        this.timeLeft = 0; // or any default value or logic you want
      }
    });
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

  addToCart(course: any) {
    const result = this.orderService.addToCart(course);
    this.showPopup(result); // Handle the result as needed
  }

  addToWishlist(course: any) {
    const result = this.orderService.addToWishlist(course);
    this.showPopup(result);
  }
}
