import {Component, OnInit} from '@angular/core';
import {ProfileService} from '@shared/services/profile.service';
import {AppConfig} from 'app/app.config';
import {Router} from '@angular/router';
import {FileUploader} from 'ng2-file-upload';
import {UploadService} from '@shared/services/upload.service';
import {NotificationsService} from 'angular2-notifications/dist';
import {DataTransportService} from '@shared/services/data.transport.service';

@Component({
    selector: 'app-update',
    templateUrl: './update.component.html',
    styleUrls: ['./update.component.css']
})
export class DashboardUpdateComponent implements OnInit {

    public uploader: FileUploader;
    public profileImageUrl: string;
    public profile = this.profileService.profile;

    imageChangedEvent: any = '';
    croppedImage: any = '';
    isProfileImageChanged = false;

    constructor(public profileService: ProfileService,
                public appConfig: AppConfig,
                private uploadService: UploadService,
                private notification: NotificationsService,
                private dataTransporterService: DataTransportService,
                private router: Router) {
    }

    ngOnInit() {

        if (!this.profileService.profile) {
            this.router.navigate(['/profile']);
            return;
        }
        this.profileImageUrl = this.appConfig.getProfileImageUrl(this.profile.userId);
    }

    updateProfile() {
        if (this.isProfileImageChanged) {
            const file = this.uploadService.dataURLtoFile(this.profileImageUrl, 'image.png');
            this.uploadService.uploadFile(this.appConfig.getProfileUploadImageUrl(this.profile.userId), file).subscribe(percent => {

            }, error => {
                this.notification.error('An exception occurred while uploading your profile photo: ' + error);
            }, () => {
                this.dataTransporterService.fire('image_change', 'image updated');
            });
            this.isProfileImageChanged = false;
        }
        this.profileService.updateUserProfile(this.profile).subscribe(success => {
            this.notification.success('Profile updated');
        }, error => {
            this.notification.error('An exception occurred while saving your profile: ' + error);
        });
    }

    fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
    }
    imageCropped(image: string) {
        this.croppedImage = image;
    }
    imageLoaded() {
        // show cropper
    }
    loadImageFailed() {
        // show message
    }

    profileImageChange() {
        this.profileImageUrl = this.croppedImage;
        this.isProfileImageChanged = true;
    }
}
