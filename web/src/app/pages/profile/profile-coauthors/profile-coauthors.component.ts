import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ProfileService} from "../../../services/profile.service";
import {Profile} from "../../../model/Profile";
import {UserShort} from "../../../model/UserShort";

@Component({
  selector: 'app-profile-coauthors',
  templateUrl: './profile-coauthors.component.html',
  styleUrls: ['./profile-coauthors.component.css']
})
export class ProfileCoauthorsComponent implements OnInit {
  @Input() profile: Profile;
  @Output() change = new EventEmitter();

  constructor(private profileService: ProfileService) { }
  ngOnInit() {
    this.profileService.getCoAuthors("1234")
  }

  add(user: UserShort){
    if(!this.profile.coauthors)
      this.profile.coauthors = new Array<UserShort>();

    let index: number = this.profile.coauthors.findIndex(x => x.userId == user.userId);

    if(index===-1) {
      this.profile.coauthors.push(user);
      this.change.emit(null);
    }
  }

  remove(userId: string){
    let index: number = this.profile.coauthors.findIndex(x => x.userId == userId);
    if (index !== -1) {
      this.profile.coauthors.splice(index, 1);
    }
    this.change.emit(null);
  }
}
