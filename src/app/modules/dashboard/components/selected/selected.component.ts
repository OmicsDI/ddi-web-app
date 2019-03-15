import {Component, OnInit} from '@angular/core';
import {DataSetDetail} from 'model/DataSetDetail';
import {DataSetService} from '@shared/services/dataset.service';
import {AppConfig} from 'app/app.config';
import {DataSetShort} from 'model/DataSetShort';
import {ProfileService} from '@shared/services/profile.service';
import {NotificationsService} from 'angular2-notifications';
import {WatchedDataset} from 'model/WatchedDataset';
import {DialogService} from '@shared/services/dialog.service';
import {DatabaseListService} from '@shared/services/database-list.service';
import {Database} from 'model/Database';
import {Profile} from 'model/Profile';
import {DataTransportService} from '@shared/services/data.transport.service';
import {NgProgress} from '@ngx-progressbar/core';
import {DataSet} from 'model/DataSet';
import {forkJoin} from 'rxjs';

@Component({
    selector: 'app-dashboard-selected',
    templateUrl: './selected.component.html',
    styleUrls: ['./selected.component.css']
})
export class DashboardSelectedComponent implements OnInit {

    dataSets: DataSetShort[];
    datasetDetails: DataSet[];
    currentPage = 1;
    itemsPerPage = 10;
    databases: Database[];
    profile: Profile;
    watchedDatasets: Map<string, WatchedDataset>;
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
        this.slimLoadingBarService.ref().start();
        this.profile = this.profileService.getProfileFromLocal();
        this.profileService.getWatchedDatasets(this.profile.userId).subscribe( watches => {
            this.watchedDatasets = new Map<string, WatchedDataset> ();
            watches.forEach(watch => {
                this.watchedDatasets.set(watch.source + watch.accession, watch);
            })
        });

        forkJoin(this.databaseListService.getDatabaseList(), this.profileService.getSelected(this.profile.userId)).subscribe(res => {
            this.databases = res[0];
            this.dataSets = res[1];
            if (this.dataSets.length > 0) {
                this.fetchPage(1);
            } else {
                this.datasetDetails = [];
                this.slimLoadingBarService.ref().complete();
            }
            this.dataTransporterService.fire(this.selectedChannel, this.dataSets);
        });
    }

    fetchPage(page: number) {
        this.slimLoadingBarService.ref().start();
        const fromIndex = (page - 1) * this.itemsPerPage;
        const toIndex = page * this.itemsPerPage;
        const datasets = this.dataSets.slice(fromIndex, toIndex);
        this.dataSetService.getBatchDatasets(datasets).subscribe(batchResult => {
            this.datasetDetails = batchResult.datasets.map(x => DataSetDetail.toDataset(x));
            this.slimLoadingBarService.ref().complete();
            this.currentPage = page;
            window.scrollTo(0, 0);
        });
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

            this.profileService.saveWatchedDataset(d).subscribe(() => {
            })
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
