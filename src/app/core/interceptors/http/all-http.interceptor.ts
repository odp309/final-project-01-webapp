import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { StorageService } from '../../services/storage/storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { JwtDecoderService } from '../../services/jwt/jwt-decoder.service';

// intercept outgoing HTTP requests and add the Authorization header with the JWT token

export const allHttpInterceptor: HttpInterceptorFn = (request, next) => {
  const router: Router = inject(Router);
  const storageService: StorageService = inject(StorageService);
  const authService: AuthService = inject(AuthService);
  const jwtService: JwtDecoderService = inject(JwtDecoderService);
  const route: ActivatedRoute = inject(ActivatedRoute);

  const currentRoute: string = router.url;

  const token = storageService.getToken();

  if (request.headers.get('No-Auth') === 'True') {
    return next(request.clone()).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          switch (err.status) {
            case 401:
              // console.error('Bad credential request:', err);
              // router.navigate(['/login']);
              switch (err.error.status) {
                case 401:
                  console.error('Bad credential request:', err);
                  storageService.clear() ;
                  router.navigate(['/login']);
                  break;
                case 403:
                  console.log('refresh token generated');
                  const refreshToken = storageService.getRefreshToken();
                  authService.relogin(refreshToken).subscribe({
                    next: (response: any) => {
                      const user: any = jwtService.decodeToken(response.accessToken);
            
                      storageService.setRoles(user.role);
                      storageService.setToken(response.accessToken);
                      storageService.setRefreshToken(response.refreshToken);
            
                      router.navigate([currentRoute]);
                    },
                    error: (error) => {
                      if (error.access_denied_reason === 'Refresh Token Invalid') {
                        storageService.clear() ;
                        router.navigate(['/login']);
                      }
                      console.error('HTTP error:', error);
                    }});
                break;
                case 500:
                  console.error('Internal Server Error:', err);
                  router.navigate([currentRoute]);
                  break;
                default:
                  console.error('Bad credential request:', err);
                  storageService.clear() ;
                  router.navigate(['/login']);
                  break;
              }
              break;
            case 403:
              console.log('refresh token generated');
              const refreshToken = storageService.getRefreshToken();
              authService.relogin(refreshToken).subscribe({
                next: (response: any) => {
                  const user: any = jwtService.decodeToken(response.accessToken);
        
                  storageService.setRoles(user.role);
                  storageService.setToken(response.accessToken);
                  storageService.setRefreshToken(response.refreshToken);
        
                  router.navigate([currentRoute]);
                },
                error: (error) => {
                  if (error.access_denied_reason === 'access_denied_reason') {
                    storageService.clear() ;
                    router.navigate(['/login']);
                  }
                  console.error('HTTP error:', error);
                    storageService.clear() ;
                    router.navigate(['/login']);
                }});
            break;
            case 500:
                if(err.url === 'https://valasplus.cloud/api/v1/public/employee/password-reset') {
                    const urlParams = new URLSearchParams(currentRoute.split('?')[1]);
                    const resetToken = urlParams.get('token');
                    console.error('Internal Server Error:', err);
                    router.navigate(['/reset-password'], { queryParams: { token: resetToken } });
                  } else {
                    console.error('Internal Server Error:', err);
                    router.navigate([currentRoute]);
                  }
                  break;
            default:
              console.error('Bad credential request:', err);
                storageService.clear() ;
                  router.navigate(['/login']);
              break;
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
        switch (err.status) {
          case 401:
            // console.error('Bad credential request:', err);
            // router.navigate(['/login']);
            switch (err.error.status) {
              case 401:
                console.error('Bad credential request:', err);
                storageService.clear() ;
                router.navigate(['/login']);
                break;
              case 403:
                console.log('refresh token generated');
                const refreshToken = storageService.getRefreshToken();
                authService.relogin(refreshToken).subscribe({
                  next: (response: any) => {
                    const user: any = jwtService.decodeToken(response.accessToken);
          
                    storageService.setRoles(user.role);
                    storageService.setToken(response.accessToken);
                    storageService.setRefreshToken(response.refreshToken);
          
                    router.navigate([currentRoute]);
                  },
                  error: (error) => {
                    console.log(error.access_denied_reason);
                    if (error.access_denied_reason === 'access_denied_reason') {
                      storageService.clear() ;
                      router.navigate(['/login']);
                    }
                    console.error('HTTP error:', error);
                  }});
              break;
              case 500:
                console.error('Internal Server Error:', err);
                router.navigate([currentRoute]);
                break;
              default:
                console.error('Bad credential request:', err);
                storageService.clear() ;
                router.navigate(['/login']);
                break;
            }
            break;
          case 403:
            console.log('refresh token generated');
            const refreshToken = storageService.getRefreshToken();
            authService.relogin(refreshToken).subscribe({
              next: (response: any) => {
                const user: any = jwtService.decodeToken(response.accessToken);
      
                storageService.setRoles(user.role);
                storageService.setToken(response.accessToken);
                storageService.setRefreshToken(response.refreshToken);
      
                router.navigate([currentRoute]);
              },
              error: (error) => {
                if (error.access_denied_reason === 'access_denied_reason') {
                  storageService.clear() ;
                  router.navigate(['/login']);
                }
                console.error('HTTP error:', error);
              }});
          break;
          case 500:
                console.error('Internal Server Error:', err);
                router.navigate([currentRoute]);
                break;
          default:
            console.error('Bad credential request:', err);
              storageService.clear() ;
                router.navigate(['/login']);
            break;
        }
      } else {
        console.error('An error occurred:', err);
      }
    
      // Return an empty Observable to avoid breaking the chain
      return throwError(() => err);
    })
    
  );
};
