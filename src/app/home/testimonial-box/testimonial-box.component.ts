import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-testimonial-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonial-box.component.html',
  styleUrl: './testimonial-box.component.css',
})
export class TestimonialBoxComponent {
  @Input() text: String = '';
  @Input() name: String = '';
  @Input() image: String = '';
}
