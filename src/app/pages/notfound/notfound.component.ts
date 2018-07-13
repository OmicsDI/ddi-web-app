import {Component, ElementRef, ViewChild} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';


@Component({
    selector: 'app-notfound',
    templateUrl: './notfound.component.html',
    styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent {
    title = 'app';
    selected = 'oh mama';
    @ViewChild('txtInput') input: ElementRef;

    constructor(public http: Http) {
    }
}
