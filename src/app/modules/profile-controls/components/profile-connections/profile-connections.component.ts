import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ProfileService} from '@shared/services/profile.service';
import {Profile} from 'model/Profile';
import {AppConfig} from 'app/app.config';
import {LogService} from '@shared/modules/logs/services/log.service';

@Component({
    selector: 'app-profile-connections',
    templateUrl: './profile-connections.component.html',
    styleUrls: ['./profile-connections.component.css']
})
export class ProfileConnectionsComponent implements OnInit, OnChanges {

    @Input() profile: Profile;

    googleConnected = false;
    orcidConnected = false;
    twitterConnected = false;
    elixirConnected = false;
    githubConnected = false;

    userId: string;

    constructor(public profileService: ProfileService, public appConfig: AppConfig, private logger: LogService) {
    }

    ngOnInit() {
        // this.getConnections(this.profile.userId);
    }


    ngOnChanges(changes: SimpleChanges) {
        for (const propName of Object.keys(changes)) {
            const chng = changes[propName];
            const cur = JSON.stringify(chng.currentValue);
            const prev = JSON.stringify(chng.previousValue);
            if (propName === 'profile') {
                if (null != chng.currentValue) {
                    this.userId = chng.currentValue.userId;
                    this.getConnections(this.userId);
                }
            }
        }
    }

    getConnections(userId: string) {
        this.profileService.getUserConnections(userId)
            .subscribe(
                connections => {
                    this.googleConnected = connections.some(x => x === 'google');
                    this.orcidConnected = connections.some(x => x === 'orcid');
                    this.twitterConnected = connections.some(x => x === 'twitter');
                    this.elixirConnected = connections.some(x => x === 'elixir');
                    this.githubConnected = connections.some(x => x === 'github');
                }
            );
    }

    connectedChanged(connected: boolean, provider: string) {
        this.logger.debug(`connectedChanged: ${provider} ${this.githubConnected}`);

        if (connected) { // disconnect
            this.logger.debug('disconnecting: {}', provider);
            this.profileService.deleteConnection(this.userId, provider).subscribe();
        } else { // connect
            // window.location.href=this.appConfig.getLoginUrl("github",this.appConfig.githubScope);
            this.logger.debug('connecting: {}', provider);
            this.profileService.connect(provider);
        }
    }


}
