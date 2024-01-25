import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationbarComponent } from '../../home/navigationbar/navigationbar.component';
import { FooterComponent } from '../../home/footer/footer.component';
import { OurCoursesComponent } from '../our-courses/our-courses.component';

@Component({
  selector: 'app-course-page',
  standalone: true,
  imports: [
    CommonModule,
    NavigationbarComponent,
    FooterComponent,
    OurCoursesComponent
  ],
  templateUrl: './course-page.component.html',
  styleUrl: './course-page.component.css',
})
export class CoursePageComponent {}
