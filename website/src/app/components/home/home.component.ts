import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acceuil',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  Title = '';
  Artist = '';
  Album = '';
  Genre = '';
  Year = '';
  constructor() { }

  ngOnInit(): void {
  }

}
