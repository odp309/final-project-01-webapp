import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { allHttpInterceptor } from './core/interceptors/http/all-http.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { authGuard } from './core/guards/auth/auth.guard';
import { AuthService } from './core/services/auth/auth.service';
import { LoginComponent } from './modules/auth/page/login/login.component';
import { PageNotFoundComponent } from './shared/pages/page-not-found/page-not-found.component';
import { DashboardNavbarComponent } from './shared/components/dashboard-navbar/dashboard-navbar.component';
import { DashboardContainerComponent } from './shared/components/dashboard-container/dashboard-container.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { DashboardComponent } from './modules/dashboard/page/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    DashboardNavbarComponent,
    DashboardContainerComponent,
    FooterComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  providers: [
    provideHttpClient(withInterceptors([allHttpInterceptor])),
    AuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
