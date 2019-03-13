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

    watchedDatasets: Map<string, WatchedDataset>;

    selectedDatasets: Map<string, DataSetShort>;

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
                this.profileService.getWatchedDatasets(this.profile.userId).subscribe( watches => {
                    this.watchedDatasets = new Map<string, WatchedDataset> ();
                    watches.forEach(watch => {
                        this.watchedDatasets.set(watch.source + watch.accession, watch);
                    })
                });
                this.profileService.getSelected(this.profile.userId).subscribe(datasets => {
                    this.selectedDatasets = new Map<string, DataSetShort> ();
                    datasets.forEach(dataset => {
                        this.selectedDatasets.set(dataset.source + dataset.id, dataset);
                    })
                });
            } else {
                this.watchedDatasets = new Map<string, WatchedDataset> ();
                this.selectedDatasets = new Map<string, DataSetShort> ();
            }
        });
    }

    isDatasetSelected(accession: string, repository: string): boolean {
        return this.selectedDatasets.get(repository + accession) != null;
    }

    toggleDataset(datasetShort: DataSetShort) {
        if (this.isDatasetSelected(datasetShort.id, datasetShort.source)) {
            this.selectedDatasets.delete(datasetShort.source + datasetShort.id);
        } else {
            this.selectedDatasets.set(datasetShort.source + datasetShort.id, datasetShort);
        }
        this.profileService.setSelected(this.profile.userId, Array.from(this.selectedDatasets.values())).subscribe(x => {});
        this.dataTransporterService.fire(this.selectedChannel, Array.from(this.selectedDatasets.values()));
        this.notificationService.success('Selection saved', 'in your dashboard', {timeOut: 1500});
    }
}
