import {
  Component,
  ViewChild,
} from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
