var TweetFetcher = function(id)
{
    this.id = id;
    this.instance = 'tf_' + (new Date().getTime());
    window[this.instance] = this;
};
 
TweetFetcher.prototype.fetch = function(cb, limit)
{
    this.cb = cb;
    this.limit = limit || 30;
//  console.log(this.limit);
    var s = document.createElement('script');
    s.src = '//cdn.syndication.twimg.com/widgets/timelines/' + encodeURIComponent(this.id) +
            '?&lang=en&callback=' + encodeURIComponent(this.instance + '.parse') +
            '&suppress_response_codes=true&rnd=' + (new Date().getTime());
    document.getElementsByTagName('head')[0].appendChild(s);
};
 
TweetFetcher.prototype.parse = function(res)
{
    var raw = document.createElement('div');
    raw.innerHTML = res.body;
 
    var tweets = raw.querySelectorAll('li.tweet'),
        limit  = (tweets.length < this.limit) ? tweets.length : this.limit,
        output = [];
    var month_names_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']; 
 
    if (tweets.length == 0){
        publishtweets([{content:"Your Browser can not get our news from twitter service now.",id:"111",time:{}}]);
   }
    for (var i = 0; i < limit; i++) {
        var tr = tweets[i], t = {};
//        console.log("tr:  "+tr); 
        t.id = tr.getAttribute('data-tweet-id');
        // t.author = {
        //     handle: tr.querySelector('span.p-nickname b').innerText,
        //     name: tr.querySelector('span.p-name').innerText
        // };
        // t.time = {
        //     stamp: tr.querySelector('time.dt-updated').getAttribute('datetime'),
        //     pretty: tr.querySelector('time.dt-updated').getAttribute('aria-label')
        // }
         var publishedtime = new Date(tr.querySelector('time.dt-updated').getAttribute('datetime'));
         var publishedmonth =  month_names_short[publishedtime.getMonth()]; 
         var publishedday=  publishedtime.getDate(); 

         t.time = {
             month: publishedmonth,
             day: publishedday
           }
        // t.isRetweet = !! tr.querySelector('.retweet-credit');
        // t.retweets = tr.querySelector('span.stats-retweets')
        //     ? parseInt(tr.querySelector('span.stats-retweets').innerText.replace(',', ''), 10)
        //     : 0;
 
        // delete all unnecessary tweet content tags
 
        var content = tr.querySelector('p.e-entry-title'),
            tags = content.querySelectorAll('*');
 
        for (var j = 0; j < tags.length; j++) {
            var tag = tags[j], k = 0, del = [];
 
            for (k = 0; k < tag.attributes.length; k++)
                if (tag.attributes[k].name !== 'href')
                    del.push(tag.attributes[k].name);
 
            while (del.length)
                tag.removeAttribute(del.pop());
        }
 
        t.content = content.innerHTML.replace(/<\/?b[^>]*>/gi, '');
//         console.log(i+"st content:"+t.content); 
        output.push(t);
    }
 
    this.cb(output);
};

publishtweets =  function (data) {

  d3.select("#tweets-of-the-month").append("div").selectAll("div")
    .data(data) // top level data-join
  .enter().append("div")
    .each(function() {
      var entrydiv = d3.select(this);
      entrydiv.attr("class","row")
              .attr("style","margin-left:3px; width:96%")
      var datebox = entrydiv.append("div").attr("class","date-box");
      datebox.append("span").attr("class","month")      
          .text(function(d) { return d.time.month; });
      datebox.append("span").attr("class","day")      
          .text(function(d) { return d.time.day; });

      entrydiv.append("div").attr("class","justify-body-text")

          .html(function(d) { return d.content; });
      
    }

);
}
