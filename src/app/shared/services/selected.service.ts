import {Injectable} from '@angular/core';
import {DataSetShort} from 'model/DataSetShort';
import {ProfileService} from './profile.service';
import {NotificationsService} from 'angular2-notifications/dist';
import {AuthService} from '@shared/services/auth.service';
import {Profile} from 'model/Profile';

@Injectable()
export class SelectedService {

    private userId: string;

    private i = 0;

    public dataSets: DataSetShort[] = [];

    profile: Profile;

    constructor(public profileService: ProfileService,
                private authService: AuthService,
                private notificationService: NotificationsService) {
        if (this.authService.loggedIn()) {
            this.profile = this.profileService.getProfileFromLocal();
            this.profileService.getSelected(this.profile.userId).subscribe(
                r => {
                    this.dataSets = r;
                }
            );
        }
    }

    public select(source, accession) {
        this.i += 1;
    }

    public unselect(source, id) {
        const i: number = this.dataSets.findIndex(x => x.id === id && x.source === source);
        if (i > -1) {
            this.dataSets.splice(i, 1);
        }
        // return this.profileService.setSelected(this.profileService.userId,this.dataSets).subscribe(x => {
        //
        // });
        this.notificationService.success('Dataset UnSelected', 'in your dashboard');
    }

    public isSelected(source, id): boolean {
        const i: number = this.dataSets.findIndex(x => x.id === id && x.source === source);
        return (i > -1);
    }

    public selected() {
        // this.profileService.getSelected(this.profileService.userId).subscribe(x=>{
        //  this.dataSets = x;
        // });

        return this.dataSets.length;
    }

    public toggle(source, id) {

        const i: number = this.dataSets.findIndex(x => x.id === id && x.source === source);
        if (i > -1) {
            this.dataSets.splice(i, 1);
        } else {
            this.dataSets.push({id: id, source: source, name: '', claimed: '0', omics_type: null});
        }
        if (this.authService.loggedIn()) {
            const profile = this.profileService.getProfileFromLocal();
            this.profileService.setSelected(profile.userId, this.dataSets).subscribe(x => {});

            this.notificationService.success('Selection saved', 'in your dashboard');
        }
    }
}
