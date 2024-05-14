import { Component, ViewChild } from '@angular/core';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @ViewChild('form') loginComponent!: LoginComponent;

  initForm() {
    this.loginComponent.clearForm();
  }
}
