import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin } from '../interfaces/admin.interface'
import {ApiUrl} from '../configuration/config'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  login(admin: Admin): Observable<object> {
    return this.httpClient.post(ApiUrl+"/admin/login", {
      'email': admin.email,
      'password': admin.password
    });
  }

  logout(token: string): Observable<object> {
    const headers = { 'Authorization': 'Bearer ' + token };
    return this.httpClient.delete(ApiUrl+"/admin/logout", { headers });
  }

  forgotPassword(email: string): Observable<object> {
    return this.httpClient.post(ApiUrl+"/admin/forgot-password", {'email': email });
  }

  resetPassword(token: string, password: string): Observable<object> {
    const headers = { 'Authorization': 'Bearer ' + token };
    return this.httpClient.post(ApiUrl+"/customer/reset", {'password': password },{ headers });
  }
}
