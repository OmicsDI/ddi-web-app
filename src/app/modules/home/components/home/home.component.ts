import {Component, OnInit} from '@angular/core';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    widgets = {};

    constructor(private loadingBarService: SlimLoadingBarService) {
        this.loadingBarService.start();
    }

    ngOnInit() {
    }

    widgetRegister(partName: string): void {
        this.widgets[partName] = false;
    }

    widgetLoaded($partName): void {
        this.widgets[$partName] = true;
        for (const item in this.widgets) {
            if (!this.widgets[item]) {
                return;
            }
        }
        this.loadingBarService.complete();
    }
}
