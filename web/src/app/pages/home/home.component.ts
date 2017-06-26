import { Component, OnInit } from '@angular/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

import { HotwordsComponent } from './charts/hotwords/hotwords.component';
import { TissuesOrganismsComponent } from './charts/tissues-organisms/tissues-organisms.component';
import { ReposOmicsComponent } from './charts/repos-omics/repos-omics.component';
import {SearchService} from "../../services/search.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoaded = {
    hotwords: false,
    tissues: false,
    repos_omics: false,
    latest_datasets: false,
    most_accessed: false,
    annual_omicstype: false,
    tweet_news: false,
    statistics: false
  }

  constructor(private loadingBarService: SlimLoadingBarService, private searchService: SearchService) {
    this.loadingBarService.start();
  }

  ngOnInit() {
    this.searchService.callSearch("*:*");
  }

  loadOnePart($partName): void {

    this.isLoaded[$partName] = true;

    for(let item in this.isLoaded) {
      if (!this.isLoaded[item]) return;
    }
    this.loadingBarService.complete();
  }

  submitTestQuery(){
    alert("submitted");
  }

}
