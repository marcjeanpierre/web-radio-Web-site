import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { ApiUrl } from '../configuration/config';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  songUrl: string = null;
  constructor(private afStorage: AngularFireStorage, private httpClient: HttpClient) {

  }

  getSongUrl(src: string) {
    return this.afStorage.storage.refFromURL(src).getDownloadURL();
  }

  getSongs(token: string): Observable<object> {
    const headers = { 'Authorization': 'Bearer ' + token };
        return this.httpClient.get(ApiUrl+"/song/getSongs", { headers });
  }
}

