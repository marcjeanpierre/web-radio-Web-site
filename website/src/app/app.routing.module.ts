import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ForgotPasswordComponent } from './components/authantification/forgot-password/forgot-password.component';
import { LoginComponent } from './components/authantification/login/login.component';
import { ResetPasswordComponent } from './components/authantification/reset-password/reset-password.component';
import { RadioMixComponent } from './components/radio-mix/radio-mix.component';


const routes: Routes = [{
  path: '',
  component: AppComponent,
  children: [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
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
      component: HomeComponent
    },
    {
      path: 'radioMix',
      component: RadioMixComponent
    },
    {
      path: 'resetPassword',
      component: ResetPasswordComponent
    }]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
