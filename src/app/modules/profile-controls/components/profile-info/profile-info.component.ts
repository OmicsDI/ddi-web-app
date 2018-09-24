import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {ProfileService} from '@shared/services/profile.service';
import {FormGroup} from '@angular/forms';
import {Profile} from 'model/Profile';
import {DataSetDetail} from 'model/DataSetDetail';
import {AppConfig} from 'app/app.config';
import {LogService} from '@shared/modules/logs/services/log.service';

@Component({
    selector: 'app-profile-info',
    templateUrl: './profile-info.component.html',
    styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {

    public name: String;
    form: FormGroup;
    editMode = false;
    dataSetDetails: DataSetDetail[] = [];
    profileImageUrl = '';
    coauthors: string[];
    userId = '';

    @Input() profile: Profile;
    @Output() change = new EventEmitter();

    baseUrl = '';

    constructor(public profileService: ProfileService,
                public appConfig: AppConfig,
                private logger: LogService,
                @Inject(DOCUMENT) private document) {
        this.baseUrl = document.location.origin;
    }

    ngOnInit() {
        this.profileImageUrl = this.getProfileImageUrl();
    }

    editClicked() {
        this.editMode = true;
    }


    getProfileImageUrl(): string {
        return this.appConfig.getProfileImageUrl(this.profile.userId);
    }
}
