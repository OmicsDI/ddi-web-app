import {Component, Inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {AuthService} from '@shared/services/auth.service';
import {AppConfig} from 'app/app.config';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from '@angular/router';
import {isPlatformServer, Location, PopStateEvent, DOCUMENT} from '@angular/common';
import {ProfileService} from '@shared/services/profile.service';
import {DataTransportService} from '@shared/services/data.transport.service';
import {Profile} from 'model/Profile';
import {GoogleAnalyticsService} from '@shared/services/google-analytics.service';
import {Subscription, SubscriptionLike} from 'rxjs';
import {environment} from 'environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
    title: string;
    topDomain: string;
    logoUri: string;
    topStripClass: string;
    showSmallSearch = true;
    private lastPoppedUrl: string;
    private yScrollStack: number[] = [];
    selectedComponents = 0;
    selectedChannel: 'selected_channel';
    isCollapsedNav = true;
    inDashboardView = false;
    profile: Profile;
    private subscriptions: Subscription[] = [];
    private locationSubcription: SubscriptionLike;
    public simpleNotificationsOptions = {timeOut: 1000, position: ['bottom', 'right'], animate: 'scale'};

    constructor(public auth: AuthService,
                private route: ActivatedRoute,
                private router: Router,
                private location: Location,
                @Inject(PLATFORM_ID) private platformId,
                @Inject(DOCUMENT) private document,
                private dataTransporterService: DataTransportService,
                private googleAnalyticsService: GoogleAnalyticsService,
                private profileService: ProfileService,
                public appConfig: AppConfig) {

        if (window.location.href.startsWith('http://www.omicsdi.org')) {
            window.location.href = window.location.href.replace('http:', 'https:');
        }
        this.inDashboardView = window.location.href.includes('www.omicsdi.org/dashboard');
        this.topDomain = this.appConfig.getTopDomain();
        if (this.topDomain != "omics") {
            this.topDomainIsOmicsDI = false;
        }
        this.title = this.appConfig.getTitle();
        this.logoUri = this.appConfig.getLogoUri();
        this.topStripClass = this.appConfig.getTopStripClass();
    }

    ngOnInit() {
        const bases = this.document.getElementsByTagName('base');

        if (bases.length > 0) {
            bases[0].setAttribute('href', environment.baseHref);

        }
        if (isPlatformServer(this.platformId)) {
            return;
        }
        this.googleAnalyticsService.subscribe();
        this.locationSubcription = this.location.subscribe((ev: PopStateEvent) => {
            this.lastPoppedUrl = ev.url;
        });
        this.subscriptions.push(this.router.events.subscribe((ev: any) => {
            this.isCollapsedNav = true;
            const url = this.router.url;
            this.showSmallSearch = url !== '/home' && url !== '/';
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
        }));
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
                    this.subscriptions.push(this.dataTransporterService.listen(this.selectedChannel).subscribe(datasets => {
                        this.selectedComponents = datasets.length;
                    }));
                    this.subscriptions.push(this.dataTransporterService.listen('user_profile').subscribe(() => {
                        this.profile = this.profileService.getProfileFromLocal();
                    }));
                }
            });
        });
    }

    logOut() {
        // this.deleteCookie('AUTH-TOKEN');
        this.googleAnalyticsService.trackEvent('security', `logout ${this.profile.userId}`);
        localStorage.removeItem('id_token');
        this.profileService.removeProfile();
        window.location.href = '/home';
    }

    gotoHelp() {
        window.location.href = 'http://blog.omicsdi.org/';
    }

    gotoHelpApi() {
        window.location.href = 'http://blog.omicsdi.org/post/introduction-api/';
    }

    gotoOmicsDISpec() {
        window.location.href = 'http://blog.omicsdi.org/post/omicsdi-spec/';
    }

    gotoWs() {
        window.location.href = 'https://www.omicsdi.org/ws';
    }

    toSubmission() {
        window.location.href = 'https://www.ebi.ac.uk/biostudies/';
    }

    ngOnDestroy(): void {
        if (!isPlatformServer(this.platformId)) {
            this.googleAnalyticsService.unsubscribe();
            this.locationSubcription.unsubscribe();
            this.subscriptions.forEach(sub => {
                sub.unsubscribe();
            });
        }
    }

}
