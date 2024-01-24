import { Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { CoursePageComponent } from './coursePage/course-page/course-page.component';
import { SignInComponent } from './authPage/sign-in/sign-in.component';
import { SignUpComponent } from './authPage/sign-up/sign-up.component';
import { CartListComponent } from './orders/cart-list/cart-list.component';
import { WishListComponent } from './orders/wish-list/wish-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'courses', component: CoursePageComponent },
  { path: 'login', component: SignInComponent },
  { path: 'register', component: SignUpComponent },
  { path: 'cart', component: CartListComponent },
  { path: 'wishlist', component: WishListComponent },
];
