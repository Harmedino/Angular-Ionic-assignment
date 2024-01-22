import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Authdata } from './authData.model';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private usersUrl = 'http://localhost:8000/users';

  constructor(private http: HttpClient) {}





 



}
