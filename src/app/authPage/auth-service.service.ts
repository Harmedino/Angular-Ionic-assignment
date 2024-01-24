import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Authdata } from './authData.model';
import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private usersUrl = 'http://localhost:8000/users';

  constructor(private auth:Auth) {}

  signUp(authData: Authdata) {
    const { fullName, email, password } = authData;

    createUserWithEmailAndPassword(this.auth, email, password).then(
      (user) => {
        // Handle successful sign-up
      }
    ).catch(
      (error) => {
        // Handle sign-up error
        console.error('Sign-up error:', error);
      }
    );
  }







}
