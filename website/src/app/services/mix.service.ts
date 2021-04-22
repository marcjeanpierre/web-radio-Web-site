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
    return this.httpClient.post('https://api-radio-world.herokuapp.com/mix/create-mix', mix, {headers});
  }

  loadMix(token:string): Observable<object> {
    const headers = { 'Authorization': 'Bearer ' + token };
    return this.httpClient.get('https://api-radio-world.herokuapp.com/mix/load-mix', {headers});
  }
}
