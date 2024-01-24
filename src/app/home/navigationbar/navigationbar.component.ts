import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../coursePage/course-service.service';
import { OrdersService } from '../../orders/orders.service';

@Component({
  selector: 'app-navigationbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './navigationbar.component.html',
  styleUrl: './navigationbar.component.css',
})
export class NavigationbarComponent implements OnInit {
  mobileMenuOpen = false;
  isScrolled: boolean = false;
  searchTerm = '';
  showResults = false;
  searchResults: any = [];
  cartItems:any = []
  wishlistItems:any = [{}]

  constructor(private courseService:CourseService, private orderService: OrdersService){}

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;

  }
  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.isScrolled = window.scrollY > 10;
  }
  ngOnInit() {
    this.orderService.wishlistItems$.subscribe(response => {
      this.wishlistItems = response;
    });

    this.orderService.cartItems$.subscribe(response => {
      this.cartItems = response
    })

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
}
