import {Component, Input, OnInit} from '@angular/core';
import {AppConfig} from 'app/app.config';
import {ProfileService} from '@shared/services/profile.service';
import {Profile} from 'model/Profile';

@Component({
    selector: 'app-profile-contacts',
    templateUrl: './profile-contacts.component.html',
    styleUrls: ['./profile-contacts.component.css']
})

export class ProfileContactsComponent implements OnInit {

    @Input() profile: Profile = new Profile();

    constructor(public appConfig: AppConfig,
                public profileService: ProfileService) {
    }

    ngOnInit() {
    }

    contactInfoPresent(): boolean {
        if (!this.profileService.profile) {
            return false;
        }
        return this.profile.isPublic
            || (this.profile.affiliation !== ''
                && this.profileService.profile.email !== ''
                && this.profileService.profile.homepage !== ''
                && this.profileService.profile.orcid !== '');
    }
}
