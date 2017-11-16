import {Component, ViewChild} from '@angular/core';
import { AuthService } from './services/auth.service';
import {DropdownModule} from "ng2-dropdown";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";
import {QueryBuilderComponent} from "./controls/query-builder/query-builder.component";
import {SearchQuery} from "./model/SearchQuery";
import {ActivatedRoute, Router} from "@angular/router";
import {SelectedService} from "./services/selected.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title : string;
  homePage: boolean;

  constructor(private auth: AuthService, private slimLoadingBarService: SlimLoadingBarService
    , private route: ActivatedRoute
    , private router: Router
    , private selectedService: SelectedService){

      if (window.location.href.startsWith("http://www.omicsdi.org")) {
        window.location.href = window.location.href.replace("http:", "https:");
      }

    this.title =this.getTitle();
  }

  ngOnInit() {
    this.router.events.subscribe(x => {
      this.homePage = (this.router.url === "/home");
    });
  }

  getTitle(): string{
    let result = 'Omics DI 2.0';
    return result;
  }

  startLoading() {
    this.slimLoadingBarService.start(() => {
      console.log('Loading complete');
    });
  }

  stopLoading() {
    this.slimLoadingBarService.stop();
  }

  completeLoading() {
    this.slimLoadingBarService.complete();
  }


  public simpleNotificationsOptions = {timeOut:500,position: ["bottom", "right"],animate:"scale"};

  gotoHelp(){
    window.location.href='http://blog.omicsdi.org/';
  }

}
