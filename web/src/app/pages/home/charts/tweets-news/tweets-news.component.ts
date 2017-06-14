import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Http, Response } from "@angular/http";
import * as d3 from 'd3';
import * as cheerio from 'cheerio';

@Component({
  selector: 'app-tweets-news',
  templateUrl: './tweets-news.component.html',
  styleUrls: ['./tweets-news.component.css']
})
export class TweetsNewsComponent implements OnInit {

  @Output()
  notifyHomeLoader:EventEmitter<string> = new EventEmitter<string>();

  constructor(private http: Http) { }

  ngOnInit() {
    this.fetchTweets()
        .then(res => {
           this.notifyHomeLoader.emit('tweet_news');
           this.publishtweets(this.parseTweets(res, 4));
        })
        .catch(reason => {
          console.warn(reason);
        })
  }

  private fetchTweets(): Promise<Response> {
    let id = '599190509341515776';
    let date = new Date().getTime();
    let url = '//cdn.syndication.twimg.com/widgets/timelines/' + encodeURIComponent(id) +
      '?&lang=en&callback=' + encodeURIComponent('tf_' + date + '.parse') +
      '&suppress_response_codes=true&rnd=' + (date);
    return this.http.get(url)
      .toPromise();
  }

  private parseTweets(res: Response, limit: number) {
    const $ = cheerio.load(JSON.parse(res["_body"])["body"]);
    let tweets = $("li.timeline-TweetList-tweet");
    limit = tweets.length < limit ? tweets.length : limit;
    let output = []
      , t = {}
      , monthNamesShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    if (tweets.length == 0) {
      this.publishtweets([{ content: "Your Browser can not get our news from twitter service now.", id: "111", time: {} }]);
    }

    $("li.timeline-TweetList-tweet")
      .filter(function (i) {
        return i < limit;
      })
      .each(function(i) {
        let that = $(this);
        t['id'] = that.find('.timeline-Tweet').data('tweet-id');

        let publishedtime = new Date(that.find('time.dt-updated').attr('datetime'))
          , publishedmonth = monthNamesShort[publishedtime.getMonth()]
          , publishedday = publishedtime.getDate();

        t["time"] = {
          month: publishedmonth,
          day: publishedday
        }

        let content = that.find('p.timeline-Tweet-text')
          , tags = content.find('*');

        tags.each(function(i, ele) {
          let self = $(this), k = 0, del = [];
          for (let m in ele.attribs) {
            if (m != 'href') {
              self.removeAttr(m);
            }
          }
        })

        t['content'] = content.html();
        output.push(t);
      });
    
    return output;
  }

  private publishtweets(data: any[]): void {
    d3.select("#tweets-of-the-month").selectAll("div").remove();
    d3.select("#tweets-of-the-month").append("div").selectAll("div")
      .data(data) // top level data-join
      .enter().append("div")
      .each(function () {
        let entrydiv = d3.select(this);
        entrydiv.attr("class", "row")
          .attr("style", "margin-left:8px; width:96%; margin-bottom:5px");
        let datebox = entrydiv.append("div").attr("class", "date-box");

        datebox.append("span").attr("class", "month")
          .text(function (d) {
            return d["time"].month;
          });
          
        datebox.append("span").attr("class", "day")
          .text(function (d) {
            return d["time"].day;
          });

        entrydiv.append("div").attr("class", "tweet_two_lines")

          .html(function (d) {
            return d["content"];
          });

      }
      );
  }
}
