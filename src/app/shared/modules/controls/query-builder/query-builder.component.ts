import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FacetValue} from 'model/FacetValue';
import {SearchQuery} from 'model/SearchQuery';
import {DataTransportService} from '@shared/services/data.transport.service';
import {Facet} from 'model/Facet';
import {ArrayUtils} from '@shared/utils/array-utils';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-query-builder',
    templateUrl: './query-builder.component.html',
    styleUrls: ['./query-builder.component.css']
})
export class QueryBuilderComponent implements OnInit, OnDestroy {

    hideBasicInfo: boolean;

    facetsChannel = 'facet_channel';

    operators = [
        {name: 'AND'},
        {name: 'OR'},
        {name: 'NOT'}
    ];

    conditions = [
        {name: 'equal'}
        // { name: 'not' },
    ];

    @Input() parent: QueryBuilderComponent;
    @Input() index: number;

    @Output() queryChange = new EventEmitter<SearchQuery>();

    @Input() searchQuery: SearchQuery;

    private subscription: Subscription;

    allFacets: Facet[] = [];

    constructor(private dataTransportService: DataTransportService) {
    }

    ngOnInit() {
        if (this.parent) {
            this.allFacets = this.parent.allFacets;
        }
        this.subscription = this.dataTransportService.listen(this.facetsChannel).subscribe((m: Facet[]) => {
            this.allFacets = m;
            const star = new Facet();
            star.id = 'all_fields';
            star.label = 'All';
            star.facetValues = [];
            this.allFacets = ArrayUtils.prepend(star, this.allFacets);
        });
    }

    capitalize = function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    public notify() {
        this.queryChange.emit(this.searchQuery);
        if (this.parent) {
            this.parent.notify();
        }
    }

    addCondition() {
        this.hideBasicInfo = false;
        if (null == this.searchQuery.rules) {
            this.searchQuery.rules = [];
        }
        this.searchQuery.rules.push({
            condition: 'equal',
            field: 'all_fields',
            data: '',
            data2: null,
            query: null
        });
        this.notify();
    };

    removeCondition(index) {
        this.searchQuery.rules.splice(index, 1);
        this.notify();
    };

    addGroup() {
        this.hideBasicInfo = false;
        if (null == this.searchQuery.rules) {
            this.searchQuery.rules = [];
        }

        const q: SearchQuery = new SearchQuery();
        q.operator = 'AND';
        q.rules = [];

        this.searchQuery.rules.push({
            query: q,
            condition: null,
            field: null,
            data: null,
            data2: null
        });
        this.notify();
    };

    selectField(rule) {
        if (rule !== undefined) {
            if (rule.field === 'publication_date') {
                this.conditions.push({name: 'range'});
            } else if (this.conditions.length > 1) {
                this.conditions.pop();
            }
            this.clearData(rule);
        }
        this.notify();
    };

    clearData(rule) {
        rule.data = '';
        rule.data2 = '';
        this.notify();
    };

    removeGroup() {
        this.parent.removeGroupByIndex(this.index);
        this.queryChange.emit(this.searchQuery);
    };

    removeGroupByIndex(index: number) {
        this.searchQuery.rules.splice(index, 1);
        this.notify();
    }

    getFieldsData(field: string): FacetValue[] {
        return this.getAllFacetValues(field);
    }

    dropDownValueChange() {
        this.notify();
    }

    getAllFacetValues(facet: string): FacetValue[] {
        let result: FacetValue[];
        result = [];
        if (null == this.allFacets) {
            const v: FacetValue = new FacetValue();
            v.label = 'label1';
            v.value = 'value1';
            result.push(v);
        } else {
            for (const f of this.allFacets) {
                if (f.id === facet) {
                    for (const w of f.facetValues) {
                        const v: FacetValue = new FacetValue();
                        v.label = w.label;
                        v.value = w.value;
                        result.push(v);
                    }
                }
            }
        }
        return result;
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}

