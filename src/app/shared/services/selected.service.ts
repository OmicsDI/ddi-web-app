import {Injectable} from '@angular/core';
import {DataSetShort} from 'model/DataSetShort';
import {ProfileService} from './profile.service';
import {NotificationsService} from 'angular2-notifications/dist';

@Injectable()
export class SelectedService {

    private userId: string;

    private i = 0;

    public dataSets: DataSetShort[] = [];

    constructor(public profileService: ProfileService
        , private notificationService: NotificationsService) {

        this.profileService.getProfile().subscribe(x => {
            this.profileService.getSelected(x.userId).subscribe(
                r => {
                    this.dataSets = r;
                }
            );
        });
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
        let profile;
        if (this.profileService.isAuthorized()) {
            profile = this.profileService.getProfileFromLocal();
            this.profileService.setSelected(profile.userId, this.dataSets).subscribe(x => {
            });

            this.notificationService.success('Selection saved', 'in your dashboard');
        } else {
            this.profileService.getProfile().subscribe( x => {
                profile = x;
                this.profileService.setSelected(profile.userId, this.dataSets).subscribe(p => {
                });

                this.notificationService.success('Selection saved', 'in your dashboard');
            });
        };
    }
}
