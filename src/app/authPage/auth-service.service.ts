import { Injectable } from '@angular/core';
import { Authdata } from './authData.model';
import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private usersUrl = 'http://localhost:8000/users';

  constructor(private auth:Auth, private firestore: Firestore) {}


  async signUp(authData: Authdata): Promise<string> {
    const { fullName, email, password } = authData;

    try {
      const user = await createUserWithEmailAndPassword(this.auth, email, password);

      if (!user) {
        return 'Unexpected error during user registration.';
      }

      if (user) {
        await setDoc(doc(this.firestore, 'User', user.user.uid), {
          fullName,
          email,
        });
        return 'User registration successful';
      }
    } catch (error: any) {
      // Log all Firebase Authentication errors
      console.error('Sign-up error:', error);

      // Optionally, you can check specific error codes
      if (error.code === 'auth/email-already-in-use') {
        return 'Email is already in use.';
      } else if (error.code === 'auth/invalid-email') {
        return 'Invalid email format.';
      } else {
        return 'An error occurred during sign-up.';
      }
    }

    // Default return statement if none of the conditions are met
    return 'Unexpected error during user registration.';
  }










}
