import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, shareReplay } from 'rxjs';
import Login from '../models/login';

const AUTH_API = 'http://localhost:8080/api/auth/';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private http: HttpClient) {}

  public setRoles(roles: []) {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles(): [] {
    return JSON.parse(localStorage.getItem('roles') ?? '');
  }

  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }

  public getToken(): string {
    return localStorage.getItem('jwtToken') ?? '';
  }

  public clear() {
    localStorage.clear();
  }

  public isLoggedIn() {
    return this.getRoles() && this.getToken();
  }

  // login(login: Login) {
  //   this.http
  //     .post(AUTH_API + 'signin', login, HTTP_OPTIONS)
  //     .pipe(shareReplay())
  //     .subscribe({
  //       next: (response) => {
  //         console.log(response);
  //       },
  //       error: (e) => {
  //         this.loggedIn.next(false);
  //         this.router.navigate(['/login']);
  //       },
  //     });
  // }

  // logout() {
  //   this.loggedIn.next(false);
  //   localStorage.removeItem('token');
  //   this.router.navigate(['/login']);
  // }
}
