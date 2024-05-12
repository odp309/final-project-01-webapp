import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { JwtDecoderService } from '../../services/jwt-decoder.service';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private storageService: StorageService,
    private jwtService: JwtDecoderService,
    private router: Router
  ) {
    this.form = this.fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        Validators.pattern(
          '^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d).{8,}$'
        ),
      ],
    });
  }

  onSubmitLogin() {
    this.authService.login(this.form.value).subscribe({
      next: (response: any) => {
        const user: any = this.jwtService.decodeToken(response.token);
        const closeButton: any = document.querySelector('[data-modal-hide="authentication-modal"]');

        this.storageService.setRoles(user.role);
        this.storageService.setToken(response.token);

        const role = user.role[0].roleName;

        if (role === 'Admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/user']);
        }

        closeButton.click();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
