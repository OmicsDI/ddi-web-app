import {Component, OnInit} from '@angular/core';
import {DataSetDetail} from 'model/DataSetDetail';
import {SelectedService} from '@shared/services/selected.service';
import {DataSetService} from '@shared/services/dataset.service';
import {AppConfig} from 'app/app.config';
import {Observable} from 'rxjs/Rx';
import {DataSetShort} from 'model/DataSetShort';
import {ProfileService} from '@shared/services/profile.service';
import {NotificationsService} from 'angular2-notifications/dist';
import {WatchedDataset} from 'model/WatchedDataset';
import {DialogService} from '@shared/services/dialog.service';
import {DataSet} from 'model/DataSet';

@Component({
    selector: 'app-dashboard-selected',
    templateUrl: './selected.component.html',
    styleUrls: ['./selected.component.css']
})
export class DashboardSelectedComponent implements OnInit {

    dataSets: DataSetDetail[];

    p: 0;

    constructor(public selectedService: SelectedService
        , private dataSetService: DataSetService
        , public appConfig: AppConfig
        , public profileService: ProfileService
        , private notificationService: NotificationsService
        , private dialogService: DialogService) {
    }

    ngOnInit() {
        this.reloadDataSets();
    }

    reloadDataSets() {
        this.dataSets = [];
        if (!this.selectedService.dataSets) {
            return;
        }
        Observable.forkJoin(this.selectedService.dataSets.map(x => {
            return this.dataSetService.getDataSetDetail_private(x.id, x.source);
        })).subscribe(
            y => {
                this.dataSets = y;
            }
        );
    }

    remove(source, id) {
        let i = this.dataSets.findIndex(x => x.id === id && x.source === source);
        if (i > -1) {
            this.dataSets.splice(i, 1);
        }
        i = this.selectedService.dataSets.findIndex(x => x.id === id && x.source === source);
        if (i > -1) {
            this.selectedService.dataSets.splice(i, 1);
        }
        this.notificationService.success('Dataset removed', 'from selected');
    }

    exportClick() {
        alert('exportClick');
    }

    claimClick() {
        for (const dataSet of this.dataSets) {
            const d: DataSetShort = new DataSetShort();

            d.source = dataSet.source;
            d.id = dataSet.id;

            this.profileService.claimDataset(this.profileService.userId, d);
        }
        this.notificationService.success(
            'Datasets claimed',
            'to your dashboard'
        );
    }

    watchClick() {
        for (const dataSet of this.dataSets) {
            const d: WatchedDataset = new WatchedDataset();

            d.source = dataSet.source;
            d.accession = dataSet.id;
            d.userId = this.profileService.userId;

            this.profileService.saveWatchedDataset(d);
        }
        this.notificationService.success(
            'Datasets watched',
            'to your dashboard'
        );
    }


    deleteClick() {
        const confirm = this.dialogService.confirm('Unselect all datasets', 'Are you sure you want to do this?')
            .subscribe(res => {
                if (res) {
                    this.selectedService.dataSets = [];

                    this.reloadDataSets();

                    this.notificationService.success(
                        'Datasets deleted',
                        'from selected'
                    );

                }
            });
    }

    download() {

        const confirm = this.dialogService.confirm('Download selected.txt', 'Are you sure you want to do this?')
            .subscribe(res => {
                if (res) {
                    let IDs = '';
                    for (const d of this.selectedService.dataSets) {
                        IDs += ((IDs === '' ? '' : ',') + d.source + '/' + d.id);
                    }

                    const storageObj = {hello: 'world'};
                    const dataStr = 'data:text;charset=utf-8,' + encodeURIComponent(IDs);
                    const dlAnchorElem = document.getElementById('downloadAnchorElem');
                    dlAnchorElem.setAttribute('href', dataStr);
                    dlAnchorElem.setAttribute('download', 'selected.txt');
                    dlAnchorElem.click();

                    this.notificationService.success(
                        'Dataset IDs downloaded',
                        'to your computer'
                    );

                }
            });


    }
    convertDataset(d) {
        const dataset = new DataSet();
        dataset.id = d.id;
        dataset.source = d.source;
        dataset.title = d.name;
        dataset.description = d.description;
        dataset.keywords = d.keywords;
        dataset.organisms = d.organisms;
        dataset.tissues = d.tissues;
        dataset.diseases = d.diseases;
        dataset.omicsType = d.omics_type;
        dataset.publicationDate = d.publicationDate;
        dataset.score = d.score;
        dataset.visitCount = d.visitCount;
        dataset.claimable = d.claimable;
        dataset.citationsCount = d.citationsCount;
        dataset.connectionsCount = d.connectionsCount;
        dataset.reanalysisCount = d.reanalysisCount;
        dataset.viewsCount = d.viewsCount;
        return dataset;
    }
}


// <img style="float:right;cursor:pointer;" src="img/delete.png" title="delete"
// (click)="selectedService.unselect(d.source, d.id); remove(d.source, d.id);">
