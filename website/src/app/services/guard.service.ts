import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrl } from '../configuration/config';

@Injectable({
  providedIn: 'root'
})
export class GuardService {

  constructor(private httpClient: HttpClient) { }

  tokenChecker(token: string): Observable<object> {
    const headers = { 'Authorization': 'Bearer ' + token };
    return this.httpClient.get(ApiUrl+"/token-checker", { headers });
  }
}
