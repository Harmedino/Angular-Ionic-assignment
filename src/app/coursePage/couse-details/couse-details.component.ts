import { Component, OnInit } from '@angular/core';
import { NavigationbarComponent } from '../../home/navigationbar/navigationbar.component';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../orders/orders.service';
import { PopupModalComponent } from '../../modal/popup-modal/popup-modal.component';
import { NgIf } from '@angular/common';
import { CourseService } from '../course-service.service';

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
  popupModal: Boolean = false;
  popupBackground: String = '';

  constructor(
    private route: ActivatedRoute,
    private orderService: OrdersService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    // Fetch course details from route parameters
    this.route.params.subscribe((params) => {
      const courseName = params['details'];

      // Fetch courses from the CourseService
      this.courseService.getCourses().subscribe((courses) => {
        const courseDetails = courses.find(course => course.courseName === courseName);
        if (courseDetails) {
          this.course = courseDetails;

          // Calculate time left for the sale
          const now = new Date();
          if (this.course && this.course.saleEndDate) {
            const timeDiff = this.course.saleEndDate.getTime() - now.getTime();
            this.timeLeft = Math.ceil(timeDiff / (1000 * 60 * 60));
          } else {
            // Handle the case where this.course or this.course.saleEndDate is undefined
            this.timeLeft = 0; // or any default value or logic you want
          }
        } else {
          return
        }
      });
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

