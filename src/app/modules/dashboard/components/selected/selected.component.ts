import {Component, OnInit} from '@angular/core';
import {DataSetDetail} from 'model/DataSetDetail';
import {DataSetService} from '@shared/services/dataset.service';
import {AppConfig} from 'app/app.config';
import {Observable} from 'rxjs';
import {DataSetShort} from 'model/DataSetShort';
import {ProfileService} from '@shared/services/profile.service';
import {NotificationsService} from 'angular2-notifications';
import {WatchedDataset} from 'model/WatchedDataset';
import {DialogService} from '@shared/services/dialog.service';
import {DatabaseListService} from '@shared/services/database-list.service';
import {Database} from 'model/Database';
import {Profile} from 'model/Profile';
import {DataSet} from 'model/DataSet';
import {DataTransportService} from '@shared/services/data.transport.service';
import {map} from 'rxjs/operators';
import {NgProgress} from '@ngx-progressbar/core';

@Component({
    selector: 'app-dashboard-selected',
    templateUrl: './selected.component.html',
    styleUrls: ['./selected.component.css']
})
export class DashboardSelectedComponent implements OnInit {

    dataSets: DataSetShort[];
    p: 0;
    databases: Database[];
    profile: Profile;
    watchedDatasets: WatchedDataset[];
    selectedChannel: 'selected_channel';

    constructor(private dataSetService: DataSetService,
                public appConfig: AppConfig,
                public profileService: ProfileService,
                private notificationService: NotificationsService,
                private slimLoadingBarService: NgProgress,
                private databaseListService: DatabaseListService,
                private dataTransporterService: DataTransportService,
                private dialogService: DialogService) {
    }

    ngOnInit() {
        this.slimLoadingBarService.start();
        this.profile = this.profileService.getProfileFromLocal();
        this.profileService.getWatchedDatasets(this.profile.userId).subscribe( x => {
            this.watchedDatasets = x;
        });
        this.databaseListService.getDatabaseList().subscribe(databases => {
            this.databases = databases;
            this.profileService.getSelected(this.profile.userId).subscribe(datasets => {
                this.dataSets = datasets;
                this.slimLoadingBarService.complete();
                this.dataTransporterService.fire(this.selectedChannel, this.dataSets);
            });
        });
    }

    getDataset(accession: string, repository: string): Observable<DataSet> {
        return this.dataSetService.getDataSetDetail(accession, repository).pipe(map(x => DataSetDetail.toDataset(x)));
    }

    remove(source, id) {
        let i = this.dataSets.findIndex(x => x.id === id && x.source === source);
        if (i > -1) {
            this.dataSets.splice(i, 1);
        }
        i = this.dataSets.findIndex(x => x.id === id && x.source === source);
        if (i > -1) {
            this.dataSets.splice(i, 1);
        }
        this.profileService.setSelected(this.profile.userId, this.dataSets).subscribe(x => {});
        this.dataTransporterService.fire(this.selectedChannel, this.dataSets);
        this.notificationService.success('Dataset removed', 'from selected');
    }

    claimClick() {
        for (const dataSet of this.dataSets) {
            const d: DataSetShort = new DataSetShort();

            d.source = dataSet.source;
            d.id = dataSet.id;

            this.profileService.claimDataset(this.profile.userId, d);
        }
        this.notificationService.success('Datasets claimed', 'to your dashboard');
    }

    watchClick() {
        for (const dataSet of this.dataSets) {
            const d: WatchedDataset = new WatchedDataset();

            d.source = dataSet.source;
            d.accession = dataSet.id;
            d.userId = this.profile.userId;

            this.profileService.saveWatchedDataset(d);
        }
        this.notificationService.success('Datasets watched', 'to your dashboard');
    }


    deleteClick() {
        this.dialogService.confirm('Unselect all datasets', 'Are you sure you want to do this?')
            .subscribe(res => {
                if (res) {
                    this.dataSets = [];
                    this.profileService.setSelected(this.profile.userId, this.dataSets).subscribe(x => {});
                    this.dataTransporterService.fire(this.selectedChannel, this.dataSets);
                    this.notificationService.success('Datasets deleted', 'from selected');
                }
            });
    }

    download() {
        this.dialogService.confirm('Download selected.txt', 'Are you sure you want to do this?')
            .subscribe(res => {
                if (res) {
                    let IDs = '';
                    for (const d of this.dataSets) {
                        IDs += ((IDs === '' ? '' : ',') + d.source + '/' + d.id);
                    }

                    const dataStr = 'data:text;charset=utf-8,' + encodeURIComponent(IDs);
                    const dlAnchorElem = document.getElementById('downloadAnchorElem');
                    dlAnchorElem.setAttribute('href', dataStr);
                    dlAnchorElem.setAttribute('download', 'selected.txt');
                    dlAnchorElem.click();

                    this.notificationService.success('Dataset IDs downloaded', 'to your computer');
                }
            });
    }
}
