import { NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormGroupName,
} from '@angular/forms';
import { NavigationbarComponent } from '../navigationbar/navigationbar.component';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    NavigationbarComponent,
    NgFor,
    NgStyle,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  // Add properties for form fields
  formData: FormGroup;
  hello: boolean = true;
  areaOfInterest: string[] = [
    'Web Development',
    'Mobile App Development',
  ];
  userType: string = 'professional';
  loading: Boolean = false;

  constructor(private firestore: Firestore, private snackBar: MatSnackBar) {
    this.formData = new FormGroup({
      userData: new FormGroup({
        displayName: new FormControl(null, [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ]),
        fullName: new FormControl(null, [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ]),
        aboutYourself: new FormControl(null, [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      }),
      InterestArea: new FormControl(null, [Validators.required]),
      userType: new FormControl(null, [Validators.required]),
      experience: new FormControl(null),
      expertise: new FormControl(null),
      role: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(200),
      ]),
    });
  }



  // Function to save the profile
  // ...

  ngOnInit(): void {
    this.getProfile();
  }

  // ...

  get displayName() {
    return  this.formData.get('userData.displayName');
  }

  async saveProfile() {
    this.loading = true;

    const userId = localStorage.getItem('accessToken');

    if (userId) {
      const formDataValue = {
        displayName: this.formData.value.userData.displayName,
        fullName: this.formData.value.userData.fullName,
        aboutYourself: this.formData.value.userData.aboutYourself,
        InterestArea: this.formData.value.InterestArea,
        userType: this.formData.value.userType,
        experience: this.formData.value.experience,
        expertise: this.formData.value.expertise,
        role: this.formData.value.role,
      };

      const userRef = doc(this.firestore, 'User', userId);

      try {
        await setDoc(userRef, formDataValue, { merge: true });
        console.log('Profile data saved successfully.');
        this.showSuccessSnackbar('Profile data saved successfully.');
      } catch (error) {
        console.error('Error saving profile data:', error);
        this.showErrorSnackbar('Error saving profile data. Please try again.');
      } finally {
        this.loading = false;
      }
    } else {
      console.error('No user ID found in local storage.');
      this.loading = false;
    }
  }

  private async getProfile(): Promise<void> {
    const userId = localStorage.getItem('accessToken');

    if (userId) {
      const userRef = doc(this.firestore, 'User', userId);

      try {
        const docSnapshot = await getDoc(userRef);

        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();


          this.formData.setValue({
            userData: {
              displayName: userData['displayName'],
              fullName: userData['fullName'],
              aboutYourself: userData['aboutYourself'],
            },
            InterestArea: userData['InterestArea'],
            userType: userData['userType'],
            experience: userData['experience'],
            expertise: userData['expertise'],
            role: userData['role'],
          });

        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        // Handle error appropriately
      }
    }
  }

  private showSuccessSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: 'success-snackbar',
    });
  }

  private showErrorSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: 'error-snackbar',
    });
  }
}
