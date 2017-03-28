import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import {Subject, Observable} from "rxjs";
import {SimilarityResult} from "../model/SimilarityResult";

@Injectable()
export class SimilarityService {

  private resultSource = new Subject<SimilarityResult>();

  searchResult$ = this.resultSource.asObservable();

  url: string = "http://www.omicsdi.org/ws/publication/list?acc=26404089";

  constructor(private http: Http) {
  }

  search(acc: string){
    let searchUrl = this.url.replace('26404089',acc);

    let o : Observable<SimilarityResult> = this.http.get(searchUrl) //,config //{ withCredentials: true }
      .map(x => this.extractData<SimilarityResult>(x));

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
