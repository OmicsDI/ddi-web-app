import {Component, OnInit, PLATFORM_ID} from '@angular/core';
import {AsyncInitialisedComponent} from '@shared/components/async/async.initialised.component';
import {isPlatformServer} from '@angular/common';

@Component({
    selector: 'app-tweets-news',
    templateUrl: './tweets-news.component.html',
    styleUrls: ['./tweets-news.component.css'],
    providers: [ {provide: AsyncInitialisedComponent, useExisting: TweetsNewsComponent }]
})
export class TweetsNewsComponent extends AsyncInitialisedComponent implements OnInit {

    height: number;
    width: number;

    constructor() {
        super();
    }

    ngOnInit() {
        if (isPlatformServer(PLATFORM_ID)) {
            this.componentLoaded();
            return;
        }
        const statisticWidth = document.getElementById('statisticspanel').offsetWidth;
        const statisticHeight = document.getElementById('statisticspanel').offsetHeight;
        let height = Math.sqrt(statisticWidth * statisticWidth + statisticHeight * statisticHeight) * 0.8;
        if (height < 400) {
           height = 400;
        }
        this.height = height;
        this.fetchTweets();
    }

    private fetchTweets() {
        const s = document.createElement('script');
        s.src = 'https://platform.twitter.com/widgets.js';
        document.getElementsByTagName('head')[0].appendChild(s);
    }
}
