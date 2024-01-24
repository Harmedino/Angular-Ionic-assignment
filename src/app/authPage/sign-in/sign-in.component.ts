import { Component, NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { PopupModalComponent } from '../../popup-modal/popup-modal.component';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule,
    FormsModule,RouterLink, NgIf, PopupModalComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  eye: any = false; // Variable to toggle password visibility
  showPassword = 'password'; // Initial value for password visibility
  popupText: String = '';
  popupModal: Boolean = false;
  popupBackground: String = '';
  loading: boolean = false;

  constructor( private authService:AuthServiceService, private router:Router){}



async onLogin(form: NgForm) {
  // Function to handle login form submission
  if (form.invalid || this.loading) {
    // Exit if the form is invalid or already loading
    return;
  }

  // Set loading to true to show the loading icon
  this.loading = true;

  try {
    // Call the login method of the AuthService
    const result = await this.authService.login({
      email: form.value.email,
      password: form.value.password,
    });

    // Show the popup with the result message
    this.showPopup(result);
    // Navigate to the home page after successful login
    setTimeout(() => {
      this.router.navigate(['/'])
    }, 3000);
  } catch (error) {
    // Log unexpected errors during login
    console.error('Unexpected error during login:', error);

    // Show a generic error message to the user
    this.showPopup('An unexpected error occurred.');
  } finally {
    // Set loading back to false after login is complete (either success or error)
    this.loading = false;
  }
}



  show() {
    // Function to toggle password visibility
    this.showPassword == 'password'
      ? ((this.showPassword = 'text'), (this.eye = true))
      : ((this.showPassword = 'password'), (this.eye = false));
  }

  showPopup(message: string): void {
    this.popupModal = true;
    this.popupText = message;

    if (message.includes('successful')) {
      this.popupBackground = 'green';
    } else {
      this.popupBackground = 'red';
    }

    setTimeout(() => {
      this.popupModal = false;
    }, 3000);
  }
  }


