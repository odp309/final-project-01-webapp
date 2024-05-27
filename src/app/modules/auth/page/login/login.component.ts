import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { InstanceOptions, Modal, ModalInterface, ModalOptions } from 'flowbite';
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
    throw new Error('Method not implemented.');
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
          const user: any = this.jwtService.decodeToken(response.token);

          this.errorMessageStyle = this.displayHidden;
          this.validCounter = 0;

          this.storageService.setRoles(user.role);
          this.storageService.setToken(response.token);

          // const role = user.role[0].roleName;

          // if (role === 'Admin') {
          //   this.router.navigate(['/admin']);
          // } else {
          //   this.router.navigate(['/user']);
          // }

          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.errorMessageStyle = this.displayBlock;
          this.loadingStyle = this.displayHidden;
          this.validCounter = 0;
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