import {Component, Input, OnChanges, OnInit, SimpleChange} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {ScoreService} from "../../../services/score.service";
import {DataSet} from "../../../model/DataSet";

@Component({
  selector: 'app-score-search',
  templateUrl: './score-search.component.html',
  styleUrls: ['./score-search.component.css']
})
export class ScoreSearchComponent implements OnInit, OnChanges {

  constructor(private scoreService: ScoreService) { }

  @Input() dataset: DataSet;

  ngOnInit() {


  }

    ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
        let log: string[] = [];
        for (let propName in changes) {
            if(propName=="dataset"){
                if(null!=changes[propName].currentValue){
                    this.views=this.dataset.viewsCount;
                    this.citations=this.dataset.citationsCount;
                    this.reanalysis=this.dataset.reanalysisCount;
                    this.connections=this.dataset.connectionsCount;
                }
            }
        }
    }

views=0;
citations=0;
reanalysis=0;
connections=0;

}
