import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MixInterface } from '../interfaces/mix.interface'
@Injectable({
  providedIn: 'root'
})
export class MixService {

  constructor(private httpClient: HttpClient) { }

  createMix(token:string, mix: MixInterface): Observable<object> {
    const headers = { 'Authorization': 'Bearer ' + token };
    return this.httpClient.post('http://localhost:3001/mix/create-mix', mix, {headers});
  }

  loadMix(token:string): Observable<object> {
    const headers = { 'Authorization': 'Bearer ' + token };
    return this.httpClient.get('http://localhost:3001/mix/load-mix', {headers});
  }
}
