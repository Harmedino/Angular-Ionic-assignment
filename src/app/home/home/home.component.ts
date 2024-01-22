import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationbarComponent } from '../navigationbar/navigationbar.component';
import { HeropageComponent } from '../heropage/heropage.component';
import { OurCoursesComponent } from '../../coursePage/our-courses/our-courses.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [
    CommonModule,
    NavigationbarComponent,
    HeropageComponent,
    OurCoursesComponent,
    FooterComponent
  ],
})
export class HomeComponent {}
