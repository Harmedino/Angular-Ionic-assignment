import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { CourseService } from '../course-service.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { OrdersService } from '../../orders/orders.service';
import { PopupModalComponent } from '../../popup-modal/popup-modal.component';

@Component({
  selector: 'app-our-courses',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule, RouterLink, PopupModalComponent, NgIf],
  templateUrl: './our-courses.component.html',
  styleUrls: ['./our-courses.component.css']
})
export class OurCoursesComponent implements OnInit {
  courses: any[] = [];
  pagedCourses: any[] = []; // Array to store the current page's courses
  pageSize = 4; // Number of courses per page
  currentPage = 0; // Initial page index
  popupText:String =''
  popupModal: Boolean = false
  popupBackground:String = ''

  constructor(private courseService: CourseService,
    private orderService:OrdersService) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(data => {
      this.courses = data;
      this.updatePagedCourses();
    });
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex;
    this.updatePagedCourses();
  }

  updatePagedCourses() {
    const startIndex = this.currentPage * this.pageSize;
    this.pagedCourses = this.courses.slice(startIndex, startIndex + this.pageSize);
  }

  addToCart(item: any) {
    const result = this.orderService.addToCart(item);
    this.showPopup(result); // Handle the result as needed
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

  addToWishlist(item: any) {
    const result = this.orderService.addToWishlist(item);
    this.showPopup(result); // Handle the result as needed
  }

}
