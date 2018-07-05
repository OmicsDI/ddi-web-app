import {Component, Input, OnInit} from '@angular/core';
import {Section} from 'model/EnrichmentInfo/Section';

@Component({
    selector: 'app-annotated-text-dataset',
    templateUrl: './annotated-text-dataset.component.html',
    styleUrls: ['./annotated-text-dataset.component.css']
})
export class AnnotatedTextDatasetComponent implements OnInit {

    @Input() text: string;
    @Input() sections: Section[];

    constructor() {
    }

    ngOnInit() {
    }

}
