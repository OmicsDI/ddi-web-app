import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataControl} from 'model/DataControl';

@Component({
    selector: 'app-search-pager',
    templateUrl: './search-pager.component.html',
    styleUrls: ['./search-pager.component.css']
})
export class SearchPagerComponent implements OnInit {

    @Input()
    totalResults: number;

    @Output()
    dataControlChange = new EventEmitter<DataControl>();

    @Input()
    dataControl: DataControl;

    loading = true;
    pageSizes = ['10', '20', '30', '50', '100'];
    Math: Math = Math;

    constructor() {
    }

    ngOnInit() {
        this.loading = true;
    }

    getPage(page: number) {
        this.dataControl.page = page;
        this.dataControlChange.emit(this.dataControl);
        this.loading = true;
    }

    sortOrderChanged(sortOrder: boolean) {
        this.dataControl.order = sortOrder;
        this.dataControlChange.emit(this.dataControl);
        this.loading = true;
    }

    pageSizeChanged(pageSize: number) {
        this.dataControl.pageSize = pageSize;
        this.dataControlChange.emit(this.dataControl);
        this.loading = true;
    }

    sortByChanged(value) {
        this.dataControl.sortBy = value;
        this.dataControlChange.emit(this.dataControl);
        this.loading = true;
    }
}
