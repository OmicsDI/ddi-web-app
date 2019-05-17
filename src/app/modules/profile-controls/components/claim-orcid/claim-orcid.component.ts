import {Component, Input, OnInit} from '@angular/core';
import {ThorService} from '@shared/services/thor.service';
import {DataSetDetail} from 'model/DataSetDetail';

@Component({
    selector: 'app-claim-orcid',
    templateUrl: './claim-orcid.component.html',
    styleUrls: ['./claim-orcid.component.css']
})
export class ClaimOrcidComponent implements OnInit {

    isUserLoggedIn: Boolean;
    @Input() datasetNumber: number;
    @Input() datasets: DataSetDetail[];

    constructor(public thorService: ThorService) {
    }

    ngOnInit() {
    }

    openLoginScreen() {
        this.thorService.openLoginScreen(this.datasets);
    }

    forget() {
        this.thorService.forget();
    }
}



