import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { JwtDecoderService } from '../../../../core/services/jwt/jwt-decoder.service';
import { StorageService } from '../../../../core/services/storage/storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {

  form!:FormGroup;
  newPasswordValidationStyle = {};
  confirmationNewPasswordValidationStyle = {};
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
  token!: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private storageService: StorageService,
    private jwtService: JwtDecoderService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.form = this.fb.nonNullable.group({
      newPassword: ['', [Validators.required]],
      confirmationNewPassword: ['', Validators.required],
      token: ['', Validators.required],
    });
  }
  
  ngOnInit(): void {
    initFlowbite();
    this.token = this.route.snapshot.queryParams['token'];
  }

  onSubmitResetPassword() {
    if (this.form.value.newPassword === '') {
      this.newPasswordValidationStyle = this.displayBlock;
      this.validCounter = 0;
    } else {
      this.newPasswordValidationStyle = this.displayHidden;
      this.validCounter++;
    }

    if (this.form.value.confirmationNewPassword === '') {
      this.confirmationNewPasswordValidationStyle = this.displayBlock;
      this.validCounter = 0;
    } else {
      this.confirmationNewPasswordValidationStyle = this.displayHidden;
      this.validCounter++;
    }

    if ( this.form.value.newPassword !== this.form.value.confirmationNewPassword ) {
      this.newPasswordValidationStyle = this.displayBlock;
      this.confirmationNewPasswordValidationStyle = this.displayBlock;
    }

    if (this.validCounter === 2) {
      this.loadingStyle = {
        display: 'inline-block',
      };

      const resetPasswordData = { ...this.form.value };
      resetPasswordData.token = this.token;
      delete resetPasswordData.confirmationNewPassword;

      this.authService.resetPassword(resetPasswordData).subscribe({
        next: (response: any) => {

          this.errorMessageStyle = this.displayHidden;
          this.validCounter = 0;

          this.showAlert = true;
          this.alertType = 'success';
          this.alertTitle = 'Success'
          this.alertMessage = 'Please login with your new password.';
          this.router.navigate(['/login']);
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
    this.newPasswordValidationStyle = this.displayHidden;
    this.confirmationNewPasswordValidationStyle = this.displayHidden;
    this.errorMessageStyle = this.displayHidden;
    this.loadingStyle = this.displayHidden;
    this.validCounter = 0;
  }

}
