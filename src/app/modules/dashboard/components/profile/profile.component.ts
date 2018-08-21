import {Component, OnInit} from '@angular/core';
import {ProfileService} from '@shared/services/profile.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Profile} from 'model/Profile';
import {DataSetShort} from 'model/DataSetShort';
import {DataSetService} from '@shared/services/dataset.service';
import {DataSetDetail} from 'model/DataSetDetail';
import {AppConfig} from 'app/app.config';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import {InviteComponent} from '@modules/profile-controls/components/invite/invite.component';
import {LogService} from '@shared/modules/logs/services/log.service';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class DashboardProfileComponent implements OnInit {
    profileX: Profile;
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

    constructor(public profileService: ProfileService,
                private dataSetService: DataSetService,
                private formBuilder: FormBuilder,
                public appConfig: AppConfig,
                private router: Router,
                private route: ActivatedRoute,
                private logger: LogService,
                private slimLoadingBarService: SlimLoadingBarService,
                private dialog: MatDialog) {

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
        this.slimLoadingBarService.start();
        this.route.params.subscribe(params => {
            this.username = params['username'];
            this.getProfile(this.username);
        });

        Observable.fromEvent(window, 'resize')
            .debounceTime(100) // timer
            .subscribe((event) => {
                // restartRequest
                // document.getElementById("chart44").style.width = document.getElementById("profile_div").clientWidth.toString();
                document.getElementById('chart44').style.width = '0px';
            });
    }


    private showWelcomeDialog() {
        let dialogRef: MatDialogRef<InviteComponent>;

        const inviteId = this.route.snapshot.queryParams['state'];

        if (inviteId) {

            this.logger.debug('Opening dialog with inviteId : {}', inviteId);

            if (inviteId.length === 12) {
                dialogRef = this.dialog.open(InviteComponent, {data: {inviteId: inviteId}});
            }
        }

    }

    getProfile(username: string = null) {
        this.logger.debug('Current username: {}', username);

        if (username) {
            this.profileService.getPublicProfile(username)
                .subscribe(
                    profile => {
                        if (!profile) {
                            this.router.navigate(['/notfound']);
                            return;
                        }

                        this.profileX = profile;
                        this.slimLoadingBarService.complete();
                    }
                );
        } else {
            this.profileService.getProfile()
                .subscribe(
                    profile => {
                        this.logger.debug('getting profile');

                        this.profileX = profile;
                        this.name = profile.userName;
                        this.dataSetDetails = [];

                        this.userId = profile.userId;

                        if (window.location.search) {
                            this.showWelcomeDialog();
                        }
                        this.slimLoadingBarService.complete();
                    }
                );
        }
    }

    updateProfile() {
        this.profileService.updateUser().subscribe();
    }

    checkAll(ev) {
        this.logger.debug('Checking select all {}', ev);
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

    isMy(): boolean {
        return (null == this.username);
    }

    claimDatasetsToOrcid() {
        alert('claimDatasetsToOrcid');
    }
}
