import {Component, ElementRef, ViewChild} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';


@Component({
    selector: 'app-notfound',
    templateUrl: './notfound.component.html',
    styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent {
    title = 'app';

    downArrowPressed: Boolean = false;
    selected = 'oh mama';
    @ViewChild('txtInput') input: ElementRef;

    constructor(public http: Http) {
    }

    observableSource = (keyword: any): Observable<any[]> => {
        const url: string =
            'https://maps.googleapis.com/maps/api/geocode/json?address=' + keyword;
        if (keyword) {
            return this.http.get(url)
                .map(res => {
                    const json = res.json();
                    return json.results;
                });
        } else {
            return Observable.of([]);
        }
    }

    keydown(event) {
        console.log('keydown:' + event.keyCode + ' query:' + this.selected + ' value:' + this.input.nativeElement.value);
        switch (event.keyCode) {
            case 40:
                this.downArrowPressed = true;
                break;
            case 13: {
                if (!this.downArrowPressed) {
                    console.log('this.input.nativeElement.value');
                    // this.searchService.fullQuery = this.input.nativeElement.value;
                    // this.input.nativeElement.value = this.query;
                    // event.stopPropagation();
                    this.selected = this.input.nativeElement.value;
                    event.stopPropagation();
                    alert('search:' + this.selected);
                }
            }
        }
    }

}
