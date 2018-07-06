import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Http, Response} from '@angular/http';
import {AutocompleteResult} from 'model/AutocompleteResult';
import {AppConfig} from 'app/app.config';
import {SearchService} from 'services/search.service';

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

    constructor(private http: Http, public appConfig: AppConfig, public searchService: SearchService) {
    }

    ngOnInit() {
    }

    observableSource(keyword: any) {
        return this.http.get(this.appConfig.getAutocompleteUrl(keyword))
            .map(this.extractData);
    }

    private extractData(res: Response): string[] {
        const body = res.json();
        // return body || { };
        let searchResult: AutocompleteResult;
        searchResult = (body || {}) as AutocompleteResult;
        return searchResult.items.map(x => x.name);
    }

    valuechange(event) {
        if (this.searchService.fullQuery !== event) {
            this.searchService.fullQuery = event;
        }
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
                    const searchText = self.searchService.fullQuery;
                    setTimeout(function () {
                        self.txtInput.nativeElement.value = searchText;
                        self.searchService.fullQuery = searchText;
                    }, 100);
                }
            }
        }
    }

}
