import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../course-service.service';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-our-courses',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule],
  templateUrl: './our-courses.component.html',
  styleUrls: ['./our-courses.component.css']
})
export class OurCoursesComponent implements OnInit {
  courses: any[] = [];
  pagedCourses: any[] = []; // Array to store the current page's courses
  pageSize = 3; // Number of courses per page
  currentPage = 0; // Initial page index

  constructor(private courseService: CourseService) {}

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
}
