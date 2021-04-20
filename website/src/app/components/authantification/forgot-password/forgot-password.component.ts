import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  sent: boolean = false;
  textButton: string = "Send";
  email: string;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  sendEmail(){
    this.sent = true;
    this.textButton = "Login"
    this.authService.forgotPassword(this.email);
    console.log('ok')
  }
}
