import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AutocompleteResult} from 'model/AutocompleteResult';
import {AppConfig} from 'app/app.config';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-autocomplete-n',
    templateUrl: './autocomplete-n.component.html',
    styleUrls: ['./autocomplete-n.component.css']
})
export class AutocompleteNComponent implements OnInit {
    selected: string;
    downArrowPressed: Boolean = false;

    @Output() submit = new EventEmitter();
    @ViewChild('txtInput') txtInput: ElementRef;

    @Input()
    searchText: string;

    constructor(private http: HttpClient, public appConfig: AppConfig) {
    }

    ngOnInit() {
    }

    observableSource(keyword: any) {
        return this.http.get(this.appConfig.getAutocompleteUrl(keyword))
            .pipe(map(this.extractData));
    }

    private extractData(res: Object): string[] {
        const body = res;
        // return body || { };
        let searchResult: AutocompleteResult;
        searchResult = (body || {}) as AutocompleteResult;
        return searchResult.items.map(x => x.name);
    }

    keydown(event) {
        switch (event.keyCode) {
            case 40:
                this.downArrowPressed = true;
                break;
            case 13: {
                if (!this.downArrowPressed) {
                    this.submit.emit();
                    event.stopPropagation();
                    const self = this;
                    setTimeout(function () {
                        self.txtInput.nativeElement.value = self.searchText;
                    }, 100);
                }
            }
        }
    }

}
