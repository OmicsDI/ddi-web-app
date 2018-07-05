import {Component, Input, OnChanges, OnInit, SimpleChange} from '@angular/core';
import {DataSet} from 'model/DataSet';
import {ScoreService} from 'services/score.service';

@Component({
    selector: 'app-score-dataset',
    templateUrl: './score-dataset.component.html',
    styleUrls: ['./score-dataset.component.css']
})
export class ScoreDatasetComponent implements OnInit, OnChanges {

    @Input() dataset: DataSet;
    views = 0;
    citations = 0;
    reanalysis = 0;
    connections = 0;

    constructor(private scoreService: ScoreService) {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        const log: string[] = [];
        for (const propName of Object.keys(changes)) {
            if (propName === 'dataset') {
                if (null != changes[propName].currentValue) {
                    this.views = this.dataset.viewsCount;
                    this.citations = this.dataset.citationsCount;
                    this.reanalysis = this.dataset.reanalysisCount;
                    this.connections = this.dataset.connectionsCount;
                }
            }
        }
    }
}
