import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ProfileService} from '@shared/services/profile.service';
import {FormGroup} from '@angular/forms';
import {Profile} from 'model/Profile';
import {DataSetDetail} from 'model/DataSetDetail';
import {AppConfig} from 'app/app.config';
import {FileUploader} from 'ng2-file-upload';
import {LogService} from '@shared/modules/logs/services/log.service';

@Component({
    selector: 'app-profile-info',
    templateUrl: './profile-info.component.html',
    styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit, OnChanges {

    public name: String;
    form: FormGroup;
    editMode = false;
    facebookConnected = false;
    orcidConnected = false;
    dataSetDetails: DataSetDetail[] = [];
    profileImageUrl = '';
    coauthors: string[];
    userId = '';

    public uploader: FileUploader;

    @Input() profile: Profile = new Profile();
    @Output() change = new EventEmitter();

    constructor(public profileService: ProfileService, public appConfig: AppConfig, private logger: LogService) {

    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        for (const propName of Object.keys(changes)) {
            const chng = changes[propName];
            const cur = JSON.stringify(chng.currentValue);
            const prev = JSON.stringify(chng.previousValue);
            if (propName === 'profile') {
                if (null != chng.currentValue) {
                    this.logger.debug(`profile-info ngOnChanges: ${chng.currentValue.userId}`);
                    this.profile = chng.currentValue;
                    this.profileImageUrl = this.getProfileImageUrl();
                    this.uploader = new FileUploader({url: this.appConfig.getProfileUploadImageUrl(this.profile.userId)});
                    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
                        this.profileImageUrl = this.getProfileImageUrl();
                    };
                }
            }
        }
    }

    editClicked() {
        this.editMode = true;
    }


    getProfileImageUrl(): string {
        return this.appConfig.getProfileImageUrl(this.profile.userId);
    }
}
