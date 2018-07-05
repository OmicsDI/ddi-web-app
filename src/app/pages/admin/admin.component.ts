import {Component, OnInit} from '@angular/core';
import {ProfileService} from 'services/profile.service';
import {Profile} from 'model/Profile';
import {AppConfig} from 'app/app.config';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

    public profiles: Profile[];

    constructor(private profileService: ProfileService, private appConfig: AppConfig) {
    }

    ngOnInit() {
        this.profileService.getAllProfiles().subscribe(x => this.profiles = x);
    }
}
