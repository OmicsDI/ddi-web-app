import {Component, OnInit, TemplateRef} from '@angular/core';
import {ProfileService} from '@shared/services/profile.service';
import {AppConfig} from 'app/app.config';
import {Router} from '@angular/router';
import {Profile} from 'model/Profile';
import {UploadService} from '@shared/services/upload.service';
import {NotificationsService} from 'angular2-notifications';
import {DataTransportService} from '@shared/services/data.transport.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

@Component({
    selector: 'app-update',
    templateUrl: './update.component.html',
    styleUrls: ['./update.component.css']
})
export class DashboardUpdateComponent implements OnInit {

    public profileImageUrl: string;
    public profile: Profile;
    imageChangedEvent: any = '';
    croppedImage: any = '';
    imageLoadFailed = false;
    isProfileImageChanged = false;
    modalRef: BsModalRef;

    constructor(public profileService: ProfileService,
                public appConfig: AppConfig,
                private uploadService: UploadService,
                private notification: NotificationsService,
                private dataTransporterService: DataTransportService,
                private modalService: BsModalService,
                private router: Router) {
    }

    openModel(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(
            template,
            Object.assign({}, { class: 'modal-lg' })
        );
    }

    ngOnInit() {
        this.profile = this.profileService.getProfileFromLocal();
        this.fileUpload(this.profile);
    };
    fileUpload (profile: Profile) {
        if (!profile) {
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
        this.profileService.updateUser(this.profile).subscribe(success => {
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
        this.imageLoadFailed = false;
    }
    loadImageFailed() {
        this.imageLoadFailed = true;
    }

    profileImageChange() {
        if (!this.imageLoadFailed) {
            this.profileImageUrl = this.croppedImage;
            this.isProfileImageChanged = true;
            this.modalRef.hide();
        }
    }
}
