import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  NgForm,
  NgModel,
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
  responseMessage: any = '';
  eye: any = false;
  showPassword = 'password';
  toastText: any = '';

  constructor(private authService: AuthServiceService, private router: Router) {}

  showToast() {
    document?.getElementById('myToast')?.classList.remove('hidden');
    setTimeout(() => {
      document?.getElementById('myToast')?.classList.add('hidden');
    }, 5000);
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.createUser(
      form.value.fullName,
      form.value.email,
      form.value.password
    ).subscribe(
      (response) => {
        this.responseMessage = response;
        if (this.responseMessage?.status === 'success') {
          this.toastText = 'User account created successfully.';
          document?.getElementById('toastBtn')?.click();
          // Redirect to a different route after a successful creation (uncomment the following lines)
          // setTimeout(() => {
          //   this.router.navigate(['/']);
          // }, 4000);
        } else {
          this.toastText = 'Error creating user account.';
          document?.getElementById('toastBtn')?.click();
        }
      },
      (error) => {
        console.error(error);
        this.toastText = 'Error creating user account.';
        document?.getElementById('toastBtn')?.click();
      }
    );
  }

  show() {
    this.showPassword == 'password'
      ? (this.showPassword = 'text', (this.eye = true))
      : (this.showPassword = 'password', (this.eye = false));
  }
}
