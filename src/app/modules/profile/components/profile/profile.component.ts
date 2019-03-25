import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {ProfileService} from '@shared/services/profile.service';
import {FormBuilder} from '@angular/forms';
import {Profile} from 'model/Profile';
import {DataSetService} from '@shared/services/dataset.service';
import {DataSetDetail} from 'model/DataSetDetail';
import {AppConfig} from 'app/app.config';
import {ActivatedRoute, Router} from '@angular/router';
import {LogService} from '@shared/modules/logs/services/log.service';
import {DatabaseListService} from '@shared/services/database-list.service';
import {Database} from 'model/Database';
import {AuthService} from '@shared/services/auth.service';
import {forkJoin} from 'rxjs/internal/observable/forkJoin';
import {NgProgress} from '@ngx-progressbar/core';
import {isPlatformServer} from '@angular/common';
import {DataSetShort} from 'model/DataSetShort';
import {Observable} from 'rxjs';
import {DatasetBatchResult} from 'model/DatasetBatchResult';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css', './profile.css']
})
export class ProfileComponent implements OnInit {
    profileX: Profile;
    public name: String;
    dataSetDetails: DataSetDetail[];
    profileImageUrl = '';
    coauthors: string[];
    userId = 'xxx';
    username: string = null;
    databases: Map<string, Database>;
    filter = '';

    toDataset = DataSetDetail.toDataset;
    datasetShowed: DataSetDetail[];
    isServer = false;

    constructor(public profileService: ProfileService,
                private dataSetService: DataSetService,
                private formBuilder: FormBuilder,
                public appConfig: AppConfig,
                private authService: AuthService,
                private router: Router,
                private logger: LogService,
                private databaseListService: DatabaseListService,
                private slimLoadingBarService: NgProgress,
                @Inject(PLATFORM_ID) private platformId,
                private route: ActivatedRoute) {
        if (isPlatformServer(platformId)) {
            this.isServer = true;
        }
    }

    filterDatasets(keyword) {
        this.datasetShowed = [];
        this.dataSetDetails.forEach(dataset => {
            if (dataset.id.indexOf(keyword) > -1
                || dataset.source.indexOf(keyword) > -1
                || dataset.name.indexOf(keyword) > -1
                || dataset.description.indexOf(keyword) > -1) {
                this.datasetShowed.push(dataset);
            }
        });
    }

    ngOnInit() {
        this.slimLoadingBarService.ref().start();
        this.databaseListService.getDatabaseList().subscribe(databases => {
            this.databases = new Map<string, Database>();
            databases.forEach(db => {
                this.databases.set(db.source, db);
            });
            this.getProfile(this.route.snapshot.params['username']);
        });
    }

    getProfile(username: string = null) {
        this.logger.debug('current username: {}', username);
        this.profileService.getPublicProfile(username).subscribe(profile => {
            this.profileX = profile;
            this.profileImageUrl = this.getProfileImageUrl();

            this.dataSetService.getDatasetDetails(this.profileX.dataSets).subscribe(batches => {
                const tmpresult = [];
                batches.forEach(batch => {
                    tmpresult.push.apply(tmpresult, batch.datasets);
                });
                this.dataSetDetails = tmpresult;
                this.datasetShowed = tmpresult;
                this.slimLoadingBarService.ref().complete();
            })
        });
    }

    getProfileImageUrl(): string {
        return this.appConfig.getProfileImageUrl(this.userId);
    }

}
