import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrl } from '../configuration/config';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  songUrl: string = null;
  constructor(private httpClient: HttpClient) {}

  getSongs(token: string): Observable<object> {
    const headers = { 'Authorization': 'Bearer ' + token };
        return this.httpClient.get(`${ApiUrl}/song/getSongs`, { headers });
  }
}

