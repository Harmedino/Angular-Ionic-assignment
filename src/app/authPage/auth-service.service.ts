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

  createUser(fullName: string, email: string, password: string): Observable<any> {
    const authData: Authdata = { fullName, email, password };

    // Post data to the JSON file
    return this.http.post(this.usersUrl, authData).pipe(
      map(response => {

        // Simulate a successful response
        return { status: 'success', message: 'User account created successfully.', details: response };
      }),
      catchError(error => {
        // Simulate an error response
        return of({ status: 'error', message: 'Failed to create user account.' });
      })
    );
  }
}
