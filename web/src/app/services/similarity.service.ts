import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import {Subject, Observable} from "rxjs";
import {SimilarityResult} from "../model/SimilarityResult";
import {AppConfig} from "../app.config";
import {BaseService} from "./base.service";

@Injectable()
export class SimilarityService extends BaseService{

  private resultSource = new Subject<SimilarityResult>();

  searchResult$ = this.resultSource.asObservable();

  constructor(private http: Http, private appConfig: AppConfig) {
    super();
  }

  search(acc: string, repository: string){
    let o : Observable<SimilarityResult> = this.http.get(this.appConfig.getSimilarUrl(acc,repository))
    .map(x => this.extractData<SimilarityResult>(x));
    o.subscribe(x => {
      this.resultSource.next(x);
    });
  }
}
