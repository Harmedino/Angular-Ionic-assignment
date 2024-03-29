import { Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { CoursePageComponent } from './coursePage/course-page/course-page.component';
import { SignInComponent } from './authPage/sign-in/sign-in.component';
import { SignUpComponent } from './authPage/sign-up/sign-up.component';
import { CartListComponent } from './orders/cart-list/cart-list.component';
import { WishListComponent } from './orders/wish-list/wish-list.component';
import { ProfileComponent } from './home/profile/profile.component';
import { CouseDetailsComponent } from './coursePage/couse-details/couse-details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'courses',
    component: CoursePageComponent,
  },
  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: SignInComponent },
  { path: 'register', component: SignUpComponent },
  { path: 'cart', component: CartListComponent },
  { path: 'wishlist', component: WishListComponent },
  { path: 'courses/:details', component: CouseDetailsComponent },
];
