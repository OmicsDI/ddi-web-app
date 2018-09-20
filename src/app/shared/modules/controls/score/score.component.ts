import {Component, Input, OnChanges, OnInit, SimpleChange} from '@angular/core';
import {DataSet} from 'model/DataSet';

@Component({
    selector: 'app-score',
    templateUrl: './score.component.html',
    styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {

    views = 0;
    citations = 0;
    reanalysis = 0;
    connections = 0;

    @Input() dataset: DataSet;

    constructor() {
    }

    ngOnInit() {
    }

    getData() {
        return [
            {
                'order': 1,
                'score': this.dataset.viewsCount,
                'weight': 1,
                'color': '#337ab7',
                'label': 'Views'
            },
            {
                'order': 1,
                'score': this.dataset.connectionsCount,
                'weight': 1,
                'color': '#C93029',
                'label': 'Connections'
            },
            {
                'order': 2,
                'score': this.dataset.citationsCount,
                'weight': 1,
                'color': '#5cb85c',
                'label': 'Citations'
            },
            {
                'order': 3,
                'score': this.dataset.reanalysisCount,
                'weight': 1,
                'color': '#f0ad4e',
                'label': 'Reanalyses'
            }
        ]
    }
}
