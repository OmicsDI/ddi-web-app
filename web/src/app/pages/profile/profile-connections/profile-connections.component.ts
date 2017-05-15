import {Component, OnInit, Input} from '@angular/core';
import {ProfileService} from "../../../services/profile.service";

@Component({
  selector: 'app-profile-connections',
  templateUrl: './profile-connections.component.html',
  styleUrls: ['./profile-connections.component.css']
})
export class ProfileConnectionsComponent implements OnInit {

  @Input() userId: string;

  facebookConnected: boolean = false;
  orcidConnected : boolean = false;

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.getConnections(this.userId);
  }

  getConnections(userId: string){
    this.profileService.getUserConnections(userId)
      .subscribe(
        connections => {

          console.info("getting user connections");

          this.facebookConnected = connections.some(x=>x=="facebook");
          this.orcidConnected = connections.some(x=>x=="orcid");
        }
      )
  }


}
