import {Component, OnInit} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {ProfileService} from 'services/profile.service';
import {AppConfig} from 'app/app.config';

@Component({
    selector: 'app-picture',
    templateUrl: './picture.component.html',
    styleUrls: ['./picture.component.css']
})
export class DashboardPictureComponent implements OnInit {

    userId = 'xxx';
    public uploader: FileUploader;
    public profileImageUrl: string;

    constructor(public profileService: ProfileService, public appConfig: AppConfig) {
    }

    ngOnInit() {
        this.profileService.getProfile()
            .subscribe(
                profile => {
                    console.log('getting profile');

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
                console.log('fileChangeEvent hello');
                this.uploader.uploadAll();
            }, 100);
        }
    }


}
