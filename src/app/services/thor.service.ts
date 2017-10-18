import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers} from "@angular/http";
import {OrcidWorkList} from "../model/Thor/OrcidWorkList";
import {OrcidWork} from "../model/Thor/OrcidWork";
import {WorkExternalIdentifier} from "../model/Thor/WorkExternalIdentifier";
import {OrcidRecord} from "../model/Thor/OrcidRecord";
import {DataSetDetail} from "../model/DataSetDetail";
import {Observable} from "rxjs/Observable";
import {NotificationsService} from "angular2-notifications/dist";

@Injectable()
export class ThorService {

  public loginUrl: string;
  public logoutUrl: string;
  public isUserLoggedIn: boolean;
  public orcIdRecord: OrcidRecord;

  constructor(private http: Http, private notificationsService: NotificationsService) { }

  isClaimed(source: string, id: string): boolean{

    if(!this.orcIdRecord)
      return false;
    if(!this.orcIdRecord.works)
      return false;

    //TODO search by database
    return(this.orcIdRecord.works.find(x => x.workExternalIdentifiers[0].workExternalIdentifierId == id)!=undefined);

  }

  openLoginScreen(datasets: DataSetDetail[]){
    var url = "http://www.ebi.ac.uk/europepmc/thor/api/dataclaiming/loginDEFAULT?clientAddress=https://www.ebi.ac.uk";

    var child = window.open(url,'','toolbar=0,status=0,width=626,height=436');
    var timer = setInterval(checkChild, 500);

    var self = this;

    function checkChild() {
      if (child.closed) {
        clearInterval(timer);
        self.getUserInfo().subscribe(x => {
          self.claim(datasets);
        });
      }
    }
  }

  getUserInfo(): Observable<any>{
    var claimUrl = "https://www.ebi.ac.uk/europepmc/thor/api/dataclaiming/claiming?clientAddress=https://www.ebi.ac.uk&ordIdWorkJson={}";

    let options = new RequestOptions();
    options.withCredentials = true;

    return this.http.get(claimUrl,options).map(data => {
      this.isUserLoggedIn = data.json().isUserLoggedIn;
      this.loginUrl = data.json().loginUrl;
      this.logoutUrl = data.json().logoutUrl;
      this.orcIdRecord = data.json().orcIdRecord;
    });
  }

  claim(datasets: DataSetDetail[]){
    if(!datasets)
      return;

    var claimUrl = "https://www.ebi.ac.uk/europepmc/thor/api/dataclaiming/claimWorkBatch";

    //let options = new RequestOptions();


    let headers = new Headers({ 'Content-Type': 'application/json' });

    //options.headers = headers;
    //options.headers.append("Content-Type","application/json");
    let options = new RequestOptions({ headers: headers });

    options.withCredentials = true;

    var orcidWorkList = new OrcidWorkList();
    orcidWorkList.orcIdWorkLst = new Array<OrcidWork>();

    for(let dataset of datasets){
      if(this.orcIdRecord && this.orcIdRecord.works) {
        if (this.orcIdRecord.works.find(x => x.workExternalIdentifiers[0].workExternalIdentifierId == dataset.id)) {
          continue;
        }
        var o = new OrcidWork();
        o.url = dataset.full_dataset_link; //."https://www.ebi.ac.uk/arrayexpress/experiments/E-MTAB-2589";
        o.title = dataset.name; //"E-MTAB-2589 - compchipsubmission1";
        o.workType = "data-set";
        var publicationYear: string = "";
        try {
          publicationYear = (new Date(dataset.publicationDate)).getFullYear().toString();
        }catch(ex){
        }
        o.publicationYear = publicationYear; //TODO:
        o.workExternalIdentifiers = new Array<WorkExternalIdentifier>();

        var i = new WorkExternalIdentifier();
        i.workExternalIdentifierId = dataset.id; //"E-MTAB-2589";
        o.workExternalIdentifiers.push(i);

        o.shortDescription = dataset.description;
        o.clientDbName = "OMICSDI"; //TODO

        orcidWorkList.orcIdWorkLst.push(o);
      }
    }

    this.http.post(claimUrl,JSON.stringify(orcidWorkList),options).subscribe(
        data => {
          this.notificationsService.success("many datasets claimed");
        },
        err => this.notificationsService.error("error in claiming datasets")
    );
  }

  forget(){
    let options = new RequestOptions();
    options.withCredentials = true;

    this.http.get(this.logoutUrl,options).subscribe(
        data => {
          this.notificationsService.success("ORCID credentials removed");
          this.getUserInfo().subscribe();
        },
        err => alert(err));
  }

}
