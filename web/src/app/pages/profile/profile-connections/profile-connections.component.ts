import {Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges} from '@angular/core';
import {ProfileService} from "../../../services/profile.service";
import {Profile} from "../../../model/Profile";

@Component({
  selector: 'app-profile-connections',
  templateUrl: './profile-connections.component.html',
  styleUrls: ['./profile-connections.component.css']
})
export class ProfileConnectionsComponent implements OnInit, OnChanges {

  @Input() profile: Profile;

  facebookConnected: boolean = false;
  orcidConnected : boolean = false;
  twitterConnected : boolean = false;
  elixirConnected : boolean = false;
  githubConnected : boolean = false;

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    //console.info("getting user connections:" + this.profile.userId);
    //this.getConnections(this.profile.userId);
  }


  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let chng = changes[propName];
      let cur  = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);
      //console.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
      if(propName=="profile"){
        if(null!=chng.currentValue){
          this.getConnections(chng.currentValue.userId);
        }
      }
    }
  }

  getConnections(userId: string){
    this.profileService.getUserConnections(userId)
      .subscribe(
        connections => {
          this.facebookConnected = connections.some(x=>x=="facebook");
          this.orcidConnected = connections.some(x=>x=="orcid");
          this.twitterConnected = connections.some(x=>x=="twitter");
          this.elixirConnected = connections.some(x=>x=="elixir");
          this.githubConnected = connections.some(x=>x=="github");
        }
      )
  }


}
