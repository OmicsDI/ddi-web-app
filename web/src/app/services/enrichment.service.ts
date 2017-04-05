import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import {Subject, Observable} from "rxjs";
import {EnrichmentInfo} from "../model/EnrichmentInfo/EnrichmentInfo";
import {DataSetDetail} from "../model/DataSetDetail";
import {Synonyms} from "../model/EnrichmentInfo/Synonyms";
import {SynonymResult} from "../model/EnrichmentInfo/SynonymResult";

@Injectable()
export class EnrichmentService {

  enrichmentUrl: string ="http://www.omicsdi.org/ws/enrichment/getEnrichmentInfo?accession=E-GEOD-66737&database=arrayexpress-repository";
  synonymsUrl: string = "http://www.omicsdi.org/ws/enrichment/getSynonymsForDataset?accession=EGAS00001000599&database=EGA"

  constructor(private http: Http) {

  }

  private enrichmentInfo = new Subject<EnrichmentInfo>();
  private synonymResult = new Subject<SynonymResult>();

  enrichmentInfo$ = this.enrichmentInfo.asObservable();
  synonymResult$ = this.synonymResult.asObservable();

  getEnrichmentInfo(repository: string, acc: string): Subject<EnrichmentInfo>{
    let url = this.enrichmentUrl.replace("E-GEOD-66737",acc);
    url = url.replace("arrayexpress-repository",repository);
    this.http.get(url)
      .map(x => this.extractData<EnrichmentInfo>(x))
      .subscribe(result => {
        this.enrichmentInfo.next(result);
      });
    return this.enrichmentInfo;
  }

  getSynonyms(repository: string, acc: string): Subject<SynonymResult>{
    let url = this.synonymsUrl.replace("EGAS00001000599",acc);
    url = url.replace("EGA",repository);
    this.http.get(url)
      .map(x => this.extractData<SynonymResult>(x))
      .subscribe(result => {
        this.synonymResult.next(result);
      });
    return this.synonymResult;
  }

  getEnrichmentInfo1(repository: string, acc: string): Observable<EnrichmentInfo>{
    let url = this.enrichmentUrl.replace("E-GEOD-66737",acc);
    url = url.replace("arrayexpress-repository",repository);
    return this.http.get(url)
      .map(x => this.extractData<EnrichmentInfo>(x))
  }

  getSynonyms1(repository: string, acc: string):Observable<SynonymResult>{
    let url = this.synonymsUrl.replace("EGAS00001000599",acc);
    url = url.replace("EGA",repository);
    return this.http.get(url)
      .map(x => this.extractData<SynonymResult>(x))
  }



  private extractData<T>(res: Response) : T {
    console.info("Extract Data");
    let body = res.json();
    var result : T;
    result = (body || { }) as T;
    return result;
  }
}
