import {AfterViewInit, Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import {SearchService} from '@shared/services/search.service';
import {DataControl} from 'model/DataControl';
import {DataTransportService} from '@shared/services/data.transport.service';
import {AsyncInitialisedComponent} from '@shared/components/async/async.initialised.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {


    @ViewChildren(AsyncInitialisedComponent)
    asyncComponents: QueryList<AsyncInitialisedComponent>;

    constructor(private loadingBarService: SlimLoadingBarService) {
        this.loadingBarService.start();
    }

    ngAfterViewInit() {
        let total = this.asyncComponents.length;
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
