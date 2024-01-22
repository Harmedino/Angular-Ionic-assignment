import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Authdata } from './authData.model';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private usersUrl = 'http://localhost:8000/users';

  constructor(private http: HttpClient) {}

  checkEmailExistence(email: string): Observable<boolean> {
    // Check if the email already exists in the database
    return this.http.get<any[]>(`${this.usersUrl}?email=${email}`).pipe(
      map(users => users.length > 0),
      catchError(() => of(false))  // Assume non-existence if there's an error (e.g., network issue)
    );
  }

  createUser(fullName: string, email: string, password: string): Observable<any> {
    // Check email existence before proceeding
    return this.checkEmailExistence(email).pipe(
      map(exists => {
        if (exists) {
          // Email already exists, return an error response
          return { status: 'error', message: 'Email already exists.' };
        }

        // Email does not exist, proceed with user creation
        const authData: Authdata = { fullName, email, password };
        return this.http.post(this.usersUrl, authData).pipe(
          map(response => {
            // Simulate a successful response
            return { status: 'success', message: 'User account created successfully.', details: response };
          }),
          catchError(() => {
            // Simulate an error response
            return of({ status: 'error', message: 'Failed to create user account.' });
          })
        );
      })
    );
  }
}
