import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataSet} from 'model/DataSet';
import {AppConfig} from 'app/app.config';
import {ProfileService} from '@shared/services/profile.service';
import {DatabaseListService} from '@shared/services/database-list.service';
import {DataSetShort} from 'model/DataSetShort';
import {WatchedDataset} from 'model/WatchedDataset';
import {NotificationsService} from 'angular2-notifications/dist';
import {Router} from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material';
import {DataSetService} from '@shared/services/dataset.service';
import {CitationDialogComponent} from '@shared/modules/controls/citation-dialog/citation-dialog.component';
import {LogService} from '@shared/modules/logs/services/log.service';
import {Database} from 'model/Database';
import {Profile} from 'model/Profile';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'app-datasetwidget',
    templateUrl: './datasetwidget.component.html',
    styleUrls: ['./datasetwidget.component.css']
})
export class DatasetWidgetComponent implements OnInit {

    @Input() d: DataSet;
    @Input() allowSelect = true;
    @Output() buttonClicked = new EventEmitter<any>();
    @Output() toggleDataset = new EventEmitter<DataSetShort>();
    @Input() allowDelete = true;
    @Input() allowClaim = true;
    @Input() allowWatch = true;
    @Input() databases: Database[];
    @Input() profile: Profile;
    @Input() watchedDatasets: WatchedDataset[] = [];
    @Input() observableDataset: Observable<DataSet>;
    @Input() isSelected = false;

    constructor(public appConfig: AppConfig,
                public profileService: ProfileService,
                private databaseListServce: DatabaseListService,
                private router: Router,
                private notificationService: NotificationsService,
                private dataSetService: DataSetService,
                private logger: LogService,
                private dialog: MatDialog) {
    }

    ngOnInit() {
        if (this.observableDataset) {
            this.observableDataset.subscribe(dataset => {
                this.d = dataset;
            });
        }
    }

    getDatabaseUrl(source) {
        const db = this.databaseListServce.getDatabaseBySource(source, this.databases);
        if (db) {
            return db.sourceUrl;
        }
    }

    getDatabaseTitle(source) {
        const db = this.databaseListServce.getDatabaseBySource(source, this.databases);
        if (db) {
            return db.databaseName;
        }
    }

    citeClicked($event, source, id) {
        this.citation(source, id);
        $event.stopPropagation();
        $event.preventDefault();
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

    claimClicked($event, source, id) {
        if (!this.isClaimed(source, id)) {
            const d: DataSetShort = new DataSetShort();

            d.source = source;
            d.id = id;

            this.profileService.claimDataset(this.profile.userId, d);
            this.profile.dataSets.push(d);
            this.profileService.setProfile(this.profile);
        } else {
            this.router.navigate(['profile']);
        }

        $event.stopPropagation();
        $event.preventDefault();

        this.notificationService.success('Dataset claimed', 'to your dashboard');
    }

    watchClicked($event, source, id) {
        const d: WatchedDataset = new WatchedDataset();

        d.source = source;
        d.accession = id;
        d.userId = this.profile.userId;

        if (this.isWatched(source, id)) {
            return;
        }
        this.profileService.saveWatchedDataset(d);
        this.watchedDatasets.push(d);

        $event.stopPropagation();
        $event.preventDefault();

        this.notificationService.success('Dataset watched', 'in your dashboard');
    }

    toggle(datasetShort: DataSetShort) {
        if (!this.allowSelect) {
            return;
        }

        if (!this.profile) {
            return;
        }

        this.toggleDataset.emit(datasetShort);
    }

    deleteClicked($event, source, id) {
        this.buttonClicked.emit();
    }

    public isClaimed(source, id) {
        let obj: any;
        if (null != this.profile.dataSets) {
            obj = this.profile.dataSets.find(x => x.id === id && x.source === source);
        }
        return (null != obj);
    }

    public isWatched(source, id) {
        let obj: any;
        if (null != this.watchedDatasets) {
            obj = this.watchedDatasets.find(x => x.accession === id && x.source === source);
        }
        return (null != obj);
    }
}
