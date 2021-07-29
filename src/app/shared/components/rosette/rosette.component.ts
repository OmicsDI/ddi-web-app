import {Component, Inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {AuthService} from '@shared/services/auth.service';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from '@angular/router';
import {isPlatformServer, Location, PopStateEvent, DOCUMENT} from '@angular/common';
import {ProfileService} from '@shared/services/profile.service';
import {DataTransportService} from '@shared/services/data.transport.service';
import {Profile} from 'model/Profile';
import {Subscription, SubscriptionLike} from 'rxjs';
import {environment} from 'environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './rosette.component.html',
    styleUrls: ['./rosette.component.css']
})

export class RosetteComponent implements OnInit, OnDestroy {
    title: string;
    private lastPoppedUrl: string;
    private yScrollStack: number[] = [];
    selectedComponents = 0;

    isCollapsedNav = true;
    inDashboardView = false;
    profile: Profile;
    private subscriptions: Subscription[] = [];
    private locationSubcription: SubscriptionLike;
   
    constructor(public auth: AuthService,
                private route: ActivatedRoute,
                private router: Router,
                private location: Location,
                @Inject(PLATFORM_ID) private platformId,
                @Inject(DOCUMENT) private document,
                private dataTransporterService: DataTransportService,
                private profileService: ProfileService) {

        if (window.location.href.startsWith('http://www.omicsdi.org')) {
            window.location.href = window.location.href.replace('http:', 'https:');
        }
        this.inDashboardView = window.location.href.includes('www.omicsdi.org/dashboard');
    }

    ngOnInit() {
        const bases = this.document.getElementsByTagName('base');

        if (bases.length > 0) {
            bases[0].setAttribute('href', environment.baseHref);

        }
        if (isPlatformServer(this.platformId)) {
            return;
        }
        this.locationSubcription = this.location.subscribe((ev: PopStateEvent) => {
            this.lastPoppedUrl = ev.url;
        });
        this.subscriptions.push(this.router.events.subscribe((ev: any) => {
            this.isCollapsedNav = true;
            const url = this.router.url;
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
    }

    ngOnDestroy(): void {
        if (!isPlatformServer(this.platformId)) {
            this.locationSubcription.unsubscribe();
            this.subscriptions.forEach(sub => {
                sub.unsubscribe();
            });
        }
    }

}
