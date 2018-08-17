import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ProfileService} from '@shared/services/profile.service';
import {Profile} from 'model/Profile';
import {UserShort} from 'model/UserShort';
import {LogService} from '@shared/modules/logs/services/log.service';

@Component({
    selector: 'app-profile-coauthors',
    templateUrl: './profile-coauthors.component.html',
    styleUrls: ['./profile-coauthors.component.css']
})
export class ProfileCoauthorsComponent implements OnInit, OnChanges {
    @Input() profile: Profile;
    @Output() change = new EventEmitter();

    coauthors: UserShort[];

    constructor(public profileService: ProfileService, private logger: LogService) {
    }

    ngOnInit() {
        this.profileService.getCoAuthors('1234');
    }

    ngOnChanges(changes: SimpleChanges) {
        for (const propName of Object.keys(changes)) {
            const chng = changes[propName];
            const cur = JSON.stringify(chng.currentValue);
            const prev = JSON.stringify(chng.previousValue);
            if (propName === 'profile') {
                if (null != chng.currentValue) {
                    this.logger.debug(`profile-coauthors ngOnChanges: ${chng.currentValue.userId}`);
                    this.profileService.getCoAuthors(chng.currentValue.userId).subscribe(
                        x => this.coauthors = x);

                    this.logger.debug(`after profile-coauthors ngOnChanges: ${chng.currentValue.userId}`);
                    this.profile = chng.currentValue;
                }
            }
        }
    }

    add(user: UserShort) {
        if (!this.profile.coauthors) {
            this.profile.coauthors = [];
        }

        const index: number = this.profile.coauthors.findIndex(x => x.userId === user.userId);

        if (index === -1) {
            this.profile.coauthors.push(user);
            this.change.emit(null);
        }
    }

    remove(userId: string) {
        const index: number = this.profile.coauthors.findIndex(x => x.userId === userId);
        if (index !== -1) {
            this.profile.coauthors.splice(index, 1);
        }
        this.change.emit(null);
    }
}
