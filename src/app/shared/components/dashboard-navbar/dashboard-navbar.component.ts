import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { JwtDecoderService } from '../../../core/services/jwt/jwt-decoder.service';

@Component({
  selector: 'app-dashboard-navbar',
  templateUrl: './dashboard-navbar.component.html',
  styleUrl: './dashboard-navbar.component.css',
})
export class DashboardNavbarComponent implements OnInit {

  user?: any;
  role?: any;

  constructor(private jwtDecoderService: JwtDecoderService) { }

  ngOnInit(): void {
    initFlowbite();

    //------------------------------ Fuck it here we go DARK MODE! ------------------------------//

    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (
      localStorage.getItem('color-theme') === 'dark' ||
      (!('color-theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Change the icons inside the button based on previous settings
    const themeToggleDarkIcon = document.getElementById(
      'theme-toggle-dark-icon'
    );
    const themeToggleLightIcon = document.getElementById(
      'theme-toggle-light-icon'
    );

    if (
      localStorage.getItem('color-theme') === 'dark' ||
      (!('color-theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      themeToggleLightIcon!.classList.remove('hidden');
    } else {
      themeToggleDarkIcon!.classList.remove('hidden');
    }

    const themeToggleBtn = document.getElementById('theme-toggle');

    themeToggleBtn!.addEventListener('click', () => {
      // Toggle icons inside button
      themeToggleDarkIcon!.classList.toggle('hidden');
      themeToggleLightIcon!.classList.toggle('hidden');

      // If set via local storage previously
      if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
          document.documentElement.classList.add('dark');
          localStorage.setItem('color-theme', 'dark');
        } else {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('color-theme', 'light');
        }

        // If NOT set via local storage previously
      } else {
        if (document.documentElement.classList.contains('dark')) {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('color-theme', 'light');
        } else {
          document.documentElement.classList.add('dark');
          localStorage.setItem('color-theme', 'dark');
        }
      }
    });
    
    const token = localStorage.getItem('jwtToken')?.toString();
    if (token) {
      this.user = this.jwtDecoderService.decodeToken(token);
      const roles = localStorage.getItem('roles');
      const getRoleName = roles ? JSON.parse(roles) : null;
      this.role = getRoleName[0].roleName;
    }

  }

}
