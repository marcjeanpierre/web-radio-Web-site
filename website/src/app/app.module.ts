import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/* Material */
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AppRoutingModule } from './app.routing.module';
import {MatCardModule} from '@angular/material/card';
import {MatSliderModule} from '@angular/material/slider';


/* Components */
import { AppComponent } from './app.component';
import { LoginComponent } from './components/authantification/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForgotPasswordComponent } from './components/authantification/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/authantification/reset-password/reset-password.component';
import { AcceuilComponent } from './components/acceuil/acceuil.component';
import { RadioMixComponent } from './components/radio-mix/radio-mix.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    AcceuilComponent,
    RadioMixComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSliderModule
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
