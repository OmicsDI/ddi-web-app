import {AfterViewInit, Component, QueryList, ViewChildren} from '@angular/core';
import {AsyncInitialisedComponent} from '@shared/components/async/async.initialised.component';
import {NgProgress} from '@ngx-progressbar/core';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {


    @ViewChildren(AsyncInitialisedComponent)
    asyncComponents: QueryList<AsyncInitialisedComponent>;

    constructor(private loadingBarService: NgProgress, private titleService: Title) {
        this.loadingBarService.start();
    }

    ngAfterViewInit() {
        let total = this.asyncComponents.length;
        this.titleService.setTitle('OmicsDI: Home');
        this.asyncComponents.map(e => e.loadedState$).forEach(e => e.subscribe(loaded => {
            if (loaded) {
                total -= 1;
            }
            if (total === 0) {
                this.loadingBarService.complete();
            }
        }));
    }

}
