import {Inject, Injectable, Optional, PLATFORM_ID} from '@angular/core';
import {forkJoin, Observable, of} from 'rxjs';
import {DataSetDetail} from 'model/DataSetDetail';
import {DataSet} from 'model/DataSet';
import {AppConfig} from 'app/app.config';
import {BaseService} from './base.service';
import {MergeCandidate} from 'model/MergeCandidate';
import {UnMergeDatasets} from 'model/unmerge/UnMergeDatasets';
import {map} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DataSetShort} from 'model/DataSetShort';
import {DatasetBatchResult} from 'model/DatasetBatchResult';
import {REQUEST} from '@nguniversal/express-engine/tokens';
import {isPlatformServer} from '@angular/common';

@Injectable()
export class DataSetService extends BaseService {

    private proteomicsList = 'pride,peptideatlas,peptide_atlas,massive,PRIDE,PeptideAtlas,MassIVE, ' +
        'Massive, gpmdb, GPMDB, GPMdb,LINCS,LINCS,paxdb,PAXDB,jpost,JPOST Repository,jPOST,Paxdb,BioModels';
    private metabolomicsList = 'MetaboLights Dataset, MetaboLights,metabolights,metabolights_dataset,MetabolomicsWorkbench,' +
        ' Metabolomics Workbench, metabolomics_workbench, metabolome_express, MetabolomeExpress, Metabolomics Workbench, ' +
        'GNPS, gnps';
    private transcriptomicsList = 'ArrayExpress, arrayexpress-repository, ExpressionAtlas, expression-atlas, atlas-experiments, ' +
        'Expression Atlas Experiments, atlas-experiments,GEO';
    private genomicsList = 'ega,EGA,EVA,dbGaP';
    private otherList = 'BioStudies,cellcollective,Cell Collective,NODE,Physiome Model Repository';

    constructor(private http: HttpClient, public appConfig: AppConfig, @Optional() @Inject(REQUEST) private request: Request,
                @Inject(PLATFORM_ID) private platformId) {
        super();
    }

    public getDataSetDetail(accession: string, repository: string): Observable<DataSetDetail> {
        return this.http.get(this.appConfig.getDatasetUrl(accession, repository))
            .pipe(map(x => this.extractData<DataSetDetail>(x)));
    }

    public async getDataSetDetailAsync(accession: string, repository: string): Promise<DataSetDetail> {
        return await this.http.get(this.appConfig.getDatasetUrl(accession, repository))
            .pipe(map(x => this.extractData<DataSetDetail>(x))).toPromise();
    }

    getHeaders(): HttpHeaders {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        if (isPlatformServer(this.platformId)) {
            headers.append('X-Forwarded-For', this.request.headers['X-Forwarded-For']);
        }
        return headers;
    }

    public async getDRSUrls(accession: string, repository: string): Promise<Object> {
        const headers = this.getHeaders();
        return await this.http.get(this.appConfig.getDatasetDRSUrl(accession, repository), {headers: headers}).toPromise();
    }

    public async getDownloadUrls(accession: string, repository: string): Promise<Object> {
        const headers = this.getHeaders();
        return await this.http.get(this.appConfig.getDatasetDownloadUrl(accession, repository), {headers: headers}).toPromise();
    }

    public getDatasetDetails(datasets: DataSetShort[]): Observable<DatasetBatchResult[]> {
        if (datasets == null) {
            return of([]);
        }
        const chunk = 50;
        const chunks = [];
        for (let i = 0, j = datasets.length; i < j; i += chunk) {
            chunks.push(datasets.slice(i, i + chunk));
        }
        return forkJoin(chunks.map(x => this.getBatchDatasets(x)));
    }

    public getBatchDatasets(datasets: DataSetShort[]): Observable<DatasetBatchResult> {
        if (datasets.length === 0) {
            const result = new DatasetBatchResult();
            result.datasets = [];
            return of(result);
        }
        let url = this.appConfig.getDatasetBatchUrl();
        const queries = [];
        datasets.forEach(dataset => {
            queries.push(`accession=${dataset.id}&database=${dataset.source}`);
        });
        url = url + '?' + queries.join('&');
        return this.http.get(url).pipe(map(x => this.extractData<DatasetBatchResult>(x)));
    }

    public getWebServiceUrl(): string {
        return this.appConfig.getWebServiceUrl();
    }

    public async getDataSetDRSUrl(accession: string, repository: string): Promise<Object> {
        const headers = this.getHeaders();
        const drsUrlsJson = await this.http.get(this.appConfig.getDatasetDRSUrl(accession, repository.toLowerCase()), {headers: headers}).toPromise();
        return drsUrlsJson;
    }
    /* */

    public getProfileServiceUrl(): string {
        return this.appConfig.getProfileServiceUrl();
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

    public getOtherList(): string {
        return this.otherList;
    }

    public getLatestDataSets(): Promise<Object> {
        return this.http.get(this.appConfig.getDatasetLatestUrl())
            .toPromise();
    }

    public getMostAccessedDataSets(): Promise<Object> {
        return this.http.get(this.appConfig.getDatasetMostAccessedUrl())
            .toPromise();
    }

    public getDatasetByUrl(url: string): Observable<DataSetDetail> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json'
            })
        };
        return this.http.post(this.appConfig.getDatasetByUrl(), url, httpOptions)
            .pipe(map(x => this.extractData<DataSetDetail>(x)));
    }

    public getMergeCandidates(start: number, size: number): Observable<MergeCandidate[]> {
        return this.http.get(this.appConfig.getMergeCandidateUrl(start, size))
            .pipe(map(x => this.extractData<MergeCandidate[]>(x)));
    }

    public getUnMergeCandidates(): Observable<UnMergeDatasets[]> {
        return this.http.get(this.appConfig.getUnMergeCandidateUrl())
            .pipe(map(x => this.extractData<UnMergeDatasets[]>(x)));
    }

    public getMergeCandidateCount(): Observable<number> {
        return this.http.get(this.appConfig.getMergeCandidateCountUrl())
            .pipe(map(x => this.extractData<number>(x)));
    }

    public merge(result: MergeCandidate): Observable<String> {
        const url = this.appConfig.getMergeUrl();

        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post(url, JSON.stringify(result), {headers: headers})
            .pipe(map(res => 'OK'));
    }

    public unmerge(result: Array<UnMergeDatasets>): Observable<String> {
        const url = this.appConfig.getUnMergeUrl();

        const headers = new HttpHeaders({'Content-Type': 'application/json'});

        return this.http.post(url, JSON.stringify(result), {headers: headers})
            .pipe(map(res => {
                return 'OK';
            }));
    }

    public skipMerge(result: MergeCandidate): Observable<String> {
        const url = this.appConfig.skipMergeUrl();

        const headers = new HttpHeaders({'Content-Type': 'application/json'});

        return this.http.post(url, JSON.stringify(result), {headers: headers})
            .pipe(map(res => {
                return 'OK';
            }));
    }

    public multiomicsMerge(result: MergeCandidate): Observable<String> {
        const url = this.appConfig.multiomicsMerge();

        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        headers.append('Access-Control-Allow-Origin', '*');

        return this.http.post(url, JSON.stringify(result), {headers: headers})
            .pipe(map(res => {
                return 'OK';
            }));
    }
}
