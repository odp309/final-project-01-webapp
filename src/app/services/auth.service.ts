import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, shareReplay } from 'rxjs';
import Login from '../models/login';

const AUTH_API = 'http://localhost:8080/api/v1/public/user';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

const HTTP_NO_AUTH = {
  headers: new HttpHeaders({ 'No-Auth': 'True' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private http: HttpClient) {}

  public login(login: Login) {
    // no need to pass token in header
    return this.http.post(AUTH_API + '/login', login, HTTP_NO_AUTH);
  }

  // public forUser() {
  //   return this.httpclient.get(this.PATH_OF_API + '/forUser', {
  //     responseType: 'text',
  //   });
  // }


  // public forAdmin() {
  //   return this.httpclient.get(this.PATH_OF_API + '/forAdmin', {
  //     responseType: 'text',
  //   });
  // }

  // public roleMatch(allowedRoles): boolean {
  //   let isMatch = false;
  //   const userRoles: any = this.userAuthService.getRoles();

  //   if (userRoles != null && userRoles) {
  //     for (let i = 0; i < userRoles.length; i++) {
  //       for (let j = 0; j < allowedRoles.length; j++) {
  //         if (userRoles[i].roleName === allowedRoles[j]) {
  //           isMatch = true;
  //           return isMatch;
  //         } else {
  //           return isMatch;
  //         }
  //       }
  //     }
  //   }
  // }


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
