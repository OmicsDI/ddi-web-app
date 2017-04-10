import { Component, OnInit } from '@angular/core';
import { Http, Response } from "@angular/http";
import * as d3 from 'd3';

@Component({
  selector: 'app-tweets-news',
  templateUrl: './tweets-news.component.html',
  styleUrls: ['./tweets-news.component.css']
})
export class TweetsNewsComponent implements OnInit {

  constructor(private http: Http) { }

  ngOnInit() {
    this.fetchTweets()
        .then(res => {
           this.publishtweets(this.parseTweets(res, 4));
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
  private parseTweets(res: Response, limit: number): any[] {

    let _body: string = res["_body"];
    _body = _body.substring(_body.indexOf("(") + 1, _body.length - 2);
    let body = JSON.parse(_body)["body"];
    let raw = document.createElement('div');
    raw.innerHTML = body;
    let tweets = raw.querySelectorAll('li.timeline-TweetList-tweet');
    limit = (tweets.length < limit) ? tweets.length : limit;
    let output = [];
    let monthNamesShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    if (tweets.length == 0) {
      this.publishtweets([{ content: "Your Browser can not get our news from twitter service now.", id: "111", time: {} }]);
    }
    for (let i = 0; i < limit; i++) {
      let tr = tweets[i], t = {};
      //console.log("tr:  "+tr);
      t["id"] = tr.getAttribute('data-tweet-id');
      let publishedtime = new Date(tr.querySelector('time.dt-updated').getAttribute('datetime'));
      let publishedmonth = monthNamesShort[publishedtime.getMonth()];
      let publishedday = publishedtime.getDate();
      t["time"] = {
        month: publishedmonth,
        day: publishedday
      }
      let content = tr.querySelector('p.timeline-Tweet-text'),
        tags = content.querySelectorAll('*');
      for (let j = 0; j < tags.length; j++) {
        let tag = tags[j], k = 0, del = [];

        for (k = 0; k < tag.attributes.length; k++)
          if (tag.attributes[k].name !== 'href')
            del.push(tag.attributes[k].name);

        while (del.length)
          tag.removeAttribute(del.pop());
      }

      t["content"] = content.innerHTML.replace(/<\/?b[^>]*>/gi, '');
      output.push(t);
    }

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
          .attr("style", "margin-left:8px; width:96%; margin-bottom:5px")
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
