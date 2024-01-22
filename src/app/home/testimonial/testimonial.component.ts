import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestimonialBoxComponent } from '../testimonial-box/testimonial-box.component';

@Component({
  selector: 'app-testimonial',
  standalone: true,
  imports: [CommonModule, TestimonialBoxComponent],
  templateUrl: './testimonial.component.html',
  styleUrl: './testimonial.component.css',
})
export class TestimonialComponent {}
