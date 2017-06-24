import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-disqus',
  templateUrl: './profile-disqus.component.html',
  styleUrls: ['./profile-disqus.component.css',
    '../profile.css']
})


export class ProfileDisqusComponent implements OnInit {

  page_identifier:String = "profile";

  constructor() { }

  ngOnInit() {
  }

}


