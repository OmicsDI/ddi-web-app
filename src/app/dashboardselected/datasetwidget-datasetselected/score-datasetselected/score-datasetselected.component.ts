import {Component, Input, OnChanges, OnInit, SimpleChange} from '@angular/core';
import {DataSet} from 'model/DataSet';

@Component({
    selector: 'app-score-datasetselected',
    templateUrl: './score-datasetselected.component.html',
    styleUrls: ['./score-datasetselected.component.css']
})
export class ScoreDatasetselectedComponent implements OnInit, OnChanges {

    views = 0;
    citations = 0;
    reanalysis = 0;
    connections = 0;

    @Input() dataset: DataSet;

    constructor() {
    }

    ngOnInit() {


    }

    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        for (const propName in changes) {
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
