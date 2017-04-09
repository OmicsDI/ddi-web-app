import { Injectable } from '@angular/core';
import { SimilarityResult } from "../model/SimilarityResult";
import { SearchResult } from "../model/SearchResult";
import { Subject, Observable } from "rxjs";
import { Http, Response } from "@angular/http";
import { DataSetDetail } from "../model/DataSetDetail";
import { DataSet } from "../model/DataSet";
import {AppConfig} from "../app.config";
import {BaseService} from "./base.service";

@Injectable()
export class DataSetService extends BaseService{

  private proteomicsList = "pride,peptideatlas,peptide_atlas,massive,PRIDE,PeptideAtlas,MassIVE, Massive, gpmdb, GPMDB, GPMdb,LINCS,LINCS,paxdb,PAXDB,jpost,JPOST Repository";
  private metabolomicsList = "MetaboLights Dataset, MetaboLights,metabolights,metabolights_dataset,MetabolomicsWorkbench, Metabolomics Workbench, metabolomics_workbench, metabolome_express, MetabolomeExpress, Metabolomics Workbench, GNPS, gnps";
  private transcriptomicsList = "ArrayExpress, arrayexpress-repository, ExpressionAtlas, expression-atlas, atlas-experiments, Expression Atlas Experiments, atlas-experiments";
  private genomicsList = "ega,EGA";

  constructor(private http:Http, private appConfig: AppConfig) {
    super();
  }

  private dataSetSource = new Subject<DataSetDetail>();

  dataSetDetail$ = this.dataSetSource.asObservable();

  private getDataSetDetail_private(accession: string, repository: string): Observable<DataSetDetail> {
    return this.http.get(this.appConfig.getDatasetUrl(accession,repository))
      .map(x => this.extractData<DataSetDetail>(x));
  }

  public getDataSetDetail(accession: string, repository: string) {
    this.getDataSetDetail_private(accession, repository).subscribe(result => {
      this.dataSetSource.next(result);
    });
  }

  public getWebServiceUrl(): string {
    return this.appConfig.getWebServiceUrl();
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

  public getLatestDataSets(): Promise<Response> {
    return this.http.get(this.appConfig.getDatasetLatestUrl())
      .map(res => res.json())
      .toPromise();
  }
  public getMostAccessedDataSets(): Promise<Response> {
    return this.http.get(this.appConfig.getDatasetMostAccessedUrl())
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
