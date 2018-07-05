import {AfterViewChecked, Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {DataSet} from 'model/DataSet';
import {SearchService} from 'services/search.service';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import {SearchResult} from 'model/SearchResult';
import {AppConfig} from 'app/app.config';
import {ProfileService} from 'services/profile.service';
import {SelectedService} from 'services/selected.service';
import {MatDialog, MatDialogRef} from '@angular/material';
import {DataSetService} from 'services/dataset.service';
import {Router} from '@angular/router';
import {NotificationsService} from 'angular2-notifications/dist';
import {DatabaseListService} from 'services/database-list.service';
import {CitationDialogSearchComponent} from 'search/citation-dialog-search/citation-dialog-search.component';

@Component({
    selector: 'app-search-result',
    templateUrl: './search-result.component.html',
    styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit, OnDestroy, AfterViewChecked {
    subscription: Subscription;
    result: Observable<SearchResult>;
    datasets: Observable<DataSet[]>;

    p = 1;
    total: number;
    loading: boolean;

    constructor(private appConfig: AppConfig
        , private searchService: SearchService
        , private slimLoadingBarService: SlimLoadingBarService
        , private profileService: ProfileService
        , private selectedService: SelectedService
        , private dataSetService: DataSetService
        , private dialog: MatDialog
        , private router: Router
        , private notificationService: NotificationsService
        , private databaseListServce: DatabaseListService) {

        console.log('SearchResultComponent ctor');
        this.slimLoadingBarService.start();

        this.datasets = this.searchService.searchResult$.map(x => x.datasets);
    }

    ngOnInit() {
        console.log('ngOnInit');
        this.subscription = this.searchService.searchResult$.subscribe(
            searchResult => {
                this.total = searchResult.count;
                this.slimLoadingBarService.complete();
                console.log('search result observed:' + String(searchResult.count));
            });
        console.log('getting profile');
        this.profileService.getProfile();
    }

    ngOnDestroy() {
        console.log('ngOnDestroy');
        this.subscription.unsubscribe();
    }


    ngAfterViewChecked() {
        // this.slimLoadingBarService.complete();
        // console.log("search-result.ngAfterViewChecked");
    }

    /*
    omicsTest(d:DataSet, omics:string):boolean{
      if(d == null)
        return false;

      if(d.omicsType == null)
        return false;

      return (d.omicsType.indexOf(omics) !== -1);
    }*/

    clicked(source: string, id: string) {
        // console.log(`clicked ${source} ${id}`);
        this.selectedService.select(source, id);
    }

    toggle(source: string, id: string) {
        this.selectedService.toggle(source, id);
        console.log(`toggle ${source} ${id}`);
    }

    citeClicked($event, source, id) {
        this.citation(source, id);
        $event.stopPropagation();
        $event.preventDefault();
    }

    selectClicked($event, source, id) {
        this.toggle(source, id);
        $event.stopPropagation();
        $event.preventDefault();
    }

    citation(source, id) {
        let dialogRef: MatDialogRef<CitationDialogSearchComponent>;

        this.dataSetService.getDataSetDetail_private(id, source).subscribe(
            x => {
                dialogRef = this.dialog.open(CitationDialogSearchComponent);
                dialogRef.componentInstance.title = 'Dataset citation';
                dialogRef.componentInstance.datasetDetail = x;
                return dialogRef.afterClosed();
            }
        );
    }


}
