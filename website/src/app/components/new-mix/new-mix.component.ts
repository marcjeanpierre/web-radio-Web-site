import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MixInterface } from 'src/app/interfaces/mix.interface';
import { MixService } from '../../services/mix.service'
import { ToastrService } from 'ngx-toastr';
import { MixageTableInterface } from 'src/app/interfaces/mixageTable.interface';
import TrancheRequestInterface from 'src/app/interfaces/trancheRequest.interface';

@Component({
  selector: 'app-new-mix',
  templateUrl: './new-mix.component.html',
  styleUrls: ['./new-mix.component.scss']
})
export class NewMixComponent {
  title: string = '';
  artist: string = '';
  album: string = '';
  genre: string = '';
  year: string = '';
  rec: boolean = false;
  diffusion: boolean = false;
  loadMix: Array<MixInterface>;
  loadMixLen: number = 0
  nbPiste: number = 6;
  constructor(private mixService: MixService, private router: Router, private toastr: ToastrService) { }

  createNewMix(): void {
    var date: Date = new Date(this.year)
    if (date.toString() !== "Invalid Date") {
      if (this.title !== '') {
        var newMix: MixInterface = {
          title: this.title,
          artist: this.artist,
          genre: this.genre,
          year: new Date(this.year).getFullYear(),
          diffusion: this.diffusion,
          nbPiste: this.nbPiste,
          rec: this.rec,
          album: this.album
        }

        var tranches: TrancheRequestInterface[] = [];
        for (var i = 0; i<this.nbPiste; i++) {
          tranches.push({
            asEffect: false,
            equalizer: {
              highGain: 0,
              midHighGain: 0,
              midLowGain: 0,
              lowGain: 0
            },
            idTranche: i,
            isPlaying: false,
            panStereo: {
              pan: 0
            },
            play: false,
            solo: false,
            mute: false,
            songUrl: null,
            volume: 0
          })
        }
        var mixageTable: MixageTableInterface = {
          title: this.title,
          tranches: tranches
        }
        this.mixService.createMix(localStorage.getItem('token'), newMix)
          .pipe()
          .subscribe(data => {
            this.mixService.saveMix(localStorage.getItem('token'), mixageTable)
              .pipe()
              .subscribe(data => {
                this.router.navigateByUrl('/radio-mix');
                this.toastr.success('New mix created');
                localStorage.setItem('nbPiste', newMix.nbPiste.toString());
                localStorage.setItem('title', newMix.title);
              });
          },
            err => {
              this.toastr.warning(err.error.message);
            })
      }
      else {
        this.toastr.warning('Enter un title');
      }
    }
    else {
      this.toastr.warning('Invalid Date ');
    }
  }



}
