import {Component, Input, OnChanges, OnInit, SimpleChange} from '@angular/core';
import {ProfileService} from 'services/profile.service';
import {AuthService} from 'services/auth.service';
import {Profile} from 'model/Profile';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {DataSet} from 'model/DataSet';
import {DataSetShort} from 'model/DataSetShort';


@Component({
    selector: 'claim-button-dataset',
    templateUrl: './claim-button-dataset.component.html',
    styleUrls: ['./claim-button-dataset.component.css']
})
export class ClaimButtonDatasetComponent implements OnInit, OnChanges {

    @Input() dataSet: DataSet;

    claimed: boolean;
    claimable = true;

    constructor(public auth: AuthService, public profileService: ProfileService, private router: Router) {
    }

    ngOnInit() {
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

                    if (null != this.profileService.profile) {
                        const profile: Profile = this.profileService.profile;
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

        if (!this.profileService.profile) {
            console.log(`this.profileService.profile is NULL`);
            console.log(`this.profileService.userId ${this.profileService.userId}`);
        } else {
            console.log(`claim dataset for user: ${this.profileService.profile.userId}`);
            this.profileService.claimDataset(this.profileService.profile.userId, dataset);
        }

        this.claimed = true;
    }

    viewInProfile() {
        this.router.navigate(['profile']);
    }


}
