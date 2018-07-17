import {Component, Input, OnInit} from '@angular/core';
import {Section} from 'model/enrichment-info/Section';

@Component({
    selector: 'app-annotated-text',
    templateUrl: './annotated-text.component.html',
    styleUrls: ['./annotated-text.component.css']
})
export class AnnotatedTextComponent implements OnInit {

    @Input() text: string;
    @Input() sections: Section[];

    constructor() {
    }

    ngOnInit() {
    }

}
