import { Injectable } from '@angular/core';
import { Authdata } from './authData.model';
import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

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


  async login(authData: Authdata): Promise<string> {
    const { email, password } = authData;

    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);

      if (userCredential && userCredential.user) {
        // You can perform additional actions upon successful login if needed
        return 'Login successful';
      } else {
        return 'Unexpected error during login.';
      }
    } catch (error: any) {
      // Log all Firebase Authentication errors
      console.error('Login error:', error);

      // Optionally, you can check specific error codes
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        return 'Invalid email or password.';
      } else if (error.code === 'auth/invalid-email') {
        return 'Invalid email format.';
      } else {
        return 'An error occurred during login.';
      }
    }
  }











}
