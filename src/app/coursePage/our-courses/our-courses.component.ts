import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../course-service.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { OrdersService } from '../../orders/orders.service';

@Component({
  selector: 'app-our-courses',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule, RouterLink],
  templateUrl: './our-courses.component.html',
  styleUrls: ['./our-courses.component.css']
})
export class OurCoursesComponent implements OnInit {
  courses: any[] = [];
  pagedCourses: any[] = []; // Array to store the current page's courses
  pageSize = 4; // Number of courses per page
  currentPage = 0; // Initial page index

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
    this.orderService.addToCart(item);
    // Optionally, you can add some notification or other logic after adding to cart
  }
  addToWish(item: any) {
    this.orderService.addToWishlist(item);
    // Optionally, you can add some notification or other logic after adding to cart
  }
}
