import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import {DropdownModule} from "ng2-dropdown";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title : string;

  constructor(private auth: AuthService, private slimLoadingBarService: SlimLoadingBarService){
    this.title =this.getTitle();
  }

  getTitle(): string{
    let result = 'appp worrks';
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
}
