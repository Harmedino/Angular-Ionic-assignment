import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationbarComponent } from '../home/navigationbar/navigationbar.component';
import { FooterComponent } from '../home/footer/footer.component';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule,
    NavigationbarComponent,
  FooterComponent],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.css'
})
export class ContactPageComponent {

}
