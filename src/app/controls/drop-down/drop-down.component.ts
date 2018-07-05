import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FacetValue} from 'model/FacetValue';

@Component({
    selector: 'app-drop-down',
    templateUrl: './drop-down.component.html',
    styleUrls: ['./drop-down.component.css']
})
export class DropDownComponent implements OnInit {

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
