import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { GuardService } from '../services/guard.service'
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private guardService: GuardService, private toastr: ToastrService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      var token: string = localStorage.getItem('token');
      if(!token) {
        this.router.navigate(["/"]);
        return false;
      }
      this.guardService.tokenChecker(localStorage.getItem('token'))
      .pipe()
      .subscribe((data: any) => {},
      (err) => {
        this.toastr.error(err.error.message);
        this.router.navigate(["/"]);

      })
    return true;
  }
  
}
