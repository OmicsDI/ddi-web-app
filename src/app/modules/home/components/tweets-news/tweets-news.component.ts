import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

@Component({
    selector: 'app-tweets-news',
    templateUrl: './tweets-news.component.html',
    styleUrls: ['./tweets-news.component.css']
})
export class TweetsNewsComponent implements OnInit {

    height: number;
    width: number;

    constructor(@Inject(PLATFORM_ID) private platformId: string) {
    }

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            const statisticWidth = document.getElementById('statisticspanel').offsetWidth;
            const statisticHeight = document.getElementById('statisticspanel').offsetHeight;
            let height = Math.sqrt(statisticWidth * statisticWidth + statisticHeight * statisticHeight) * 0.8;
            if (height < 400) {
                height = 400;
            }
            this.height = height;
            this.fetchTweets();
        }
    }

    private fetchTweets() {
        const s = document.createElement('script');
        s.src = 'https://platform.twitter.com/widgets.js';
        document.getElementsByTagName('head')[0].appendChild(s);
    }
}
