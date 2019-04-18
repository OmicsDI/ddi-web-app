import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FacetValue} from 'model/FacetValue';
import {Rule, SearchQuery} from 'model/SearchQuery';

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
    @Input() searchQuery: SearchQuery;
    @Output() searchQueryChange = new EventEmitter<SearchQuery>();

    @ViewChild('searchInput') searchInput: ElementRef;

    facetValuesFiltered: FacetValueFiltered[];

    @Input()
    facetSelected: Rule[];

    constructor() {
    }

    ngOnInit() {
        this.facetValuesFiltered = this.facetValues.map(x => new FacetValueFiltered(x));
    }

    checkBoxClicked(value: string, event) {
        this.labelClicked(value, event, event.target.checked);
    }

    labelClicked(value: string, event, isCheckboxChecked: boolean) {
        for (let i = 0; i < this.facetSelected.length; i++) {
            const index = this.facetSelected[i].data.indexOf(value);
            if (index > -1) {
                this.facetSelected[i].data.splice(index, 1);
                if (this.facetSelected[i].data.length === 0) {
                    const ruleIndex = this.searchQuery.rules.indexOf(this.facetSelected[i]);
                    if (ruleIndex > -1) {
                        this.searchQuery.rules.splice(ruleIndex, 1);
                    }
                    this.facetSelected.splice(i, 1);
                }
                this.searchQueryChange.emit(this.searchQuery);
                return;
            }
        }

        if (isCheckboxChecked) {
            for (let i = 0; i < this.facetSelected.length; i++) {
                if (this.facetSelected[i].condition === 'oneOf') {
                    this.facetSelected[i].data.push(value);
                    this.searchQueryChange.emit(this.searchQuery);
                    return;
                } else if (this.facetSelected[i].condition === 'equal' && this.facetSelected[i].data.length === 1) {
                    this.facetSelected[i].data.push(value);
                    this.facetSelected[i].condition = 'oneOf';
                    this.searchQueryChange.emit(this.searchQuery);
                    return;
                }
            }
            const rule = new Rule();
            rule.condition = 'oneOf';
            rule.field = this.id;
            rule.data = [value];
            this.searchQuery.rules.push(rule);
            this.searchQueryChange.emit(this.searchQuery);
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
        for (let i = 0; i < this.facetSelected.length; i++) {
            for (let j = 0; j < this.facetSelected[i].data.length; j++) {
                if (this.facetSelected[i].data[j] === value) {
                    return true;
                }
            }
        }
        return false;
    }
}
