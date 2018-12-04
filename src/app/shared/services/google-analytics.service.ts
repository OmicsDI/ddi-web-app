import {Injectable} from '@angular/core';
import {Subscription} from 'rxjs';
import {Router, NavigationEnd} from '@angular/router';
import {LogService} from '@shared/modules/logs/services/log.service';

// --- use a declare to allow the compiler find the ga function
declare let ga: Function;

// notes: npm install --save-dev @types/google.analytics
@Injectable()

/** */
export class GoogleAnalyticsService {

    private subscription: Subscription;

    constructor(private router: Router, private logging: LogService) {

    }

    /**
     * Track an event with your custom data in google analytics
     * -
     * @param {string} category Typically the object that was interacted with (e.g. 'Video')
     * @param {string} label The type of interaction (e.g. 'play')
     * @param {string} [action=null] Useful for categorizing events (e.g. 'Fall Campaign')
     * @param {number} [value=null] A numeric value associated with the event (e.g. 42)
     * @memberof GoogleAnalyticsEventService
     */
    public trackEvent(category: string, label: string, action: string = null, value: number = null) {
        try {
            ga('send', 'event', { eventCategory: category, eventLabel: label,
                eventAction: action, eventValue: value
            } );
        } catch (error) {
            this.logging.debug('error: {}', error);
        }
    }

    public subscribe() {
        if (!this.subscription) {
            // subscribe to any router navigation and once it ends, write out the google script notices
            this.subscription = this.router.events.subscribe( e => {
                if (e instanceof NavigationEnd && e.urlAfterRedirects.indexOf('/dashboard') === -1) {
                    // this will find & use the ga function pulled via the google scripts
                    try {
                        ga('set', 'page', e.urlAfterRedirects);
                        ga('send', 'pageview');
                    } catch {
                        // console.log('tracking not found');
                    }
                }
            });
        }
    }

    public unsubscribe() {
        if (this.subscription) {
            // --- clear our observable subscription
            this.subscription.unsubscribe();
        }
    }
}
