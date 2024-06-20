import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth/auth.guard';
import { LoginComponent } from './modules/auth/page/login/login.component';
import { PageNotFoundComponent } from './shared/pages/page-not-found/page-not-found.component';
import { DashboardComponent } from './modules/dashboard/page/dashboard/dashboard.component';
import { ResetPasswordComponent } from './modules/auth/page/reset-password/reset-password.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'reset-password', component: ResetPasswordComponent, title: 'Reset Passwod' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard], title: 'Dashboard' },
  { path: 'page-not-found', component: PageNotFoundComponent, title: 'Page not found!' },
  { path: 'users', canActivate: [authGuard], loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule) },
  { path: 'balances', canActivate: [authGuard], loadChildren: () => import('./modules/balances/balances.module').then(m => m.BalancesModule) },
  { path: 'branch-reservations', canActivate: [authGuard], loadChildren: () => import('./modules/branch-reservations/branch-reservations.module').then(m => m.BranchReservationsModule) },
  { path: 'exchange-rates', canActivate: [authGuard], loadChildren: () => import('./modules/exchange-rates/exchange-rates.module').then(m => m.ExchangeRatesModule) },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/page-not-found', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
