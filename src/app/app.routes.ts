import { Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { CoursePageComponent } from './coursePage/course-page/course-page.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { SignInComponent } from './authPage/sign-in/sign-in.component';
import { SignUpComponent } from './authPage/sign-up/sign-up.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'courses', component: CoursePageComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'login', component: SignInComponent },
  { path: 'register', component: SignUpComponent },
];
