import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { allHttpInterceptor } from './interceptors/all-http.interceptor';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const routes: Routes = [
  // { path: 'account/register', component: RegisterComponent },
  // { path: 'account/login', component: LoginComponent },
  // { path: 'chair', component: ChairLocationComponent },
  // // { path: 'home', component: HomeComponent },
  // { path: 'home', component: ContentComponent },
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideHttpClient(withInterceptors([allHttpInterceptor])),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
