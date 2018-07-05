import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FacetValue} from 'model/FacetValue';

@Component({
    selector: 'app-drop-down-search',
    templateUrl: './drop-down-search.component.html',
    styleUrls: ['./drop-down-search.component.css']
})
export class DropDownSearchComponent implements OnInit {

    adv_show = false;
    placeValue = '--click to input--';

    @Input() value: string;
    @Output() valueChange: EventEmitter<string>;

    @Input() facetValues: FacetValue[];

    constructor() {
        this.valueChange = new EventEmitter<string>();
    }

    ngOnInit() {
    }

    setRuleData(facet: FacetValue) {
        this.value = facet.value;
        this.valueChange.emit(this.value);
    }


}
