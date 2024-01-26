import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../coursePage/course-service.service';
import { OrdersService } from '../../orders/orders.service';
import { Auth } from '@angular/fire/auth';
import { AuthServiceService } from '../../authPage/auth-service.service';

@Component({
  selector: 'app-navigationbar',
  standalone: true, //  This component is intended to be used independently.
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule, NgIf],
  templateUrl: './navigationbar.component.html',
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
    //  Update the 'isScrolled' property based on scroll position.
    this.isScrolled = window.scrollY > 10;
  }

  ngOnInit() {
    //  Initialize component properties and subscribe to service changes.
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
    //  Perform search when the input value changes.
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
    //  Perform search when the search button is clicked.
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
    //  Hide search results when a result is clicked.
    this.showResults = false;
  }

  @HostListener('document:click', ['$event'])
  onOutsideClick(event: Event) {
    //  Hide search results when clicking outside the dropdown container.
    if (
      this.dropdownContainer &&
      !this.dropdownContainer.nativeElement.contains(event.target)
    ) {
      this.showResults = false;
    }
  }

  logout() {
    //  Call the logout method from the authentication service.
    this.authService.logout();
  }
}
