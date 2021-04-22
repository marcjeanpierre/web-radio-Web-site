import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin } from '../interfaces/admin.interface'
import { AdminAuth } from '../types/adminAuth.type';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  login(admin: Admin): Observable<object> {
    return this.httpClient.post("https://api-radio-world.herokuapp.com/admin/login", {
      'email': admin.email,
      'password': admin.password
    });
  }

  logout(token: string): Observable<object> {
    const headers = { 'Authorization': 'Bearer ' + token };
    return this.httpClient.delete("https://api-radio-world.herokuapp.com/admin/logout", { headers });
  }

  forgotPassword(email: string): Observable<object> {
    return this.httpClient.post("https://api-radio-world.herokuapp.com/admin/forgot-password", {'email': email });
  }
}
