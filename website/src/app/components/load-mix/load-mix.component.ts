import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MixInterface } from 'src/app/interfaces/mix.interface';
import { MixageTableInterface } from 'src/app/interfaces/mixageTable.interface';
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
  token: string;
  constructor(private mixService: MixService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.mixService.getAllMix(this.token)
        .pipe()
        .subscribe((data: MixType) => {
          this.loadMix = data.mix;
          this.loadMixLen = this.loadMix.length
        })
    } else {
      this.toastr.error('You have to be connected')
      this.router.navigate['/'];
    }
  }

  load(title: string): void {
    localStorage.setItem('title', title);
    this.router.navigateByUrl('/radio-mix')
  }

}
