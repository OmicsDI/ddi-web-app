import {Component, OnInit} from '@angular/core';
import {ProfileService} from '@shared/services/profile.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppConfig} from 'app/app.config';
import {Router} from '@angular/router';
import {FileUploader} from 'ng2-file-upload';

@Component({
    selector: 'app-update',
    templateUrl: './update.component.html',
    styleUrls: ['./update.component.css']
})
export class DashboardUpdateComponent implements OnInit {

    public uploader: FileUploader;
    form: FormGroup;
    public profileImageUrl: string;
    public profile = this.profileService.profile;

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

        if (!this.profileService.profile) {
            this.router.navigate(['/profile']);
            return;
        }
        this.profileImageUrl = this.getProfileImageUrl();
    }

    getProfileImageUrl(): string {

        return this.appConfig.getProfileImageUrl(this.profileService.profile.userId);

    }

    public fileChangeEvent(fileInput: any) {
        if (fileInput.target.files && fileInput.target.files[0]) {
            setTimeout(() => {
                this.uploader.uploadAll();
            }, 100);
        }
    }

    submitClicked() {
        this.profileService.updateUser().subscribe(
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
