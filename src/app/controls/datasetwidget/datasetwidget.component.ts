import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataSet} from 'model/DataSet';
import {SelectedService} from 'services/selected.service';
import {AppConfig} from 'app/app.config';
import {ProfileService} from 'services/profile.service';
import {DatabaseListService} from 'services/database-list.service';
import {DataSetShort} from 'model/DataSetShort';
import {WatchedDataset} from 'model/WatchedDataset';
import {NotificationsService} from 'angular2-notifications/dist';
import {Router} from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material';
import {DataSetService} from 'services/dataset.service';
import {CitationDialogComponent} from "pages/dataset/citation-dialog/citation-dialog.component";

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

    constructor(public selectedService: SelectedService
        , public appConfig: AppConfig
        , public profileService: ProfileService
        , private databaseListServce: DatabaseListService
        , private router: Router
        , private notificationService: NotificationsService
        , private dataSetService: DataSetService
        , private dialog: MatDialog) {
    }

    ngOnInit() {
    }

    getDatabaseUrl(source) {
        const db = this.databaseListServce.databases[source];
        if (!db) {
            console.log('source not found:' + source);
        } else {
            return db.sourceUrl;
        }
    }

    getDatabaseTitle(source) {
        const db = this.databaseListServce.databases[source];
        if (!db) {
            console.log('source not found:' + source);
        } else {
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

        this.dataSetService.getDataSetDetail_private(id, source).subscribe(
            x => {
                dialogRef = this.dialog.open(CitationDialogComponent);
                dialogRef.componentInstance.title = 'Dataset citation';
                dialogRef.componentInstance.datasetDetail = x;
                return dialogRef.afterClosed();
            }
        );
    }

    claimClicked($event, source, id) {
        if (!this.profileService.isClaimed(source, id)) {
            const d: DataSetShort = new DataSetShort();

            d.source = source;
            d.id = id;

            this.profileService.claimDataset(this.profileService.userId, d);
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
        d.userId = this.profileService.userId;

        this.profileService.saveWatchedDataset(d);

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

        if (!this.profileService.userId) {
            return;
        }

        this.selectedService.toggle(source, id);
        console.log(`toggle ${source} ${id}`);
    }

    deleteClicked($event, source, id) {
        this.buttonClicked.emit();
    }
}
