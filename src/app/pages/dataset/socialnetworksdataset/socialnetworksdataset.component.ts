import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-socialnetworks-dataset',
  templateUrl: './socialnetworksdataset.component.html',
  styleUrls: ['./socialnetworksdataset.component.css']
})
export class SocialnetworksDatasetComponent implements OnInit {
  share_methods = {
    email: ["mailto:?body=[&subject=]"],
    twitter: ["https://twitter.com/intent/tweet?url=[&text=]", 450],
    facebook: ["https://www.facebook.com/sharer.php?u=[", 330],
    google: ["https://plus.google.com/share?url=[", 460],
    tumblr: ["https://www.tumblr.com/share/link?url=[&name=]", 450],
    linkedin: ["https://www.linkedin.com/shareArticle?mini=true&url=[", 520]
  }
  constructor() { }

  ngOnInit() {
  }

  click_share_this(label: string): void {
    console.log(label);
    let value = this.share_methods[label]
      , c = value[0].replace('[', encodeURIComponent(location.href)).replace(']', encodeURIComponent(document.title));
    
    value.length == 1 ? location.href = c : window.open(c, '_blank', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=500,height=' + value[1]);
  }
}
