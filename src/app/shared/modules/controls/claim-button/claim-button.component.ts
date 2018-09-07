import {Component, Input, OnChanges, OnInit, SimpleChange} from '@angular/core';
import {ProfileService} from '@shared/services/profile.service';
import {AuthService} from '@shared/services/auth.service';
import {Profile} from 'model/Profile';
import {DataSetShort} from 'model/DataSetShort';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {DataSet} from 'model/DataSet';
import {LogService} from '@shared/modules/logs/services/log.service';

@Component({
    selector: 'app-claim-button',
    templateUrl: './claim-button.component.html',
    styleUrls: ['./claim-button.component.css']
})
export class ClaimButtonComponent implements OnInit, OnChanges {

    @Input() dataSet: DataSet;

    claimed: boolean;
    claimable = true;
    profile: Profile;

    constructor(public auth: AuthService, public profileService: ProfileService, private router: Router, private logger: LogService) {
    }

    ngOnInit() {
        this.profile = this.profileService.getProfileFromLocal();
    }

    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        const log: string[] = [];
        for (const propName of Object.keys(changes)) {
            const changedProp = changes[propName];
            const to = JSON.stringify(changedProp.currentValue);
            if (changedProp.isFirstChange()) {
                log.push(`Initial value of ${propName} set to ${to}`);
            } else {
                const from = JSON.stringify(changedProp.previousValue);
                log.push(`${propName} changed from ${from} to ${to}`);
            }

            if (propName === 'dataSet') {
                if (null != changes[propName].currentValue) {

                    this.claimable = this.dataSet.claimable != null && this.dataSet.claimable;

                    if (null != this.profile) {
                        const profile: Profile = this.profile;
                        let obj: any;
                        if (null != profile.dataSets) {
                            obj = profile.dataSets.find(x => x.id === this.dataSet.id && x.source === this.dataSet.source);
                        }
                        this.claimed = (null != obj);
                    }
                }
            }
        }
    }

    claimDataset() {
        const dataset: DataSetShort = new DataSetShort();
        dataset.source = this.dataSet.source;
        dataset.id = this.dataSet.id;
        dataset.claimed = moment().format('ll');
        dataset.name = this.dataSet.title;
        dataset.omics_type = this.dataSet.omicsType;

        if (this.auth.loggedIn()) {
            this.logger.debug('Claiming dataset for user: {}', this.profile.userId);
            this.profileService.claimDataset(this.profile.userId, dataset);
            //
            this.profile.dataSets.push(dataset);
            this.profileService.setProfile(this.profile);
        }

        this.claimed = true;
    }

    viewInProfile() {
        this.router.navigate(['profile']);
    }
}
