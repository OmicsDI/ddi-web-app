import { Injectable } from '@angular/core';
import {SimilarityResult} from "../model/SimilarityResult";
import {SearchResult} from "../model/SearchResult";
import {Subject, Observable} from "rxjs";
import {Http, Response} from "@angular/http";
import {DataSetDetail} from "../model/DataSetDetail";

@Injectable()
export class DataSetService {

  constructor(private http: Http) { }

  private dataSetSource = new Subject<DataSetDetail>();

  dataSetDetail$ = this.dataSetSource.asObservable();

  //http://www.omicsdi.org/ws/dataset/get?acc=E-GEOD-66737&database=arrayexpress-repository
  //http://www.omicsdi.org/ws/dataset/getSimilar?acc=E-GEOD-66737&database=arrayexpress-repository
  //http://www.omicsdi.org/ws/dataset/getFileLinks?acc=E-GEOD-66737&database=arrayexpress-repository

  //http://www.omicsdi.org/ws/enrichment/getSimilarityInfo?accession=E-GEOD-66737&database=arrayexpress-repository
  //http://www.omicsdi.org/ws/enrichment/getEnrichmentInfo?accession=E-GEOD-66737&database=arrayexpress-repository
  //http://www.omicsdi.org/ws/enrichment/getSimilarDatasetsByBiologicalData?accession=E-GEOD-66737&database=arrayexpress-repository
  //http://www.omicsdi.org/ws/enrichment/getSynonymsForDataset?accession=E-GEOD-66737&database=arrayexpress-repository

  //http://www.omicsdi.org/ws/publication/list?acc=26404089
  dataSetUrl: string = "http://www.omicsdi.org/ws/dataset/get?acc=E-GEOD-66737&database=arrayexpress-repository";

  private extractData<T>(res: Response) : T {

    console.info("Extract Data");

    let body = res.json();
    var result : T;
    result = (body || { }) as T;
    return result;
  }

  private getDataSetDetail_private(accession: string, repository: string): Observable<DataSetDetail>{
    console.info("DataSetService.getDataSetDetail");
    let url = this.dataSetUrl.replace('E-GEOD-66737',accession);
    url = url.replace('arrayexpress-repository',repository);
    console.info("url:" + url);

    return this.http.get(url)
      .map(x => this.extractData<DataSetDetail>(x));
  }

  public getDataSetDetail(accession: string, repository: string){
    this.getDataSetDetail_private(accession,repository).subscribe(result => {
      this.dataSetSource.next(result);
    });
    /** TODO: handle error **/
  }




}
