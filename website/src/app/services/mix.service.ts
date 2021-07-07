import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrl } from '../configuration/config';
import { MixInterface } from '../interfaces/mix.interface';
import { MixageTableInterface } from '../interfaces/mixageTable.interface';
@Injectable({
  providedIn: 'root'
})
export class MixService {

  constructor(private httpClient: HttpClient) { }

  createMix(token:string, mix: MixInterface): Observable<object> {
    const headers = { 'Authorization': 'Bearer ' + token };
    return this.httpClient.post(`${ApiUrl}/mix/create-mix`, mix, {headers});
  }

  getAllMix(token:string): Observable<object> {
    const headers = { 'Authorization': 'Bearer ' + token };
    return this.httpClient.get(`${ApiUrl}/mix/get-all-mix`, {headers});
  }

  saveMix(token:string, mixageTable: MixageTableInterface): Observable<object> {
    const headers = { 'Authorization': 'Bearer ' + token };
    return this.httpClient.post(`${ApiUrl}/mix/save-mix`, mixageTable, {headers});
  }

  loadMix(token:string, title: string): Observable<object> {
    const headers = { 'Authorization': 'Bearer ' + token };
    return this.httpClient.post(`${ApiUrl}/mix/load-mix`, {title}, {headers});
  }
}
