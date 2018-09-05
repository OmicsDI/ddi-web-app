import {Component, OnInit} from '@angular/core';
import {ProfileService} from '@shared/services/profile.service';
import {AppConfig} from 'app/app.config';
import {Router} from '@angular/router';
import {FileUploader} from 'ng2-file-upload';
import {UploadService} from '@shared/services/upload.service';

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
    bio = this.profile.bio;

    editorConfig = {
        'editable': true,
        'spellcheck': true,
        'height': 'auto',
        'minHeight': '300px',
        'width': 'auto',
        'minWidth': '0',
        'translate': 'yes',
        'enableToolbar': true,
        'showToolbar': true,
        'placeholder': 'Enter text here...',
        'imageEndPoint': '',
        'toolbar': [
            ['bold', 'italic', 'underline', 'strikeThrough', 'superscript', 'subscript'],
            ['fontName', 'fontSize', 'color'],
            ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'indent', 'outdent'],
            ['cut', 'copy', 'delete', 'removeFormat', 'undo', 'redo'],
            ['paragraph', 'blockquote', 'removeBlockquote', 'horizontalLine', 'orderedList', 'unorderedList'],
            ['link', 'unlink', 'image', 'video']
        ]
    };

    constructor(public profileService: ProfileService,
                public appConfig: AppConfig,
                private uploadService: UploadService,
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
            this.uploadService.uploadFile(this.appConfig.getProfileUploadImageUrl(this.profile.userId), file);
            this.isProfileImageChanged = false;
        }
        console.log("updating....");
        this.profileService.updateUserProfile(this.profile).subscribe(success => {
            console.log(success);
        }, error => {
            console.log(error);
        })
    }

    updateBio(html) {
        this.profile.bio = html;
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
