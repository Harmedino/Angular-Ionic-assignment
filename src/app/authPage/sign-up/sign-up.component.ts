import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  NgForm,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  responseMessage: any = ''; // Variable to store the response from the service
  eye: any = false; // Variable to toggle password visibility
  showPassword = 'password'; // Initial value for password visibility
  toastText: any = ''; // Variable to store the message to display in the toast

  constructor(private authService: AuthServiceService, private router: Router) {}

  showToast() {
    // Function to show a popup notification
    document?.getElementById('myToast')?.classList.remove('hidden');
    setTimeout(() => {
      document?.getElementById('myToast')?.classList.add('hidden');
    }, 5000);
  }

  onSubmit(form: NgForm) {
    // Function to handle form submission
    if (form.invalid) {
      // Exit if the form is invalid
      return;
    }

    // Call the createUser method of the AuthServiceService
    this.authService.createUser(
      form.value.fullName,
      form.value.email,
      form.value.password
    ).subscribe(
      (response) => {
        // Handle the success response from the service
        this.responseMessage = response;
        if (this.responseMessage?.status === 'success') {
          // Display a success message in the popup
          this.toastText = 'User account created successfully.';
          document?.getElementById('toastBtn')?.click();

          // Redirect to the login page after a successful creation (uncomment the following lines)
          // setTimeout(() => {
          //   this.router.navigate(['/login']);
          // }, 4000);
        } else {
          // Display an error message from the service in the popup
          this.toastText = this.responseMessage.message || 'Error creating user account.';
          document?.getElementById('toastBtn')?.click();
        }
      },
      (error) => {
        // Handle errors from the service
        console.error(error);
        this.toastText = 'Error creating user account. Please try again later.';
        document?.getElementById('toastBtn')?.click();
      }
    );
  }

  show() {
    // Function to toggle password visibility
    this.showPassword == 'password'
      ? (this.showPassword = 'text', (this.eye = true))
      : (this.showPassword = 'password', (this.eye = false));
  }
}
