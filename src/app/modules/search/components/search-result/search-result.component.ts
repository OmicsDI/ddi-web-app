import {Component, Input, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';
import {SearchResult} from 'model/SearchResult';
import {MatDialog, MatDialogRef} from '@angular/material';
import {DataSetService} from '@shared/services/dataset.service';
import {CitationDialogComponent} from '@shared/modules/controls/citation-dialog/citation-dialog.component';
import {DataControl} from 'model/DataControl';
import {DatabaseListService} from '@shared/services/database-list.service';
import {Database} from 'model/Database';
import {Profile} from 'model/Profile';
import {WatchedDataset} from 'model/WatchedDataset';
import {ProfileService} from '@shared/services/profile.service';

@Component({
    selector: 'app-search-result',
    templateUrl: './search-result.component.html',
    styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

    @Input()
    searchResult: SearchResult;

    @Input()
    totalResults: number;

    @Input()
    dataControl: DataControl;

    @Input()
    databases: Database[];

    @Input()
    profile: Profile;

    watchedDatasets: WatchedDataset[];

    constructor(private dataSetService: DataSetService,
                private dialog: MatDialog,
                private profileService: ProfileService) {
    }

    ngOnInit() {
        this.profileService.getWatchedDatasets(this.profile.userId).subscribe( x => {
            this.watchedDatasets = x;
        });
    }

    citation(source, id) {
        let dialogRef: MatDialogRef<CitationDialogComponent>;

        this.dataSetService.getDataSetDetail(id, source).subscribe(
            x => {
                dialogRef = this.dialog.open(CitationDialogComponent);
                dialogRef.componentInstance.title = 'Dataset citation';
                dialogRef.componentInstance.datasetDetail = x;
                return dialogRef.afterClosed();
            }
        );
    }


}
