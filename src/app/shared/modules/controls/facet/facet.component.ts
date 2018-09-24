import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FacetValue} from 'model/FacetValue';

class FacetValueFiltered extends FacetValue {

    visible = true;
    checked = false;

    constructor(x: FacetValue) {
        super();
        this.value = x.value;
        this.label = x.label;
        this.count = x.count;
    }
}


@Component({
    selector: 'app-facet',
    templateUrl: './facet.component.html',
    styleUrls: ['./facet.component.css']
})

export class FacetComponent implements OnInit {

    @Input() label: string;
    @Input() facetValues: FacetValue[];
    @Input() id: string;
    @Output() facetValueSelected: EventEmitter<string> = new EventEmitter<string>();
    @Output() facetValueRemoved: EventEmitter<string> = new EventEmitter<string>();

    @ViewChild('searchInput') searchInput: ElementRef;

    facetValuesFiltered: FacetValueFiltered[];

    @Input()
    facetSelected: string[];

    constructor() {
    }

    ngOnInit() {
        this.facetValuesFiltered = this.facetValues.map(x => new FacetValueFiltered(x));
        this.facetSelected = (this.facetSelected !== undefined) ? this.facetSelected : [];
    }

    checkBoxClicked(value: string, event) {
        this.labelClicked(value, event, event.target.checked);
    }

    labelClicked(value: string, event, isCheckboxChecked: boolean) {
        if (!isCheckboxChecked) {
            this.facetValueRemoved.emit(value);
        } else {
            this.facetValueSelected.emit(value);
        }
    }

    searchByName() {
        const lowerVal = this.searchInput.nativeElement.value.toLowerCase();
        for (const v of this.facetValuesFiltered) {
            v.visible = ((v.value.toLowerCase().indexOf(lowerVal) >= 0) || (v.label.toLowerCase().indexOf(lowerVal) >= 0));
        }
    }

    isChecked(value: string): boolean {
        if (this.facetSelected === undefined) {
            return false;
        }
        return this.facetSelected.indexOf(value) > -1;
    }
}
