import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  NgForm,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { Authdata } from '../authData.model';


@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink, ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  responseMessage: any = ''; // Variable to store the response from the service
  eye: any = false; // Variable to toggle password visibility
  showPassword = 'password'; // Initial value for password visibility

  constructor(private authService: AuthServiceService, private router: Router) {}



  onSubmit(form: NgForm) {
    // Function to handle form submission
    if (form.invalid) {
      // Exit if the form is invalid
      return;
    }



    // Call the createUser method of the AuthServiceService

    this.authService.signUp({fullName: form.value.fullName, email: form.value.email, password: form.value.password})


  }

  show() {
    // Function to toggle password visibility
    this.showPassword == 'password'
      ? (this.showPassword = 'text', (this.eye = true))
      : (this.showPassword = 'password', (this.eye = false));
  }
}
