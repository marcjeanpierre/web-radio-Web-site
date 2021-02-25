import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './authantification/login/login.component';


const routes: Routes = [{
  path: '',
  component: AppComponent,
  children: [
    { path: '', redirectTo: '', pathMatch: 'full' },
    {
      path: 'login',
      component: LoginComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
