import {Component, OnInit} from '@angular/core';
import * as d3 from 'd3';
import * as cheerio from 'cheerio';
import {AsyncInitialisedComponent} from '@shared/components/async/async.initialised.component';

@Component({
    selector: 'app-tweets-news',
    templateUrl: './tweets-news.component.html',
    styleUrls: ['./tweets-news.component.css'],
    providers: [ {provide: AsyncInitialisedComponent, useExisting: TweetsNewsComponent }]
})
export class TweetsNewsComponent extends AsyncInitialisedComponent implements OnInit {
    id = '599190509341515776';

    constructor() {
        super();
    }

    ngOnInit() {
        this.fetchTweets();
        this.componentLoaded();
        const self = this;

        setTimeout(function () {
            self.checkTweets();
        }, 100);
    }

    checkTweets() {
        const self = this;
        const t = localStorage.getItem('__twttr');
        if (t) {
            self.publishtweets(self.parseTweets(localStorage.getItem('__twttr'), 7));
        } else {
            setTimeout(function () {
                self.checkTweets();
            }, 100);
        }
    }

    private fetchTweets() {
        const s = document.createElement('script');
        s.src = '//cdn.syndication.twimg.com/widgets/timelines/' + encodeURIComponent(this.id) +
            '?&lang=en&callback=__twttr.parse' +
            '&suppress_response_codes=true&rnd=' + (new Date().getTime());
        document.getElementsByTagName('head')[0].appendChild(s);
    }

    private parseTweets(res: string, limit: number) {
        const $ = cheerio.load(JSON.parse(res)['body']);
        const tweets = $('li.timeline-TweetList-tweet');
        limit = tweets.length < limit ? tweets.length : limit;
        const output = []
            , monthNamesShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let t = {};

        if (tweets.length === 0) {
            this.publishtweets([{content: 'Your Browser can not get our news from twitter service now.', id: '111', time: {}}]);
        }

        $('li.timeline-TweetList-tweet')
            .filter(function (i) {
                return i < limit;
            })
            .each(function (i) {
                const that = $(this);
                t['id'] = that.find('.timeline-Tweet').data('tweet-id');

                const publishedtime = new Date(that.find('time.dt-updated').attr('datetime'))
                    , publishedmonth = monthNamesShort[publishedtime.getMonth()]
                    , publishedday = publishedtime.getDate();

                t['time'] = {
                    month: publishedmonth,
                    day: publishedday
                };

                const content = that.find('p.timeline-Tweet-text')
                    , tags = content.find('*');

                tags.each(function (k, ele) {
                    const self = $(this);
                    for (const m in ele.attribs) {
                        if (m !== 'href') {
                            self.removeAttr(m);
                        }
                    }
                });

                t['content'] = decodeURIComponent(content.html());
                output.push(t);
                t = {};
            });
        return output;
    }

    private publishtweets(data: any[]): void {
        d3.select('#tweets-of-the-month').selectAll('div').remove();
        d3.select('#tweets-of-the-month').append('div').selectAll('div')
            .data(data) // top level data-join
            .enter().append('div')
            .each(function () {
                    const entrydiv = d3.select(this);
                    entrydiv.attr('class', 'row')
                        .attr('style', 'margin-left:8px; width:96%; margin-bottom:5px');
                    const datebox = entrydiv.append('div').attr('class', 'date-box');

                    datebox.append('span').attr('class', 'month')
                        .text(function (d) {
                            return d['time'].month;
                        });

                    datebox.append('span').attr('class', 'day')
                        .text(function (d) {
                            return d['time'].day;
                        });

                    entrydiv.append('div').attr('class', 'tweet_two_lines')

                        .html(function (d) {
                            return d['content'];
                        });

                }
            );
    }
}
