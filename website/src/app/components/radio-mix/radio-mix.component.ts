import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import Pizzicato from 'pizzicato'
import { SongService } from '../../services/song.service';
import { Tranche } from '../../interfaces/tranche.interface'
import { MatSliderChange } from '@angular/material/slider';
import { SongList } from '../../types/songList.type'
import { SongElement } from '../../types/songElement.type'
import { MixService } from 'src/app/services/mix.service';
@Component({
  selector: 'app-radio-mix',
  templateUrl: './radio-mix.component.html',
  styleUrls: ['./radio-mix.component.scss']
})
export class RadioMixComponent implements OnInit ,OnDestroy {
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
  constructor(private songService: SongService, private mixService:MixService) {

  }

  ngOnInit(): void {
    this.title = localStorage.getItem('title');
    this.trancheByDefault(Number(localStorage.getItem('nbPiste')) || 6 );
    this.songList;
    this.micTranche = {
      id: -1,
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
      audioGroup: new Pizzicato.Group(),
      asEffect: false,
      audioSong: null,
      lastMute: false
    };
    this.activeMic();
    this.getSongs();
  }
  //know props begin
  marks: any =
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
  labels: any =
    {
      offset: '88%',
      step: 10,
      visible: true
    };
  progressBar: any =
    {
      size: '70%',
      offset: '0%',
      background: {
        stroke: '#373636', strokeWidth: 1, fill: { color: '#a7a7a7', gradientType: "linear", gradientStops: [[0, 1], [50, 0.5], [100, 1]] }
      }
    };
  pointer: any =
    {
      type: 'circle', style: { fill: { color: '#a4a3a3', gradientType: "linear", gradientStops: [[0, 0.5], [50, 0.6], [100, 1]] }, stroke: '#333' },
      size: '10%', offset: '50%'
    };


  ngOnDestroy(){
    this.micTranche.audioGroup.stop();
    this.micTranche.audioGroup=null;
    this.tranche.map((item,index) => {
      item.audioGroup.stop();
      item.audioGroup=null
    })
  }


  trancheByDefault(numberOfTranche: number): void {
    if (!numberOfTranche) {
      numberOfTranche = 6
    }

    for (let i = 1; i <= numberOfTranche; i++) {
      this.tranche.push({
        id: i,
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
        lastMute: false,
        audioSong: null
        

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
      lastMute: false


    });
  }


  setVolume(idTranche: number): void {
    if (!this.tranche[idTranche].mute) {
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
    this.tranche[idTranche].equalizer.highGain = event.args.value / 100;
    this.tranche[idTranche].equalizerEffect = new Pizzicato.Effects.Quadrafuzz(this.tranche[idTranche].equalizer)
    this.tranche[idTranche].audioGroup.addEffect(this.tranche[idTranche].equalizerEffect);
    this.tranche[idTranche].asEffect = true;
    this.tranche[idTranche].audioGroup.volume = this.tranche[idTranche].volume - this.tranche[idTranche].equalizer.highGain;
  }


  setMedium(idTranche: number, event: any): void {
    if (this.tranche[idTranche].asEffect) {
      this.tranche[idTranche].audioGroup.removeEffect(this.tranche[idTranche].equalizerEffect);
      this.tranche[idTranche].asEffect = false;
    }
    this.tranche[idTranche].equalizer.midHighGain = event.args.value / 100;
    this.tranche[idTranche].equalizer.midLowGain = event.args.value / 100;
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
    this.tranche[idTranche].equalizer.lowGain = event.args.value / 100;
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


  micOn(): void {
    if (this.micTranche.solo && this.micTranche.mute) {
      this.micTranche.audioGroup.volume = this.micTranche.volume / 10;
    }
    this.micTranche.audioGroup.volume = this.micTranche.volume / 10;
    this.tranche.map(x => {
      this.onMute(x.id - 1);
    })
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
      this.micTranche.audioGroup.volume = this.micTranche.volume;
      this.micTranche.audioGroup.play();
    });
  }


  deactivateMic(): void {
    this.micTranche.audioGroup.stop();
  }


  play(idTranche: number, url: string): void {
    this.tranche[idTranche].audioGroup.stop()
    this.tranche[idTranche].audioGroup = new Pizzicato.Group()
    this.tranche[idTranche].audioGroup.addSound(new Pizzicato.Sound(
      url, () => {
          this.tranche[idTranche].equalizerEffect = new Pizzicato.Effects.Quadrafuzz(this.tranche[idTranche].equalizer);
          this.tranche[idTranche].audioGroup.addEffect(this.tranche[idTranche].equalizerEffect);
          this.tranche[idTranche].panEffect = new Pizzicato.Effects.StereoPanner(this.tranche[idTranche].panStereo);
          this.tranche[idTranche].audioGroup.addEffect(this.tranche[idTranche].panEffect);
          this.tranche[idTranche].audioSong = new Pizzicato.Sound(url);
        this.tranche[idTranche].audioGroup.volume = this.tranche[idTranche].volume /10;
        this.tranche[idTranche].audioGroup.play()
      }));
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
    this.tranche[idTranche].audioGroup.volume = this.tranche[idTranche].volume / 10;
    this.tranche[idTranche].mute = false;

  }


  onSolo(idTranche: number): void {
    // if (this.tranche[idTranche].solo && this.tranche[idTranche].mute) {
    //   this.unMute(idTranche);
    // }
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
      x.lastMute = x.mute
      if (!x.solo && x.id - 1 !== idTranche && !x.solo) {
        this.mute(x.id - 1);
      }
    })
    this.tranche[idTranche].solo = true;
    this.soloAll++;
  }


  unSolo(idTranche: number): void {
    if(this.soloAll <= 1  ) {
      this.tranche.map(x => {
        console.log(x)
        if (!x.solo && x.id - 1 !== idTranche && !x.lastMute){
          this.unMute(x.id-1);
        }
      });
    }
    if(this.tranche[idTranche].mute) {
      this.tranche[idTranche].audioGroup.volume =0;
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
}
