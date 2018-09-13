import {Component, ElementRef, ViewChild} from '@angular/core';


@Component({
    selector: 'app-notfound',
    templateUrl: './notfound.component.html',
    styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent {
    title = 'app';
    selected = 'oh mama';
    @ViewChild('txtInput') input: ElementRef;

    constructor() {
    }
}
