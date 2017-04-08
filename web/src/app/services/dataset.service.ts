import { Injectable } from '@angular/core';
import { SimilarityResult } from "../model/SimilarityResult";
import { SearchResult } from "../model/SearchResult";
import { Subject, Observable } from "rxjs";
import { Http, Response } from "@angular/http";
import { DataSetDetail } from "../model/DataSetDetail";
import { DataSet } from "../model/DataSet";
import { StatisticsDomains } from '../model/StatisticsDomains';
import { StatisticsOmics } from '../model/StatisticsOmics';

@Injectable()
export class DataSetService {

  private webServiceUrl = 'http://www.omicsdi.org/ws/';
  private proteomicsList = "pride,peptideatlas,peptide_atlas,massive,PRIDE,PeptideAtlas,MassIVE, Massive, gpmdb, GPMDB, GPMdb,LINCS,LINCS,paxdb,PAXDB,jpost,JPOST Repository";
  private metabolomicsList = "MetaboLights Dataset, MetaboLights,metabolights,metabolights_dataset,MetabolomicsWorkbench, Metabolomics Workbench, metabolomics_workbench, metabolome_express, MetabolomeExpress, Metabolomics Workbench, GNPS, gnps";
  private transcriptomicsList = "ArrayExpress, arrayexpress-repository, ExpressionAtlas, expression-atlas, atlas-experiments, Expression Atlas Experiments, atlas-experiments";
  private genomicsList = "ega,EGA";

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

  private extractData<T>(res: Response): T {

    console.info("Extract Data");

    let body = res.json();
    var result: T;
    result = (body || {}) as T;
    return result;
  }

  private getDataSetDetail_private(accession: string, repository: string): Observable<DataSetDetail> {
    console.info("DataSetService.getDataSetDetail");
    let url = this.dataSetUrl.replace('E-GEOD-66737', accession);
    url = url.replace('arrayexpress-repository', repository);
    console.info("url:" + url);

    return this.http.get(url)
      .map(x => this.extractData<DataSetDetail>(x));
  }

  public getDataSetDetail(accession: string, repository: string) {
    this.getDataSetDetail_private(accession, repository).subscribe(result => {
      this.dataSetSource.next(result);
    });
    /** TODO: handle error **/
  }

  public getWebServiceUrl(): string {
    return this.webServiceUrl;
  }

  public getProteomicsList(): string {
    return this.proteomicsList;
  }

  public getMetabolomicsList(): string {
    return this.metabolomicsList;
  }

  public getGenomicsList(): string {
    return this.genomicsList;
  }

  public getTranscriptomicsList(): string {
    return this.transcriptomicsList;
  }

  public getLatestDataSet(): Promise<Response> {
    return this.http.get(this.webServiceUrl + "dataset/latest?size=10")
      .map(res => res.json())
      .toPromise();
  }
  public getMonthDay(dateString: string): string {
    let month_names_short = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let month_int = parseInt(dateString.substr(4, 2));
    let day_int = parseInt(dateString.substr(6, 2));
    let month = month_names_short[month_int - 1];
    return month + " " + day_int+" ";
  }

}
