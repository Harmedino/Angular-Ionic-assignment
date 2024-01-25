import { NgFor, NgIf, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormGroupName,
} from '@angular/forms';
import { NavigationbarComponent } from '../navigationbar/navigationbar.component';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
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
export class ProfileComponent {
  // Add properties for form fields
  formData: FormGroup;
  hello: boolean = true;
  areaOfInterest: string[] = [
    'Web Development',
    'Mobile App Development',
    'Data Science',
    'Machine Learning',
    'Cloud Computing',
    'Cybersecurity',
    'UI/UX Design',
    'Blockchain',
  ];
  userType: string = 'professional';
  loading: Boolean = false;

  constructor(private firestore: Firestore) {
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


// ...

async saveProfile() {
  this.loading = true;  // Set loading to true when starting the save operation

  // Fetch user ID from local storage (stored as  access token)
  const userId = localStorage.getItem('accessToken');

  console.log(userId);

  // Check if user ID is present
  if (userId) {
    // Assuming this.formData contains the data you want to save
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
    console.log(formDataValue);

    // Use set method to update the Firestore document
    const userRef = doc(this.firestore, 'User', userId);

    try {
      await setDoc(userRef, formDataValue, { merge: true });
      console.log('Profile data saved successfully.');
    } catch (error) {
      console.error('Error saving profile data:', error);
    } finally {
      this.loading = false;  // Set loading to false when the save operation completes (whether success or error)
    }
  } else {
    console.error('No user ID found in local storage.');
    this.loading = false;  // Set loading to false in case of an error
  }
}

}
