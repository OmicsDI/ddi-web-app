import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataSet} from 'model/DataSet';
import {AppConfig} from 'app/app.config';
import {ProfileService} from '@shared/services/profile.service';
import {DatabaseListService} from '@shared/services/database-list.service';
import {DataSetShort} from 'model/DataSetShort';
import {WatchedDataset} from 'model/WatchedDataset';
import {NotificationsService} from 'angular2-notifications';
import {Router} from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material';
import {DataSetService} from '@shared/services/dataset.service';
import {CitationDialogComponent} from '@shared/modules/controls/citation-dialog/citation-dialog.component';
import {LogService} from '@shared/modules/logs/services/log.service';
import {Database} from 'model/Database';
import {Profile} from 'model/Profile';
import {Observable} from 'rxjs';

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
    @Input() observableDataset: Observable<DataSet>;
    @Input() isSelected = false;
    @Input() watchedDataset: WatchedDataset;
    isClaimed = false;

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
        if (this.profile) {
            const obj = this.profile.dataSets.find(x => x.id === this.d.id && x.source === this.d.source)
            if (obj) {
                this.isClaimed = true;
            }
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

    citeClicked($event) {
        let dialogRef: MatDialogRef<CitationDialogComponent>;

        this.dataSetService.getDataSetDetail(this.d.id, this.d.source).subscribe(
            x => {
                dialogRef = this.dialog.open(CitationDialogComponent);
                dialogRef.componentInstance.title = 'Dataset citation';
                dialogRef.componentInstance.datasetDetail = x;
                return dialogRef.afterClosed();
            }
        );
        $event.stopPropagation();
        $event.preventDefault();
    }

    claimClicked($event) {
        if (!this.isClaimed) {
            const d: DataSetShort = new DataSetShort();

            d.source = this.d.source;
            d.id = this.d.id;

            this.profileService.claimDataset(this.profile.userId, d);
            this.profile.dataSets.push(d);
            this.profileService.setProfile(this.profile);
            this.isClaimed = true;
            this.notificationService.success('Dataset claimed', 'to your dashboard', {timeOut: 1500});
        } else {
            this.router.navigate(['dashboard', 'claimed']);
        }

        $event.stopPropagation();
        $event.preventDefault();
    }

    watchClicked($event) {
        const d: WatchedDataset = new WatchedDataset();

        d.source = this.d.source;
        d.accession = this.d.id;
        d.userId = this.profile.userId;

        if (this.watchedDataset) {
            this.profileService.deleteWatchedDataset(this.profile.userId, this.watchedDataset.id).subscribe(
                x => {
                    this.watchedDataset = null;
                    this.notificationService.success('Watched dataset removed', 'from dashboard');
                }
            );
            return;
        }
        this.profileService.saveWatchedDataset(d).subscribe(watchedDataset => {
            this.watchedDataset = watchedDataset;
            this.notificationService.success('Dataset watched', 'in your dashboard', {timeOut: 1500});
        });

        $event.stopPropagation();
        $event.preventDefault();
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

    deleteClicked($event) {
        this.buttonClicked.emit();
    }
}
