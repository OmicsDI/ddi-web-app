import {Component, OnInit} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {ProfileService} from '@shared/services/profile.service';
import {AppConfig} from 'app/app.config';
import {LogService} from '@shared/modules/logs/services/log.service';

@Component({
    selector: 'app-picture',
    templateUrl: './picture.component.html',
    styleUrls: ['./picture.component.css']
})
export class DashboardPictureComponent implements OnInit {

    userId = 'xxx';
    public uploader: FileUploader;
    public profileImageUrl: string;

    constructor(public profileService: ProfileService, public appConfig: AppConfig, private logger: LogService) {
    }

    ngOnInit() {
        this.profileService.getProfile()
            .subscribe(
                profile => {
                    this.logger.debug('getting profile');

                    this.userId = profile.userId;
                    // this.getConnections(this.userId);
                    // this.getCoAuthors(this.userId);

                    this.uploader = new FileUploader({url: this.appConfig.getProfileUploadImageUrl(this.userId)});

                    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
                        this.profileImageUrl = this.getProfileImageUrl();
                    };

                    this.profileImageUrl = this.getProfileImageUrl();
                }
            );
    }

    getProfileImageUrl(): string {
        return this.appConfig.getProfileImageUrl(this.userId);
    }

    public fileChangeEvent(fileInput: any) {
        if (fileInput.target.files && fileInput.target.files[0]) {
            setTimeout(() => {
                this.uploader.uploadAll();
            }, 100);
        }
    }


}
