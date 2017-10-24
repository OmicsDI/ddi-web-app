import {Component, Input, OnInit} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';

import {OrcidWork} from "../../../../model/Thor/OrcidWork";
import {OrcidWorkList} from "../../../../model/Thor/OrcidWorkList";

import {WorkExternalIdentifier} from "../../../../model/Thor/WorkExternalIdentifier";
import {ThorService} from "../../../../services/thor.service";
import {DataSetDetail} from "../../../../model/DataSetDetail";

@Component({
  selector: 'app-claim-orcid',
  templateUrl: './claim-orcid.component.html',
  styleUrls: ['./claim-orcid.component.css']
})
export class ClaimOrcidComponent implements OnInit {

  isUserLoggedIn: Boolean;
  @Input() datasetNumber: number;
  @Input() datasets: DataSetDetail[];

  constructor(private http: Http
        , private thorService: ThorService) {
  }

  ngOnInit() {
    this.thorService.getUserInfo().subscribe();
  }

  openLoginScreen(){
    this.thorService.openLoginScreen(this.datasets);
  }

  forget(){
    this.thorService.forget();
  }
}



