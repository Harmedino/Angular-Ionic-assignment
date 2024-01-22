import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-benefit-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './benefit-box.component.html',
  styleUrl: './benefit-box.component.css',
})
export class BenefitBoxComponent {
  @Input() number: String = '';
  @Input() title: String = '';
  @Input() text: String = '';
  @Input() link: String = '';
}
