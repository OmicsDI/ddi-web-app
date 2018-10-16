import {Component, Input, OnInit} from '@angular/core';
import {SearchResult} from 'model/SearchResult';
import {MatDialog, MatDialogRef} from '@angular/material';
import {DataSetService} from '@shared/services/dataset.service';
import {CitationDialogComponent} from '@shared/modules/controls/citation-dialog/citation-dialog.component';
import {DataControl} from 'model/DataControl';
import {Database} from 'model/Database';
import {Profile} from 'model/Profile';
import {WatchedDataset} from 'model/WatchedDataset';
import {ProfileService} from '@shared/services/profile.service';
import {DataSetShort} from 'model/DataSetShort';
import {DataTransportService} from '@shared/services/data.transport.service';
import {NotificationsService} from 'angular2-notifications';
import {AuthService} from '@shared/services/auth.service';

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

    selectedDatasets: DataSetShort[];

    selectedChannel: 'selected_channel';

    constructor(private dataSetService: DataSetService,
                private dialog: MatDialog,
                private authService: AuthService,
                private dataTransporterService: DataTransportService,
                private notificationService: NotificationsService,
                private profileService: ProfileService) {
    }

    ngOnInit() {
        this.authService.loggedIn().then(isLogged => {
            if (isLogged) {
                this.profileService.getWatchedDatasets(this.profile.userId).subscribe( x => {
                    this.watchedDatasets = x;
                });
                this.profileService.getSelected(this.profile.userId).subscribe(datasets => {
                    this.selectedDatasets = datasets;
                });
            } else {
                this.watchedDatasets = [];
                this.selectedDatasets = [];
            }
        });
    }

    isDatasetSelected(accession: string, repository: string): boolean {
        const i: number = this.selectedDatasets.findIndex(x => x.id === accession && x.source === repository);
        return (i > -1);
    }

    toggleDataset(datasetShort: DataSetShort) {
        if (this.isDatasetSelected(datasetShort.id, datasetShort.source)) {
            const i = this.selectedDatasets.findIndex(x => x.id === datasetShort.id && x.source === datasetShort.source);
            this.selectedDatasets.splice(i, 1);
        } else {
            this.selectedDatasets.push(datasetShort);
        }
        this.profileService.setSelected(this.profile.userId, this.selectedDatasets).subscribe(x => {});
        this.dataTransporterService.fire(this.selectedChannel, this.selectedDatasets);
        this.notificationService.success('Selection saved', 'in your dashboard', {timeOut: 1500});
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
