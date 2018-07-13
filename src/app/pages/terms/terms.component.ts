import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-terms',
    templateUrl: './terms.component.html',
    styleUrls: ['./terms.component.css']
})
export class TermsComponent implements OnInit {

    siteName = 'EMBL-EBI';
    address = 'The Administrator, EMBL-EBI, Wellcome Trust Genome Campus, Hinxton CB10 1SD';

    constructor() {
    }

    ngOnInit() {
    }

}
