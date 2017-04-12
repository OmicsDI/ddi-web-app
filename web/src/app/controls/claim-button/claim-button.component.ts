import {Component, OnInit, Input} from '@angular/core';
import {ProfileService} from "../../services/profile.service";
import {AuthService} from "../../services/auth.service";
import {Profile} from "../../model/profile";

@Component({
  selector: 'claim-button',
  templateUrl: './claim-button.component.html',
  styleUrls: ['./claim-button.component.css']
})
export class ClaimButtonComponent implements OnInit {

  @Input() repository: string;
  @Input() accession: string;
  profile:Profile;
  claimed:boolean;
  userId:string;

  constructor(private auth: AuthService, private profileService: ProfileService) {
  }

  ngOnInit() {
    this.getProfile();
  }

  getProfile(){
    this.profileService.getProfile()
      .subscribe(
        profile => {
          this.profile = profile;
          this.userId = profile.userId;
          let obj: any = profile.dataSets.find(x => x.dataSetId == this.accession && x.source == this.repository);
          this.claimed = (null != obj) ;
        }
      );
  }

  claimDataset(){
    this.profileService.claimDataset(this.userId, this.accession, this.repository);
    this.claimed = true;
  }
}
