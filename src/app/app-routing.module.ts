import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth/auth.guard';
import { LoginComponent } from './modules/auth/page/login/login.component';
import { PageNotFoundComponent } from './shared/pages/page-not-found/page-not-found.component';
import { DashboardComponent } from './modules/dashboard/page/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard], title: 'Dashboard' },
  { path: 'page-not-found', component: PageNotFoundComponent, title: 'Page not found!' },
  { path: 'users', loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule) },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/page-not-found', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
