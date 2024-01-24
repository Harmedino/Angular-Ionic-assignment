import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { Authdata } from '../authData.model';
import { PopupModalComponent } from '../../popup-modal/popup-modal.component';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    NgIf,
    PopupModalComponent,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  eye: any = false; // Variable to toggle password visibility
  showPassword = 'password'; // Initial value for password visibility
  popupText: String = '';
  popupModal: Boolean = false;
  popupBackground: String = '';
  loading: boolean = false;

  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}

  // Your component

  async onSubmit(form: NgForm) {
    // Function to handle form submission
    if (form.invalid || this.loading) {
      // Exit if the form is invalid or already loading
      return;
    }

    // Set loading to true to show the loading icon
    this.loading = true;

    try {
      // Call the signUp method of the AuthService
      const result = await this.authService.signUp({
        fullName: form.value.fullName,
        email: form.value.email,
        password: form.value.password,
      });

      // Show the popup with the result message
      this.showPopup(result);

      // Navigate to the login page after successful sign-up
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 300);
    } catch (error) {
      // Log unexpected errors during sign-up
      console.error('Unexpected error during sign-up:', error);

      // Show a generic error message to the user
      this.showPopup('An unexpected error occurred.');
    } finally {
      // Set loading back to false after sign-up is complete (either success or error)
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
