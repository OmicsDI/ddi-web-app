import { Injectable } from '@angular/core';
import {PublicationResult} from "../model/PublicationResult";
import {SearchResult} from "../model/SearchResult";
import {Observable, Subject} from "rxjs";
import {Response, Http} from "@angular/http";

@Injectable()
export class PublicationService {

  //

  private resultSource = new Subject<PublicationResult>();

  searchResult$ = this.resultSource.asObservable();

  url: string = "http://www.omicsdi.org/ws/publication/list?acc=26404089";

  constructor(private http: Http) {
  }

  search(acc: string){
    let searchUrl = this.url.replace('26404089',acc);
    let o : Observable<PublicationResult> = this.http.get(searchUrl) //,config //{ withCredentials: true }
      .map(x => this.extractData<PublicationResult>(x));

    o.subscribe(x => {
      this.resultSource.next(x);
    });
  }

  private extractData<T>(res: Response) : T {

    console.info("Extract Data");

    let body = res.json();
    var result : T;
    result = (body || { }) as T;
    return result;
  }
}
