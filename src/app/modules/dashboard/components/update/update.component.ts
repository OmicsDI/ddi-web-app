import {Component, OnInit} from '@angular/core';
import {ProfileService} from '@shared/services/profile.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppConfig} from 'app/app.config';
import {Router} from '@angular/router';
import {FileUploader} from 'ng2-file-upload';
import {Profile} from 'model/Profile';

@Component({
    selector: 'app-update',
    templateUrl: './update.component.html',
    styleUrls: ['./update.component.css']
})
export class DashboardUpdateComponent implements OnInit {

    public uploader: FileUploader;
    form: FormGroup;
    public profileImageUrl: string;
    public profile: Profile;

    constructor(public profileService: ProfileService,
                private formBuilder: FormBuilder,
                public appConfig: AppConfig,
                private router: Router) {
        this.form = formBuilder.group({
            name: ['', [
                Validators.required,
                Validators.minLength(3)
            ]],
            email: ['', [
                Validators.required
            ]],
            phone: [],
            address: formBuilder.group({
                street: ['', Validators.minLength(3)],
                suite: [],
                city: ['', Validators.maxLength(30)],
                zipcode: ['', Validators.pattern('^([0-9]){5}([-])([0-9]){4}$')]
            })
        });
    }

    ngOnInit() {
        if (this.profileService.isAuthorized()) {
            this.profile = this.profileService.getProfileFromLocal()
            this.fileUpload(this.profile);
        } else {
            this.profileService.getProfile().subscribe( x => {
                this.profile = x;
                this.fileUpload(this.profile);
            });
        }

    };
    fileUpload (profile: Profile) {
        if (!profile) {
            this.router.navigate(['/profile']);
            return;
        }

        this.uploader = new FileUploader({url: this.appConfig.getProfileUploadImageUrl(profile.userId)});
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            this.profileImageUrl = this.getProfileImageUrl(profile);
        };
        this.profileImageUrl = this.getProfileImageUrl(profile);
    }

    getProfileImageUrl(profile: Profile): string {

        return this.appConfig.getProfileImageUrl(profile.userId);

    }

    public fileChangeEvent(fileInput: any) {
        if (fileInput.target.files && fileInput.target.files[0]) {
            setTimeout(() => {
                this.uploader.uploadAll();
            }, 100);
        }
    }

    submitClicked() {
        this.profileService.updateUser(this.profile).subscribe(
            () => {
                this.router.navigate(['/dashboard/profile']);
            }
        );
    }

    cancelClicked() {
        // this.editMode = false;
        this.profileService.getProfile();
        this.router.navigate(['/dashboard/profile']);
    }

    onSubmit() {
        alert('submitd');
    }

    onCancel() {
        alert('canceld');
    }
}
