import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BenefitBoxComponent } from '../benefit-box/benefit-box.component';

@Component({
  selector: 'app-our-courses',
  standalone: true,
  imports: [CommonModule, BenefitBoxComponent],
  templateUrl: './our-courses.component.html',
  styleUrl: './our-courses.component.css'
})
export class OurCoursesComponent {

}
