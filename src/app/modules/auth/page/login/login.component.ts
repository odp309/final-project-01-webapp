import {Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { initFlowbite } from 'flowbite';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { StorageService } from '../../../../core/services/storage/storage.service';
import { JwtDecoderService } from '../../../../core/services/jwt/jwt-decoder.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {

  form!:FormGroup;
  passwordValidationStyle = {};
  emailValidationStyle = {};
  errorMessageStyle = {};
  loadingStyle = {};
  displayBlock = { display: 'block' };
  displayHidden = { display: 'none' };
  validCounter: number = 0;
  loadingIcon = faCircleNotch;
  errorStatusCode?: number;
  alertTitle: string = '';
  alertMessage: string = '';
  alertType: 'success' | 'error' = 'success';
  showAlert: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private storageService: StorageService,
    private jwtService: JwtDecoderService,
    private router: Router
  ) {
    this.form = this.fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  
  ngOnInit(): void {
    initFlowbite();
  }

  onSubmitLogin() {
    if (this.form.value.email === '') {
      this.emailValidationStyle = this.displayBlock;
      this.validCounter = 0;
    } else {
      this.emailValidationStyle = this.displayHidden;
      this.validCounter++;
    }

    if (this.form.value.password === '') {
      this.passwordValidationStyle = this.displayBlock;
      this.validCounter = 0;
    } else {
      this.passwordValidationStyle = this.displayHidden;
      this.validCounter++;
    }

    if (this.validCounter === 2) {
      this.loadingStyle = {
        display: 'inline-block',
      };

      this.authService.login(this.form.value).subscribe({
        next: (response: any) => {

          if (response.resetToken !== null) {
            // console.log(response.resetToken);
            // console.log('Navigation path:', `/reset-password?token=${response.resetToken}`);
            this.showAlert = true;
            this.alertType = 'success';
            this.alertTitle = 'Please'
            this.alertMessage = 'please change your password first.';
            this.router.navigate(['/reset-password'], { queryParams: { token: response.resetToken } });
          } else {

            const user: any = this.jwtService.decodeToken(response.accessToken);

            this.errorMessageStyle = this.displayHidden;
            this.validCounter = 0;
  
            localStorage.setItem('color-theme', 'light');
            this.storageService.setRoles(user.role);
            this.storageService.setToken(response.accessToken);
            this.storageService.setRefreshToken(response.refreshToken);
  
            this.router.navigate(['/dashboard']);
            
          }

        },
        error: (error) => {
          this.errorMessageStyle = this.displayBlock;
          this.loadingStyle = this.displayHidden;
          this.validCounter = 0;
          this.errorStatusCode = error.status;
          switch (this.errorStatusCode) {
            case 401:
              this.showAlert = true;
              this.alertType = 'error';
              this.alertTitle = 'Sorry'
              this.alertMessage = 'our email and password is incorrect. Please try again.';
              break;
            default:
              this.showAlert = true;
              this.alertType = 'error';
              this.alertTitle = 'Sorry'
              this.alertMessage = 'something went wrong. Please try again.';
            break;
          }
        },
        complete: () => {
          this.loadingStyle = this.displayHidden;
        },
      });
    }
  }

  clearForm() {
    this.form.reset();
    this.emailValidationStyle = this.displayHidden;
    this.passwordValidationStyle = this.displayHidden;
    this.errorMessageStyle = this.displayHidden;
    this.loadingStyle = this.displayHidden;
    this.validCounter = 0;
  }
  
}