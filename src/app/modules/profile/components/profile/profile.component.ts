import {Component, OnInit} from '@angular/core';
import {ProfileService} from '@shared/services/profile.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Profile} from 'model/Profile';
import {DataSetShort} from 'model/DataSetShort';
import {DataSetService} from '@shared/services/dataset.service';
import {DataSetDetail} from 'model/DataSetDetail';
import {AppConfig} from 'app/app.config';
import {FileUploader} from 'ng2-file-upload';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {DataSet} from 'model/DataSet';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css',
        './profile.css']
})
export class ProfileComponent implements OnInit {
    profileX: Profile = new Profile;
    public name: String;
    form: FormGroup;
    editMode = false;
    facebookConnected = false;
    orcidConnected = false;
    dataSetDetails: DataSetDetail[] = [];
    profileImageUrl = '';
    coauthors: string[];
    userId = 'xxx';
    username: string = null;

    toDataset = DataSetDetail.toDataset;

    public uploader: FileUploader;

    constructor(public profileService: ProfileService
        , private dataSetService: DataSetService
        , private formBuilder: FormBuilder
        , public appConfig: AppConfig
        , private router: Router
        , private route: ActivatedRoute) {
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
        this.route.params.subscribe(params => {
            this.username = params['username'];
            this.getProfile(this.username);
        });
    }

    getProfile(username: string = null) {
        console.log('current username:' + username);

        if (username) {
            this.profileService.getPublicProfile(username)
                .subscribe(
                    profile => {
                        // if(!profile){
                        //   this.router.navigate(["/notfound"]);
                        //   return;
                        // }

                        this.profileX = profile;
                        this.profileImageUrl = this.getProfileImageUrl();

                        Observable.forkJoin(this.profileX.dataSets.map(x => {
                            return this.dataSetService.getDataSetDetail_private(x.id, x.source);
                        })).subscribe(
                            y => {
                                this.dataSetDetails = y;
                            }
                        );
                    }
                );
        } else {
            this.profileService.getProfile()
                .subscribe(
                    profile => {
                        console.log('getting profile');

                        this.profileX = profile;
                        this.name = profile.userName;
                        this.dataSetDetails = [];

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
    }

    checkAll(ev) {
        console.log('checking select all' + ev);
        this.profileX.dataSets.forEach(x => (x as any).state = ev.target.checked);
    }

    isAllChecked() {
        if (null == this.profileX.dataSets) {
            return false;
        }
        return this.profileX.dataSets.every(_ => (_ as any).state);
    }

    deleteSelected() {
        const dataSets: DataSetDetail[] = this.dataSetDetails.filter(x => !(x as any).state);

        this.profileService.saveDataSets(this.profileX.userId, dataSets.map(x => {
            const r: DataSetShort = new DataSetShort();
            r.source = x.source;
            r.id = x.id;
            r.claimed = x['claimed'];
            return r;
        }));

        this.getProfile(this.username);
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

    isMy(): boolean {
        return (null == this.username);
    }
}
