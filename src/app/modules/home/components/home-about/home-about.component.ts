import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-home-about',
    templateUrl: './home-about.component.html',
    styleUrls: ['./home-about.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeAboutComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}
