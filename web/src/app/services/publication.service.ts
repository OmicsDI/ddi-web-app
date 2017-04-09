import { Injectable } from '@angular/core';
import {PublicationResult} from "../model/PublicationResult";
import {SearchResult} from "../model/SearchResult";
import {Observable, Subject} from "rxjs";
import {Response, Http} from "@angular/http";
import {AppConfig} from "../app.config";
import {BaseService} from "./base.service";

@Injectable()
export class PublicationService extends BaseService{

  private resultSource = new Subject<PublicationResult>();

  searchResult$ = this.resultSource.asObservable();
  constructor(private http: Http, private appConfig: AppConfig) {
    super();
  }

  search(acc: string){
    let o : Observable<PublicationResult> = this.http.get(this.appConfig.getPublicationUrl(acc)) //,config //{ withCredentials: true }
      .map(x => this.extractData<PublicationResult>(x));

    o.subscribe(x => {
      this.resultSource.next(x);
    });
  }
}
