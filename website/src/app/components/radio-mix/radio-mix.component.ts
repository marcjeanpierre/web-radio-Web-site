import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SongService } from '../../services/song.service';
import { Tranche } from '../../interfaces/tranche.interface'
import { MatSliderChange } from '@angular/material/slider';
import { SongList } from '../../types/songList.type'
import { SongElement } from '../../types/songElement.type'
import { MixService } from 'src/app/services/mix.service';
import { ToastrService } from 'ngx-toastr';
import Pizzicato from "pizzicato";
import { MixageTableInterface } from 'src/app/interfaces/mixageTable.interface';
import TrancheRequestInterface from 'src/app/interfaces/trancheRequest.interface';
import { Router } from '@angular/router';
@Component({
  selector: 'app-radio-mix',
  templateUrl: './radio-mix.component.html',
  styleUrls: ['./radio-mix.component.scss']
})
export class RadioMixComponent implements OnInit, OnDestroy {
  marks: any;
  labels: any;
  progressBar: any;
  pointer: any;
  tranche: Tranche[] = [];
  micTranche: Tranche;
  songs = new FormControl();
  songList: SongElement[] = [];
  selected = "Song";
  defaultV = 10
  title: string;
  // sound part
  voice: any;
  volumeValue: number = 100;
  tuner: any;
  soloAll = 0;
  token: string;
  loaded = false
  constructor(private songService: SongService, private mixService: MixService, private toaster: ToastrService, private router: Router, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.title = localStorage.getItem('title');
    this.token = localStorage.getItem('token');
    if (!this.token || !this.title) {
      this.toaster.error('You have to be connected & choose or create a mix');
      this.router.navigate(['/']);
    }
    // Pizzicato.context.resume();
    // this.trancheByDefault(Number(localStorage.getItem('nbPiste')) || 6);
    this.mixService.loadMix(this.token, this.title)
      .pipe()
      .subscribe((data: any) => {
        var mixageTableResponse: MixageTableInterface = data.mixageTable;
        this.title = mixageTableResponse.title;
        this.micTranche = {
          id: -1,
          volume: 0,
          panStereo: {
            pan: 0
          },
          panEffect: null,
          equalizer: {
            highGain: 0,
            midHighGain: 0,
            midLowGain: 0,
            lowGain: 0
          },
          equalizerEffect: null,
          mute: false,
          solo: false,
          isPlaying: false,
          audioGroup: new Pizzicato.Group(),
          asEffect: false,
          audioSong: null,
          play: false
        };
        this.getSongs();
        //know props begin

        this.marks =
        {
          colorRemaining: { color: 'white', border: 'white' },
          colorProgress: { color: 'red', border: '#373636' },
          type: 'line',
          offset: '71%',
          thickness: 1,
          size: '6%',
          majorSize: '9%',
          majorInterval: 10,
          minorInterval: 2
        };
        this.labels =
        {
          offset: '88%',
          step: 10,
          visible: true
        };
        this.progressBar =
        {
          size: '70%',
          offset: '0%',
          background: {
            stroke: '#373636', strokeWidth: 1, fill: { color: '#a7a7a7', gradientType: "linear", gradientStops: [[0, 1], [50, 0.5], [100, 1]] }
          }
        };
        this.pointer =
        {
          type: 'circle', style: { fill: { color: '#a4a3a3', gradientType: "linear", gradientStops: [[0, 0.5], [50, 0.6], [100, 1]] }, stroke: '#333' },
          size: '10%', offset: '50%'
        };
        this.trancheByDefault(mixageTableResponse.tranches);
        this.loaded = true;
      });
  }

  ngAfterContentChecked() : void {
    this.cdr.detectChanges();
}
  ngOnDestroy() {
    this.micTranche.audioGroup.stop();
    this.micTranche.audioGroup = null;
    this.tranche.map((item) => {
      item.audioGroup.stop();
      item.audioGroup = null
    })
  }


  trancheByDefault(tranches: TrancheRequestInterface[]): void {
    var equalizerEffectTmp;
    var panEffectTmp;
    for (var i = 0; i < tranches.length; i++) {
      equalizerEffectTmp = new Pizzicato.Effects.Quadrafuzz(tranches[i].equalizer);
      panEffectTmp = new Pizzicato.Effects.StereoPanner(tranches[i].panStereo);
      this.soloAll += tranches[i].solo ? 1:0;
      this.tranche.push({
        id: tranches[i].idTranche,
        volume: tranches[i].volume,
        panStereo: tranches[i].panStereo,
        panEffect: panEffectTmp,
        equalizer: tranches[i].equalizer,
        equalizerEffect: equalizerEffectTmp,
        mute: tranches[i].mute,
        solo: tranches[i].solo,
        isPlaying: false,
        asEffect: tranches[i].asEffect,
        audioGroup: new Pizzicato.Group().addEffect(equalizerEffectTmp).addEffect(panEffectTmp),
        audioSong: null,
        songUrl: tranches[i].songUrl,
        play: false
      });
    }
  }


  addTranche(): void {
    this.tranche.push({
      id: this.tranche.length + 1,
      volume: 0,
      panStereo: {
        pan: 0
      },
      panEffect: new Pizzicato.Effects.StereoPanner({
        value: 0
      }),
      equalizer: {
        highGain: 0,
        midHighGain: 0,
        midLowGain: 0,
        lowGain: 0
      },
      equalizerEffect: new Pizzicato.Effects.Quadrafuzz({
        highGain: 0,
        midHighGain: 0,
        midLowGain: 0,
        lowGain: 0
      }),
      mute: false,
      solo: false,
      isPlaying: false,
      asEffect: false,
      audioGroup: new Pizzicato.Group(),
      audioSong: null,
      play: false
    });
  }


  setVolume(idTranche: number, event: any): void {
    this.tranche[idTranche].volume = event.args.value
    if (!this.tranche[idTranche].mute && this.soloAll === 0) {
      this.tranche[idTranche].audioGroup.volume = this.tranche[idTranche].volume / 10;
    }
  }


  setVolumeMic(): void {
    if (!this.micTranche.mute) {
      this.micTranche.audioGroup.volume = this.micTranche.volume / 10;
    }
  }


  setHigh(idTranche: number, event: any): void {
    if (this.tranche[idTranche].asEffect) {
      this.tranche[idTranche].audioGroup.removeEffect(this.tranche[idTranche].equalizerEffect);
      this.tranche[idTranche].asEffect = false;
    }
    this.tranche[idTranche].equalizer.highGain = event.args.value /100;
    this.tranche[idTranche].equalizerEffect = new Pizzicato.Effects.Quadrafuzz(this.tranche[idTranche].equalizer)
    this.tranche[idTranche].audioGroup.addEffect(this.tranche[idTranche].equalizerEffect);
    this.tranche[idTranche].asEffect = true;
    this.tranche[idTranche].audioGroup.volume = this.tranche[idTranche].volume - this.tranche[idTranche].equalizer.highGain;
  }


  setMedium(idTranche: number, event: any): void {
    if (this.tranche[idTranche].asEffect) {
      this.tranche[idTranche].audioGroup.removeEffect(this.tranche[idTranche].equalizerEffect);
      this.tranche[idTranche].asEffect = false;
      this.tranche[idTranche].equalizer.midHighGain = event.args.value /100;
      this.tranche[idTranche].equalizer.midLowGain = event.args.value /100;
    }
    this.tranche[idTranche].equalizerEffect = new Pizzicato.Effects.Quadrafuzz(this.tranche[idTranche].equalizer)
    this.tranche[idTranche].audioGroup.addEffect(this.tranche[idTranche].equalizerEffect);
    this.tranche[idTranche].asEffect = true;
    this.tranche[idTranche].audioGroup.volume = this.tranche[idTranche].volume - this.tranche[idTranche].equalizer.midHighGain - this.tranche[idTranche].equalizer.midLowGain;
  }


  setBass(idTranche: number, event: any) {
    if (this.tranche[idTranche].asEffect) {
      this.tranche[idTranche].audioGroup.removeEffect(this.tranche[idTranche].equalizerEffect);
      this.tranche[idTranche].asEffect = false;
    }
    this.tranche[idTranche].equalizer.lowGain = event.args.value /100;
    this.tranche[idTranche].equalizerEffect = new Pizzicato.Effects.Quadrafuzz(this.tranche[idTranche].equalizer);
    this.tranche[idTranche].audioGroup.addEffect(this.tranche[idTranche].equalizerEffect);
    this.tranche[idTranche].asEffect = true;
    this.tranche[idTranche].audioGroup.volume = this.tranche[idTranche].volume - this.tranche[idTranche].equalizer.lowGain;
  }


  setPan(idTranche: number, event: MatSliderChange): void {
    if (this.tranche[idTranche].asEffect) {
      this.tranche[idTranche].audioGroup.removeEffect(this.tranche[idTranche].panEffect);
      this.tranche[idTranche].asEffect = false;
    }
    this.tranche[idTranche].panStereo.pan = event.value / 10;
    this.tranche[idTranche].panEffect = new Pizzicato.Effects.StereoPanner(this.tranche[idTranche].panStereo);
    this.tranche[idTranche].audioGroup.addEffect(this.tranche[idTranche].panEffect);
    this.tranche[idTranche].asEffect = true;
    this.tranche[idTranche].audioGroup.volume = this.tranche[idTranche].volume;
  }
  playMic(): void {
    if (this.micTranche.play) {
      this.deactivateMic();
    }
    else {
      this.activeMic();

    }
  }

  micOn(): void {
    if (this.micTranche.solo) {
      if (this.micTranche.mute) {
        this.micTranche.audioGroup.volume = 0;
      }
      this.tranche.map(x => {
        if (!this.tranche[x.id - 1].mute) {
          this.tranche[x.id - 1].audioGroup.volume = this.tranche[x.id - 1].volume / 10;
        }
      })
    }
    else {
      this.micTranche.audioGroup.volume = this.micTranche.volume / 10;
      this.tranche.map(x => {
        if (!this.tranche[x.id - 1].solo) {
          this.tranche[x.id - 1].audioGroup.volume = 0;
        }
      })

    }

    this.micTranche.solo = this.micTranche.solo ? false : true;
  }


  micOff(): void {
    if (!this.micTranche.mute) {
      this.micTranche.audioGroup.volume = 0;
      this.micTranche.mute = true;
    }
    else {
      this.micTranche.audioGroup.volume = this.micTranche.volume / 10;
      this.micTranche.mute = false;
    }
  }


  activeMic(): void {
    this.micTranche.audioGroup = new Pizzicato.Sound({
      source: 'input',
      options: { volume: 0.8 }
    }, () => {
      navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then((permissionStatus) => {
        this.toaster.success('You microphone is working');
        this.micTranche.audioGroup.volume = this.micTranche.volume / 10;
        this.micTranche.audioGroup.play();
        this.micTranche.play = true;

      },
        e => {
          this.toaster.warning('You microphone is not working, we need your authorization for using your mic');
        }).catch(err => {
          this.toaster.warning("we need your authorization for using your mic");
          console.log("u got an error:" + err);
        });
    })
  }


  deactivateMic(): void {
    this.micTranche.audioGroup.stop();
    this.micTranche.play = false;
  }

  saveSongData(idTranche: number, url: string, title: string, artist: string): void {
    this.tranche[idTranche].songUrl = url;
    this.tranche[idTranche].songTitle = title;
    this.tranche[idTranche].songArtist = artist;
    this.tranche[idTranche].audioGroup.stop();
    this.tranche[idTranche].play = false;
  }

  play(idTranche: number): void {
    if (this.tranche[idTranche].play) {
      this.tranche[idTranche].audioGroup.stop();
      this.tranche[idTranche].play = false;
    }
    else {
      if (this.tranche[idTranche].songUrl) {
        this.tranche[idTranche].audioGroup.stop()
        this.tranche[idTranche].audioGroup = new Pizzicato.Group()
        this.tranche[idTranche].audioGroup.addSound(new Pizzicato.Sound(
          this.tranche[idTranche].songUrl, () => {
            this.tranche[idTranche].equalizerEffect = new Pizzicato.Effects.Quadrafuzz(this.tranche[idTranche].equalizer);
            this.tranche[idTranche].audioGroup.addEffect(this.tranche[idTranche].equalizerEffect);
            this.tranche[idTranche].panEffect = new Pizzicato.Effects.StereoPanner(this.tranche[idTranche].panStereo);
            this.tranche[idTranche].audioGroup.addEffect(this.tranche[idTranche].panEffect);
            this.tranche[idTranche].audioSong = new Pizzicato.Sound(this.tranche[idTranche].songUrl);
            if (!this.tranche[idTranche].mute) {
              this.tranche[idTranche].audioGroup.volume = this.tranche[idTranche].volume / 10;
            }
            else {
              this.tranche[idTranche].audioGroup.volume = 0;
            }
            this.tranche[idTranche].audioGroup.play()
            this.tranche[idTranche].play = true;
          }));
      }
      else {
        this.toaster.warning("Choose a song before playing something")
      }
    }
  }


  onMute(idTranche: number): void {
    if (this.tranche[idTranche].mute) {
      this.unMute(idTranche);
    }
    else {
      this.mute(idTranche);
    }
  }


  mute(idTranche: number): void {
    this.tranche[idTranche].audioGroup.volume = 0
    this.tranche[idTranche].mute = true;

  }


  unMute(idTranche: number): void {
    if (this.soloAll === 0) {
      this.tranche[idTranche].audioGroup.volume = this.tranche[idTranche].volume / 10;
    }
    this.tranche[idTranche].mute = false;

  }


  onSolo(idTranche: number): void {
    if (this.tranche[idTranche].solo) {
      this.unSolo(idTranche);
    }
    else {
      this.solo(idTranche);
    }
  }


  solo(idTranche: number): void {
    this.tranche[idTranche].audioGroup.volume = this.tranche[idTranche].volume / 10;
    this.tranche.map(x => {
      if (!x.solo && x.id - 1 !== idTranche) {
        this.tranche[x.id - 1].audioGroup.volume = 0
      }
    })
    this.tranche[idTranche].solo = true;
    this.soloAll++;
  }


  unSolo(idTranche: number): void {
    if (this.soloAll === 1) {
      this.tranche.map(x => {
        if (!x.solo && !x.mute) {
          this.tranche[x.id - 1].audioGroup.volume = this.tranche[x.id - 1].volume / 10;
        }
      });
      if (this.tranche[idTranche].mute) {
        this.tranche[idTranche].audioGroup.volume = 0;
      }
    }
    else {
      this.tranche[idTranche].audioGroup.volume = 0;
    }
    this.tranche[idTranche].solo = false;
    this.soloAll--;

  }


  // song fonction 
  getSongs(): void {
    this.songService.getSongs(localStorage.getItem('token'))
      .pipe()
      .subscribe((data: SongList) => {
        for (let i = 0; i < data.songs.length; i++) {
          let elem: SongElement = { artist: '', title: '', genre: '', time: '', url: '' };
          elem.artist = data.songs[i].artist;
          elem.title = data.songs[i].title;
          elem.genre = data.songs[i].genre;
          elem.time = data.songs[i].time;
          elem.url = data.songs[i].url;
          this.songList.push(elem);
        }
      })
  }


  save(): void {
    var tranches: TrancheRequestInterface[] = [];
    for (var item of this.tranche) {
      tranches.push({
        asEffect: item.asEffect,
        equalizer: item.equalizer,
        idTranche: item.id,
        isPlaying: item.isPlaying,
        panStereo: item.panStereo,
        play: item.play,
        solo: item.solo,
        mute: item.mute,
        songUrl: item.songUrl,
        volume: item.volume
      })
    }
    const mixageTable: MixageTableInterface = {
      title: this.title,
      tranches: tranches
    }
    this.mixService.saveMix(localStorage.getItem('token'), mixageTable)
      .pipe()
      .subscribe((data: any) => {
        this.toaster.success(data.message);
      },
        err => {
          this.toaster.warning(err.error.message);
        });
  }
}
