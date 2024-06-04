import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, shareReplay } from 'rxjs';
import Login from '../../dto/auth/login.dto';
import { StorageService } from '../storage/storage.service';
import { env } from '../../../env';

const AUTH_API = env.base_url + '/api/v1/public/employee';

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
  constructor(
    private router: Router,
    private http: HttpClient,
    private storageService: StorageService
  ) {}

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

  public roleMatch(allowedRoles: string | any[]): boolean {
    let isMatch = false;
    const userRoles: any = this.storageService.getRoles();

    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          }
        }
      }
    }

    return isMatch;
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
