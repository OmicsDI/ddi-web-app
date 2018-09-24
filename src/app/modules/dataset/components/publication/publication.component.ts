import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {PublicationService} from '@shared/services/publication.service';
import {Publication} from 'model/Publication';
import {LogService} from '@shared/modules/logs/services/log.service';

@Component({
    selector: 'app-publication',
    templateUrl: './publication.component.html',
    styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit, OnChanges {
    @Input() ids: string[] = [];
    d: Publication = new Publication;
    current_idx = 0;
    ids_length = '';
    toggle = true;


    constructor(private publicationService: PublicationService, private logger: LogService) {
    }

    ngOnInit() {
    }

    ngOnChanges(...args: any[]) {
        this.logger.debug('OnChange fired, args: {}', args);

        if (this.ids != null) {
            if (this.ids.length > 0) {
                this.loadComponent();
            }
        }
    }

    loadComponent() {
        this.current_idx = 0;
        this.publicationService.search(this.ids[this.current_idx]).subscribe(
            result => {
                this.d = result.publications[0];
            });
        this.ids_length = String(this.ids.length);
    }

    clickLeft() {
        if (this.current_idx === 0) {
            this.current_idx = this.ids.length - 1;
        } else {
            this.current_idx = this.current_idx - 1;
        }
        this.publicationService.search(this.ids[this.current_idx]).subscribe(
            result => {
                this.d = result.publications[0];
            });
    }

    clickRight() {
        if (this.current_idx === this.ids.length - 1) {
            this.current_idx = 0;
        } else {
            this.current_idx = this.current_idx + 1;
        }
        this.publicationService.search(this.ids[this.current_idx]).subscribe(
            result => {
                this.d = result.publications[0];
            });
    }

    get lengthLimit(): string {
        return this.toggle ? '500' : '5000';
    }

    get moreLessBtn(): string {
        return this.toggle ? '...[more]' : '[less]';
    }

    moreOrLess() {
        this.toggle = !this.toggle;
    }

    leftAvailable(): boolean {
        if (!this.ids) {
            return false;
        }
        return this.current_idx > 0;
    }

    rightAvailable(): boolean {
        if (!this.ids) {
            return false;
        }
        return this.current_idx < this.ids.length - 1;
    }
}
