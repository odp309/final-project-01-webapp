import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserComponent } from './components/user/user.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { LoginComponent } from './modules/auth/page/login/login.component';
import { PageNotFoundComponent } from './shared/pages/page-not-found/page-not-found.component';
import { DashboardComponent } from './modules/dashboard/page/dashboard/dashboard.component';

const routes: Routes = [
  // { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent, canActivate: [authGuard] },
  { path: 'user', component: UserComponent, canActivate: [authGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  // { path: 'forbidden', component: ForbiddenComponent },
  { path: 'login', component: LoginComponent },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/page-not-found', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
