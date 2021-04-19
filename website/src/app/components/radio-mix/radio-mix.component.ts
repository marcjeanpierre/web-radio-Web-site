import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SongService } from '../../services/song.service';
import { SongInterface } from '../../types/song.types'

@Component({
  selector: 'app-radio-mix',
  templateUrl: './radio-mix.component.html',
  styleUrls: ['./radio-mix.component.scss']
})
export class RadioMixComponent implements OnInit {
  tranche: string[] = [];
  songs = new FormControl();
  songList:SongInterface[] = [];
  selected = "Song";
  constructor(private songService: SongService) { }

  ngOnInit(): void {
  this.tranche.push('1');
  this.tranche.push('2');
  this.tranche.push('3');
  this.tranche.push('4');
  this.tranche.push('5');
  this.tranche.push('6');
  // this.songList = ['Paradis - Booba', 'OKLM - Booba', 'Boubli - Booba', 'Bouchon de liege - Kaaris'];
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
//know props stop
addTranche() {
  this.tranche.push('new');
}

public addBook(): void {
  this.songService.getSongUrl("gs://web-radio-271a1.appspot.com/RATPI WORLD")
  .then(url => {
    this.playAudio(url);
  })
}

playAudio(url: string){
  let audio = new Audio();
  audio.src = url;
  audio.load();
  audio.play();
  setTimeout(() => 
  {
      audio.pause();
  },
  5000);
}
}
