import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import Pizzicato from 'pizzicato'
import Wad from 'web-audio-daw';
@Component({
  selector: 'app-radio-mix',
  templateUrl: './radio-mix.component.html',
  styleUrls: ['./radio-mix.component.scss']
})
export class RadioMixComponent implements OnInit {
  tranche: string[] = [];
  songs = new FormControl();
  songList: string[] = [];
  selected = "Song";
  // sound part
  voice: any;
  volumeValue: number = 10;
  constructor() { }

  ngOnInit(): void {
    this.tranche.push('1');
    this.tranche.push('2');
    this.tranche.push('3');
    this.tranche.push('4');
    this.tranche.push('5');
    this.tranche.push('6');
    this.songList = ['Paradis - Booba', 'OKLM - Booba', 'Boubli - Booba', 'Bouchon de liege - Kaaris']
    this.voice = new Pizzicato.Sound({
      source: 'input',
      options: { volume: 0.8 }
    });
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
  setVolume(value: number) {
    this.voice.setVolume(value);
  }
  activeMic() {
    if (!this.voice) {
      this.voice = new Wad({
        source: 'mic'
      });
    }
    // You must give your browser permission to use your microphone before calling play().
    this.voice.play()
  }

  deactivateMic() {
    if (!this.voice) {
      this.voice = new Wad({
        source: 'mic'
      });
    }
    this.voice.stop();
  }

  
}
