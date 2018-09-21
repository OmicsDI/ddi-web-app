import {Component, OnInit} from '@angular/core';
import {AsyncInitialisedComponent} from '@shared/components/async/async.initialised.component';

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
        const statisticWidth = document.getElementById('statisticspanel').offsetWidth;
        const aboutHeight = document.getElementById('home-about').offsetHeight;
        this.width = statisticWidth;
        this.height = statisticWidth > aboutHeight ? statisticWidth * 0.9 : aboutHeight;
        this.fetchTweets();
        this.componentLoaded();
    }

    private fetchTweets() {
        const s = document.createElement('script');
        s.src = 'https://platform.twitter.com/widgets.js';
        document.getElementsByTagName('head')[0].appendChild(s);
    }
}
