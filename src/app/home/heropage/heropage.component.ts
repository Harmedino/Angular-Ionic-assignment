import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BenefitBoxComponent } from '../benefit-box/benefit-box.component';

@Component({
  selector: 'app-heropage',
  standalone: true,
  imports: [CommonModule, BenefitBoxComponent],
  templateUrl: './heropage.component.html',
  styleUrl: './heropage.component.css',
})
export class HeropageComponent {}
