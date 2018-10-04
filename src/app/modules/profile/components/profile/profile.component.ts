import {Component, OnInit} from '@angular/core';
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

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css', './profile.css']
})
export class ProfileComponent implements OnInit {
    profileX: Profile;
    public name: String;
    dataSetDetails: DataSetDetail[] = [];
    profileImageUrl = '';
    coauthors: string[];
    userId = 'xxx';
    username: string = null;
    databases: Database[];
    filter = '';

    toDataset = DataSetDetail.toDataset;
    datasetShowed: DataSetDetail[];

    constructor(public profileService: ProfileService,
                private dataSetService: DataSetService,
                private formBuilder: FormBuilder,
                public appConfig: AppConfig,
                private authService: AuthService,
                private router: Router,
                private logger: LogService,
                private databaseListService: DatabaseListService,
                private slimLoadingBarService: NgProgress,
                private route: ActivatedRoute) {
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
        this.slimLoadingBarService.start();
        this.databaseListService.getDatabaseList().subscribe(databases => {
            this.databases = databases;
            this.route.params.subscribe(params => {
                this.username = params['username'];
                this.getProfile(this.username);
            });
        });
    }

    getProfile(username: string = null) {
        this.logger.debug('current username: {}', username);
        this.profileService.getPublicProfile(username).subscribe(profile => {
            this.profileX = profile;
            this.profileImageUrl = this.getProfileImageUrl();
            if (this.profileX.dataSets != null) {
                forkJoin(this.profileX.dataSets.map(x => {
                    return this.dataSetService.getDataSetDetail(x.id, x.source);
                })).subscribe(
                    y => {
                        this.dataSetDetails = y;
                        this.datasetShowed = y;
                        this.slimLoadingBarService.complete();
                    }
                );
            } else {
                this.slimLoadingBarService.complete();
            }
        });
    }

    getProfileImageUrl(): string {
        return this.appConfig.getProfileImageUrl(this.userId);
    }

}
