import {Component, OnInit, PLATFORM_ID} from '@angular/core';
import {AuthService} from '@shared/services/auth.service';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from '@angular/router';
import {isPlatformBrowser, Location, PopStateEvent} from '@angular/common';
import {ProfileService} from '@shared/services/profile.service';
import {DataTransportService} from '@shared/services/data.transport.service';
import {Profile} from 'model/Profile';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    title: string;
    homePage = true;
    private lastPoppedUrl: string;
    private yScrollStack: number[] = [];
    selectedComponents = 0;
    selectedChannel: 'selected_channel';
    isCollapsedNav = true;
    isLogged = false;
    profile: Profile;
    public simpleNotificationsOptions = {timeOut: 500, position: ['bottom', 'right'], animate: 'scale'};

    constructor(public auth: AuthService,
                private route: ActivatedRoute,
                private router: Router,
                private location: Location,
                private dataTransporterService: DataTransportService,
                private profileService: ProfileService) {

        if (window.location.href.startsWith('http://www.omicsdi.org')) {
            window.location.href = window.location.href.replace('http:', 'https:');
        }

        this.title = this.getTitle();
    }

    ngOnInit() {
        this.location.subscribe((ev: PopStateEvent) => {
            this.lastPoppedUrl = ev.url;
        });
        this.router.events.subscribe((ev: any) => {
            this.isCollapsedNav = true;
            this.homePage = (this.router.url === '/home') || (this.router.url === '/');
            if (isPlatformBrowser(PLATFORM_ID)) {
                if (ev instanceof NavigationStart) {
                    if (ev.url !== this.lastPoppedUrl) {
                        this.yScrollStack.push(window.scrollY);
                    }
                } else if (ev instanceof NavigationEnd) {
                    if (ev.url === this.lastPoppedUrl) {
                        this.lastPoppedUrl = undefined;
                        window.scrollTo(0, this.yScrollStack.pop());
                    } else {
                        window.scrollTo(0, 0);
                    }
                }
            }
        });
        this.auth.loggedIn().then(isLogged => {
            if (isLogged) {
                this.profile = this.profileService.getProfileFromLocal();
            }
            // Always reload user information one time when user refresh the page
            this.profileService.getProfile().subscribe(profile => {
                this.profileService.setProfile(profile);
                if (isLogged) {
                    isLogged = true;
                    this.profileService.getSelected(this.profileService.getProfileFromLocal().userId).subscribe(datasets => {
                        this.selectedComponents = datasets.length;
                    });
                    this.dataTransporterService.listen(this.selectedChannel).subscribe(datasets => {
                        this.selectedComponents = datasets.length;
                    });
                    this.dataTransporterService.listen('user_profile').subscribe(() => {
                        this.profile = this.profileService.getProfileFromLocal();
                    });
                }
            });
        });
    }

    logOut() {
        // this.deleteCookie('AUTH-TOKEN');
        localStorage.removeItem('id_token');
        this.profileService.removeProfile();
        window.location.href = '/home';
    }

    getTitle(): string {
        const result = 'Omics DI 2.0';
        return result;
    }

    gotoHelp() {
        window.location.href = 'http://blog.omicsdi.org/';
    }


    toSubmission() {
        window.location.href = 'https://www.ebi.ac.uk/biostudies/';
    }

}
