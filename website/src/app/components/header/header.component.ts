import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileModel } from '../../models/profile.model'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  firstname: string;
  constructor(private router: Router, private authService: AuthService,  private toastr: ToastrService) { }

  ngOnInit(): void {
    this.firstname = localStorage.getItem('firstname');
  }

  public menu: ProfileModel[] = [
    {
      name: 'Log Out',
      icon: ''
    }];
  logout(): void {
    this.authService.logout(localStorage.getItem('token'))
    .pipe()
    .subscribe(data => {
      localStorage.removeItem('token');
      localStorage.removeItem('title');
      localStorage.removeItem('nbPiste');
      localStorage.removeItem('firstname');
      this.toastr.success('Successfuly disconnected ');
      this.router.navigateByUrl('/login');
    });
    
  }
}
