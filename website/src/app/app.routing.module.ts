import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewMixComponent } from './components/new-mix/new-mix.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { RadioMixComponent } from './components/radio-mix/radio-mix.component';
import { PageNotFoundComponent } from './components/not-found/page-not-found/page-not-found.component';
import { AuthGuard } from './guards/auth.guard'
import { LayoutComponent } from './components/layout/layout.component';
import { LoadMixComponent } from './components/load-mix/load-mix.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'new-mix',
        component: NewMixComponent, canActivate:[AuthGuard]
      },
      {
        path: 'load-mix',
        component: LoadMixComponent, canActivate:[AuthGuard]
      },
      {
        path: 'radio-mix',
        component: RadioMixComponent, canActivate:[AuthGuard]
      }
    ]},
    {
      path: 'forgot-password',
      component: ForgotPasswordComponent
    },
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'reset-password',
      component: ResetPasswordComponent
    },
    { path: '**', component: PageNotFoundComponent }
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  