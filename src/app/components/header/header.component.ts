import {
  Component,
  ViewChild,
} from '@angular/core';
import { LoginComponent } from '../../components/login/login.component';
import { StorageService } from '../../core/services/storage/storage.service';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @ViewChild('form') loginComponent!: LoginComponent;

  constructor(private storageService: StorageService, private router: Router, protected authService: AuthService) {}

  initForm() {
    this.loginComponent.clearForm();
  }

  isLoggedIn() {
    return this.storageService.isLoggedIn();
  }

  logOut() {
    this.storageService.clear();
    this.router.navigate(['/home']);
  }

  openModal() {
    this.loginComponent.openModal();
  }
}
