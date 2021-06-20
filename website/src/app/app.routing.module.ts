import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ForgotPasswordComponent } from './components/authantification/forgot-password/forgot-password.component';
import { LoginComponent } from './components/authantification/login/login.component';
import { ResetPasswordComponent } from './components/authantification/reset-password/reset-password.component';
import { RadioMixComponent } from './components/radio-mix/radio-mix.component';
import { PageNotFoundComponent } from './components/not-found/page-not-found/page-not-found.component';
import { AuthGuard } from './guards/auth.guard'

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'forgotPassword',
    component: ForgotPasswordComponent
  },
  {
    path: 'home',
    component: HomeComponent, canActivate:[AuthGuard]
  },
  {
    path: 'radioMix',
    component: RadioMixComponent, canActivate:[AuthGuard]
  },
  {
    path: 'resetPassword',
    component: ResetPasswordComponent
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
