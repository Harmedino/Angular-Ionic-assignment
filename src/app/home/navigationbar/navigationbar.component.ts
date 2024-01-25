
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../coursePage/course-service.service';
import { OrdersService } from '../../orders/orders.service';
import { Auth } from '@angular/fire/auth';
import { AuthServiceService } from '../../authPage/auth-service.service';

@Component({
  selector: 'app-navigationbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule, NgIf],
  templateUrl: './navigationbar.component.html',
  styleUrl: './navigationbar.component.css',
})
export class NavigationbarComponent implements OnInit {
  mobileMenuOpen = false;
  isScrolled: boolean = false;
  searchTerm = '';
  showResults = false;
  searchResults: any = [];
  cartItems: any = [];
  wishlistItems: any = [{}];
  activeUser: any;

  @ViewChild('dropdownContainer') dropdownContainer!: ElementRef;

  constructor(
    private courseService: CourseService,
    private orderService: OrdersService,
    private auth: Auth,
    private authService: AuthServiceService
  ) {}

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.isScrolled = window.scrollY > 10;
  }

  ngOnInit() {
    const storedAccessToken = localStorage.getItem('accessToken');
    this.activeUser = storedAccessToken;

    this.orderService.wishlistItems$.subscribe((response) => {
      this.wishlistItems = response;
    });

    this.orderService.cartItems$.subscribe((response) => {
      this.cartItems = response;
    });
  }

  onSearchInput() {
    this.courseService.searchAndSortCourses(this.searchTerm).subscribe(
      (results) => {
        this.searchResults = results;
        this.showResults = true;
      },
      (error) => {
        console.error('Error during search:', error);
        this.showResults = false;
      }
    );
  }

  onSearchClick() {
    this.courseService.searchAndSortCourses(this.searchTerm).subscribe(
      (results) => {
        console.log(results);
        this.searchResults = results;
        this.showResults = true;
      },
      (error) => {
        console.error('Error during search:', error);
        this.showResults = false;
      }
    );
  }

  onResultClick() {
    this.showResults = false;
  }

  @HostListener('document:click', ['$event'])
  onOutsideClick(event: Event) {
    if (
      this.dropdownContainer &&
      !this.dropdownContainer.nativeElement.contains(event.target)
    ) {
      this.showResults = false;
    }
  }

  logout() {
    this.authService.logout();
  }
}
