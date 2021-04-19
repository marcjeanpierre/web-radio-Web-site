import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/* Material */
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppRoutingModule } from './app.routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';

//jqwidgets
import { jqxKnobModule } from 'jqwidgets-ng/jqxknob';
import { jqxSliderModule } from 'jqwidgets-ng/jqxslider';

/* Components */
import { AppComponent } from './app.component';
import { LoginComponent } from './components/authantification/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForgotPasswordComponent } from './components/authantification/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/authantification/reset-password/reset-password.component';
import { HomeComponent } from './components/home/home.component';
import { RadioMixComponent } from './components/radio-mix/radio-mix.component';
import { HeaderComponent } from './components/header/header.component';

// environment
import  {  environment  }  from  '../environments/environment';
// // firebase
import  {  AngularFireModule  }  from  'angularfire2';
import  {  AngularFireDatabaseModule  }  from  'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    HomeComponent,
    RadioMixComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSliderModule,
    MatTabsModule,
    MatIconModule,
    FormsModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    jqxKnobModule,
    jqxSliderModule,
    MatToolbarModule,
    MatSelectModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSliderModule,
    MatTabsModule,
    MatIconModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    jqxKnobModule,
    jqxSliderModule,
    MatToolbarModule,
    MatSelectModule,
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
