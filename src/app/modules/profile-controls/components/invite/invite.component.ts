import {ChangeDetectorRef, Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {InviteService} from '@shared/services/invite.service';
import {Observable} from 'rxjs/Observable';
import {DataSetService} from '@shared/services/dataset.service';
import {DataSetDetail} from 'model/DataSetDetail';
import {DatabaseListService} from '@shared/services/database-list.service';
import {ProfileService} from '@shared/services/profile.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DataSetShort} from 'model/DataSetShort';
import {Router} from '@angular/router';
import {LogService} from '@shared/modules/logs/services/log.service';
import {Database} from 'model/Database';
import {Profile} from 'model/Profile';

@Component({
    selector: 'app-invite',
    templateUrl: './invite.component.html',
    styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {

    // private userName: String;
    // private email: String;
    private dataSetDetails: DataSetDetail[];

    public secondPage = false;

    @Input()
    databases: Database[];

    complexForm: FormGroup;
    profile: Profile;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                private inviteService: InviteService,
                private dataSetService: DataSetService,
                private databaseListServce: DatabaseListService,
                private changeDetector: ChangeDetectorRef,
                public dialogRef: MatDialogRef<InviteComponent>,
                public profileService: ProfileService,
                private logger: LogService,
                public router: Router,
                fb: FormBuilder) {

        this.complexForm = fb.group({});

    }

    ngOnInit() {
        this.profile = this.profileService.getProfileFromLocal();
        this.inviteService.getInvite(this.data.inviteId).subscribe(x => {
            if (x) {
                Observable.forkJoin(x.dataSets.map(record => {
                    return this.dataSetService.getDataSetDetail(record.id, record.source);
                })).subscribe(
                    y => {
                        this.dataSetDetails = y;
                    }
                );
            }
        });
    }

    deleteDataset(source: string, id: string) {
        const i: number = this.dataSetDetails.findIndex(x => x.source === source && x.id === id);
        if (i !== -1) {
            this.logger.info('deleting');
            this.dataSetDetails.splice(i, 1);
        }
    }

    getDatabaseUrl(source) {
        const db = this.databaseListServce.getDatabaseBySource(source, this.databases);
        if (!db) {
            this.logger.debug('source not found: {}', source);
        } else {
            return db.sourceUrl;
        }
    }

    getDatabaseTitle(source) {
        const db = this.databaseListServce.getDatabaseBySource(source, this.databases);
        if (!db) {
            this.logger.debug('source not found: {}', source);
        } else {
            return db.databaseName;
        }
    }

    checkchanged(checked: string, source: string, id: string) {
        const i: number = this.dataSetDetails.findIndex(x => x.source === source && x.id === id);
        if (i !== -1) {
            this.logger.debug('checked: {}', checked);
            if (!checked) {
                this.dataSetDetails[i]['unchecked'] = true;
            } else {
                this.dataSetDetails[i]['unchecked'] = null;
            }
        }
    }

    next() {
        this.secondPage = true;
        this.changeDetector.detectChanges();
    }

    prev() {
        this.secondPage = false;
        this.changeDetector.detectChanges();
    }

    ok() {
        if (this.dataSetDetails) {
            for (const ds of this.dataSetDetails.map(x => {
                const y = new DataSetShort();
                y.source = x.source;
                y.id = x.id;
                y.claimed = (new Date()).toDateString();
                if (!x['unchecked']) {
                    return y;
                }
            }).filter(x => x)) {
                if (!this.profile.dataSets) {
                    this.profile.dataSets = [];
                }
                if (!this.profile.dataSets.find(x => (x.source === ds.source && x.id === ds.id))) {
                    this.profile.dataSets.push(ds);
                }
            }
        }

        this.profileService.updateUser(this.profile).subscribe(x => {
                this.profileService.setProfile(this.profile);
                this.logger.info('user updated, {}', x);
                this.dialogRef.close();
            }
        );
    }

    cancel() {
        this.profileService.removeProfile();
        this.router.navigate(['home']);

        this.dialogRef.close();
    }
}
