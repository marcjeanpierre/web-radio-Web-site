import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MixInterface } from 'src/app/interfaces/mix.interface';
import { MixService } from 'src/app/services/mix.service';
import { MixType } from 'src/app/types/mix.type';

@Component({
  selector: 'app-load-mix',
  templateUrl: './load-mix.component.html',
  styleUrls: ['./load-mix.component.scss']
})
export class LoadMixComponent implements OnInit {
  loadMix: Array<MixInterface>;
  loadMixLen: number = 0
  constructor(private mixService:MixService, private router: Router) { }

  ngOnInit(): void {
    this.mixService.loadMix(localStorage.getItem('token'))
    .pipe()
    .subscribe((data: MixType)=> {
      this.loadMix = data.mix;
      this.loadMixLen = this.loadMix.length
    })
  }

  load(title: string, nbPiste: number): void {
    localStorage.setItem('title', title);
    localStorage.setItem('nbPiste', nbPiste.toString());
    this.router.navigateByUrl('/radio-mix')
  }

}
