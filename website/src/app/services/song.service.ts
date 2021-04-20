import { Injectable } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  songUrl: string = null;
  constructor(private afStorage: AngularFireStorage) {

  }

  getSongUrl(src: string) {
    return this.afStorage.storage.refFromURL(src).getDownloadURL();
  }
}

