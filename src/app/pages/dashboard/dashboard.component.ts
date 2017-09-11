import { Component, OnInit } from '@angular/core';
import {ProfileService} from "../../services/profile.service";
import {SavedSearch} from "../../model/SavedSearch";
import {WatchedDataset} from "../../model/WatchedDataset";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private profileService: ProfileService) { }

  private savedSearches: SavedSearch[] = new Array();
  private watchedDatasets: WatchedDataset[] = new Array();

  ngOnInit() {
    if(this.profileService.profile){
      this.profileService.getSavedSearches(this.profileService.profile.userId).subscribe(x => {
        console.log("saved searches received:" + x.length);
        this.savedSearches = x;
      });
      this.profileService.getWatchedDatasets(this.profileService.profile.userId).subscribe(x => {
        console.log("saved searches received:" + x.length);
        this.watchedDatasets = x;
      });
    }else {
      this.profileService.onProfileReceived.subscribe(x => {
        this.profileService.getSavedSearches(x.userId).subscribe(x => {
          console.log("saved searches received:" + x.length);
          this.savedSearches = x;
        });
        this.profileService.getWatchedDatasets(this.profileService.profile.userId).subscribe(x => {
          console.log("saved searches received:" + x.length);
          this.watchedDatasets = x;
        });
      })
    }
  }

  delete(id:string){
    this.profileService.deleteSavedSearch(id).subscribe(
      x => {
        console.log("savedSearch deleted");
        var i = this.savedSearches.findIndex( x => x.id == id);
        this.savedSearches.splice(i,1);
      }
    );
  }

  deleteWatch(id:string){
    this.profileService.deleteWatchedDataset(id).subscribe(
      x => {
        console.log("watchedDataset deleted");
        var i = this.watchedDatasets.findIndex( x => x.id == id);
        this.watchedDatasets.splice(i,1);
      }
    );
  }

}
