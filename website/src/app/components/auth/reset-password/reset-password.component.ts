import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { AdminAuth } from 'src/app/types/adminAuth.type';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  token: string;
  password: string;
  confirmPassword: string;
  constructor(private activeRoute: ActivatedRoute, private toastr: ToastrService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.activeRoute.queryParams
    .subscribe((params) => 
      {
        if(params.code) {
          this.token = params.code;
          if(this.token =='' || this.token== ' ') {
            this.router.navigate(['/']);
          }
        }
        else {
          this.router.navigate(['/']);
        }
  });
  }

  onValidate(): void {
    if(this.password == this.confirmPassword) {
      this.authService.resetPassword(this.token, this.password)
      .pipe()
      .subscribe((data: AdminAuth) => {
        this.toastr.success("Password successfuly reseted");
        this.router.navigate(["/login"]);
      },
      (err) => {
        this.toastr.error(err.error.message);

      })
    }
    else {
      this.toastr.error("Password is different");
    }
  }
}
