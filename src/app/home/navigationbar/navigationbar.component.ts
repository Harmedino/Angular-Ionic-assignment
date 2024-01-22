import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navigationbar',
  standalone: true,
  imports: [CommonModule,
    RouterLink,
    RouterLinkActive],
  templateUrl: './navigationbar.component.html',
  styleUrl: './navigationbar.component.css'
})
export class NavigationbarComponent implements OnInit {

  mobileMenuOpen = false;
  isScrolled: boolean = false;

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
  @HostListener('window:scroll', ['$event'])

  onScroll() {

    this.isScrolled = window.scrollY > 10;

  }
  ngOnInit() {
  }
}
