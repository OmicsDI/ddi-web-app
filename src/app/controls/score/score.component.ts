import {Component, Input, OnInit} from '@angular/core';
import {ScoreService} from "../../services/score.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {

  constructor(private scoreService: ScoreService) { }

  @Input() accession: string;
  @Input() source: string;

  ngOnInit() {

    Observable.forkJoin(
         [ this.scoreService.getViews(this.source,this.accession),
           this.scoreService.getCitations(this.source,this.accession),
           this.scoreService.getReanalysis(this.source,this.accession),
           this.scoreService.getConnections(this.source,this.accession)]
    ).subscribe(
        data => {
          console.log("subscription to forkJoin");

          this.views = data[0];
          this.citations = data[1];
          this.reanalysis = data[2];
          this.connections = data[3];

          /* this.citations = data[0];
            this.connections = data[1]; */
        }
    )
    console.log("scores retrieved from REST");

  }

views=0;
citations=0;
reanalysis=0;
connections=0;

}
