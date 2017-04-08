import { Component, OnInit } from '@angular/core';

import { HotwordsComponent } from './charts/hotwords/hotwords.component';
import { ReposOmicsComponent } from './charts/repos-omics/repos-omics.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
