import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../home/footer/footer.component';
import { NavigationbarComponent } from '../home/navigationbar/navigationbar.component';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule,
    FooterComponent,
    NavigationbarComponent
  ],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {

}
