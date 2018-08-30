import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataSet} from 'model/DataSet';
import {SelectedService} from '@shared/services/selected.service';
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

@Component({
    selector: 'app-datasetwidget',
    templateUrl: './datasetwidget.component.html',
    styleUrls: ['./datasetwidget.component.css']
})
export class DatasetWidgetComponent implements OnInit {

    @Input() d: DataSet;
    @Input() allowSelect = true;
    @Output() buttonClicked = new EventEmitter<any>();
    @Input() allowDelete = true;
    @Input() allowClaim = true;
    @Input() allowWatch = true;
    @Input() databases: Database[];
    profile: Profile;
    watchedDatasets: WatchedDataset[];

    constructor(public selectedService: SelectedService,
                public appConfig: AppConfig,
                public profileService: ProfileService,
                private databaseListServce: DatabaseListService,
                private router: Router,
                private notificationService: NotificationsService,
                private dataSetService: DataSetService,
                private logger: LogService,
                private dialog: MatDialog) {
    }

    ngOnInit() {
        if (localStorage.getItem('profile')) {
            this.profile = JSON.parse(localStorage.getItem('profile'));
            if (this.profile.userId) {
                this.profileService.getWatchedDatasets(this.profile.userId).subscribe( x => {
                    this.watchedDatasets = x;
                });
            }
        } else {
            this.profileService.getProfile().subscribe( x => {
                this.profile = x;
                if (this.profile.userId) {
                    this.profileService.getWatchedDatasets(this.profile.userId).subscribe( watchedDatasets => {
                        this.watchedDatasets = watchedDatasets;
                    });
                }
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
            localStorage.removeItem('profile');
            localStorage.setItem('profile', JSON.stringify(this.profile));
        } else {
            this.router.navigate(['profile']);
        }

        $event.stopPropagation();
        $event.preventDefault();

        this.notificationService.success(
            'Dataset claimed',
            'to your dashboard'
        );
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

        this.notificationService.success(
            'Dataset watched',
            'in your dashboard'
        );
    }

    toggle(source: string, id: string) {
        if (!this.allowSelect) {
            return;
        }

        if (!this.profile.userId) {
            return;
        }

        this.selectedService.toggle(source, id);
        this.logger.debug('Toggling {}, {}', source, id);
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
