import {Component, OnInit} from '@angular/core';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import {SearchService} from '@shared/services/search.service';
import {DataControl} from 'model/DataControl';
import {DataTransportService} from '@shared/services/data.transport.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    widgets = {};
    dataControl = new DataControl();
    facetsChannel = 'facet_channel';

    constructor(private loadingBarService: SlimLoadingBarService, private searchService: SearchService
                , private dataTransportService: DataTransportService) {
        this.loadingBarService.start();
    }

    ngOnInit() {
    }

    widgetRegister(partName: string): void {
        this.widgets[partName] = false;
    }

    widgetLoaded($partName): void {
        this.widgets[$partName] = true;
        for (const item in this.widgets) {
            if (!this.widgets[item]) {
                return;
            }
        }
        this.loadingBarService.complete();
        this.loadFacetForAdvancedSearch();
    }

    private loadFacetForAdvancedSearch() {
        this.searchService.fullSearch('', this.dataControl.page, this.dataControl.pageSize, this.dataControl.sortBy,
            this.dataControl.order)
            .subscribe(result => {
                this.dataTransportService.fire(this.facetsChannel, result.facets);
            });
    }
}
