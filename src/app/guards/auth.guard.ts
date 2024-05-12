import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

// check if user is authenticated route can be accessed, if not redirect to welcome or login page

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> | Promise<boolean> | boolean => {
  // const authService: AuthenticationService = inject(AuthenticationService);
  const router: Router = inject(Router);

  // const isAuthenticated = authService.isAuthenticated(); // Your method to check if user is authenticated

  // if (isAuthenticated) {
  //   return true;
  // } if (authService.isTokenExpired()) {
  //   router.navigate(['forbidden']); 
  //   return false;
  // } else {
  //   router.navigate(['/login']); // Navigate to login if user is not authenticated
  //   return false;
  // }

  return true;
};
