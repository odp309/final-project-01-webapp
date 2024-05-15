import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

// intercept outgoing HTTP requests and add the Authorization header with the JWT token

export const allHttpInterceptor: HttpInterceptorFn = (request, next) => {
  const router: Router = inject(Router);
  const storageService: StorageService = inject(StorageService);

  const token = storageService.getToken();

  if (request.headers.get('No-Auth') === 'True') {
    return next(request.clone()).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            console.error('Bad credential request:', err);
            router.navigate(['/login']);
          } else {
            console.error('HTTP error:', err);
          }
        } else {
          console.error('An error occurred:', err);
        }

        return throwError(() => err);
      })
    );
  }

  // clone the request and add the authorization header
  const authRequest = request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(authRequest).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        // Handle HTTP errors
        if (err.status === 401) {
          // Specific handling for unauthorized errors
          console.error('Unauthorized request:', err);
          router.navigate(['/login']);
          // You might trigger a re-authentication flow or redirect the user here
        } else if (err.status === 403) {
          console.error('Unauthorized request:', err);
          router.navigate(['/welcome']);
        } else {
          // Handle other HTTP error codes
          console.error('HTTP error:', err);
        }
      } else {
        // Handle non-HTTP errors
        console.error('An error occurred:', err);
      }

      // Re-throw the error to propagate it further
      return throwError(() => err);
    })
  );
};
