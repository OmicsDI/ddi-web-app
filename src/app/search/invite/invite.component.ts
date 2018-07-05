import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {InviteService} from 'services/invite.service';
import {Observable} from 'rxjs/Observable';
import {DataSetService} from 'services/dataset.service';
import {DataSetDetail} from 'model/DataSetDetail';
import {DatabaseListService} from 'services/database-list.service';
import {ProfileService} from 'services/profile.service';
import {FormBuilder, FormGroup} from '@angular/forms';

import {Router} from '@angular/router';
import {DataSetShort} from 'model/DataSetShort';

@Component({
    selector: 'app-invite',
    templateUrl: './invite.component.html',
    styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {

    // private userName: String;
    // private email: String;
    private dataSetDetails: DataSetDetail[];

    private secondPage = false;

    complexForm: FormGroup;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any
        , private inviteService: InviteService
        , private dataSetService: DataSetService
        , private databaseListServce: DatabaseListService
        , private changeDetector: ChangeDetectorRef
        , public dialogRef: MatDialogRef<InviteComponent>
        , public profileService: ProfileService
        , public router: Router
        , fb: FormBuilder) {

        this.complexForm = fb.group({});

    }

    ngOnInit() {
        this.inviteService.getInvite(this.data.inviteId).subscribe(x => {
            if (x) {
                Observable.forkJoin(x.dataSets.map(r => {
                    return this.dataSetService.getDataSetDetail_private(r.id, r.source);
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
            console.log('deleting');
            this.dataSetDetails.splice(i, 1);
        }
    }

    getDatabaseUrl(source) {
        const db = this.databaseListServce.databases[source];
        if (!db) {
            console.log('source not found:' + source);
        } else {
            return db.sourceUrl;
        }
    }

    getDatabaseTitle(source) {
        const db = this.databaseListServce.databases[source];
        if (!db) {
            console.log('source not found:' + source);
        } else {
            return db.databaseName;
        }
    }

    checkchanged(checked: string, source: string, id: string) {
        const i: number = this.dataSetDetails.findIndex(x => x.source === source && x.id === id);
        if (i !== -1) {
            console.log('checked:' + checked);
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
                if (!this.profileService.profile.dataSets) {
                    this.profileService.profile.dataSets = [];
                }

                if (!this.profileService.profile.dataSets.find(x => (x.source === ds.source && x.id === ds.id))) {
                    this.profileService.profile.dataSets.push(ds);
                }
            }
        }

        this.profileService.updateUser().subscribe(x => {
                console.log('user updated' + x);
                this.dialogRef.close();
                this.profileService.getProfile().subscribe();
            }
        );
    }

    cancel() {
        localStorage.removeItem('id_token');
        this.profileService.profile = null;
        this.profileService.userId = null;
        this.router.navigate(['home']);

        this.dialogRef.close();
    }


}
