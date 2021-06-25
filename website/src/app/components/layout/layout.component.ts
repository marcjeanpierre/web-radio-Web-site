import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  isSideNavToggle = false;
  firstname: string;
  constructor(private router: Router, private authService: AuthService,  private toastr: ToastrService) { }


  ngOnInit(): void {
    this.firstname = localStorage.getItem('firstname');
  }
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

  sideNaveToggle(): void {
    this.isSideNavToggle = !this.isSideNavToggle;
  }
}
