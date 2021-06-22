import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
  constructor(private authService: AuthService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  sendEmail() {
    this.authService.forgotPassword(this.email)
    .pipe()
      .subscribe(data => {
        this.toastr.success('Successfuly send');
        this.sent = true;
        this.textButton = "Login"
      },
        err => {
          this.toastr.warning(err.error.message);

        });
  }
}
