import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileModel } from '../../models/profile.model'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  public menu: ProfileModel[] = [
    {
      name: 'Log Out',
      icon: ''
    }];
  logout(): void {
    this.authService.logout(localStorage.getItem('token'));
    localStorage.setItem('token','');
    this.router.navigateByUrl('/login');
  }
}
