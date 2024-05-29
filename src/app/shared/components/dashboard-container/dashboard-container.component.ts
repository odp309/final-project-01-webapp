import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrl: './dashboard-container.component.css'
})
export class DashboardContainerComponent {

  currentRoute?: any;
  currentRouteName?: any;

  constructor(private router: Router) {
    const getCurrentRoute = this.router.url;
    this.currentRoute = getCurrentRoute.replace("/", " / ");
    this.currentRouteName = getCurrentRoute.replace("/", "");
    console.log(this.currentRoute, this.currentRouteName);
  }

}
