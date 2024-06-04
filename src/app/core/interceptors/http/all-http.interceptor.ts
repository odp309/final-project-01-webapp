import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { StorageService } from '../../services/storage/storage.service';
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
        if (err.status === 401) {
          console.error('Bad credential request:', err);
          router.navigate(['/login']);
        } else if (err.status === 200) {
          
        } else {
          console.error('HTTP error:', err);
        }
      } else {
        console.error('An error occurred:', err);
      }
    
      // Return an empty Observable to avoid breaking the chain
      return throwError(() => err);
    })
    
  );
};
