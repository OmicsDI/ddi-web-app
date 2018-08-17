import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs/Rx';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {DataSetDetail} from 'model/DataSetDetail';
import {DataSet} from 'model/DataSet';
import {AppConfig} from 'app/app.config';
import {BaseService} from './base.service';
import {MergeCandidate} from 'model/MergeCandidate';
import {UnMergeDatasets} from 'model/unmerge/UnMergeDatasets';

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

    private dataSetSource = new Subject<DataSetDetail>();

    dataSetDetail$ = this.dataSetSource.asObservable();

    constructor(private http: Http, public appConfig: AppConfig) {
        super();
    }

    public getDataSetDetail(accession: string, repository: string): Observable<DataSetDetail> {
        return this.http.get(this.appConfig.getDatasetUrl(accession, repository))
            .map(x => this.extractData<DataSetDetail>(x));
    }

    public getDataSetDetailInCorrect(accession: string, repository: string) {
        this.getDataSetDetail(accession, repository).subscribe(result => {
            this.dataSetSource.next(result);
        });
    }

    public getWebServiceUrl(): string {
        return this.appConfig.getWebServiceUrl();
    }

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
        const month_names_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month_int = parseInt(dateString.substr(4, 2), 10);
        const day_int = parseInt(dateString.substr(6, 2), 10);
        const month = month_names_short[month_int - 1];
        return month + ' ' + day_int + ' ';
    }

    public getDatasetByUrl(url: string): Observable<DataSet> {
        return this.http.post(this.appConfig.getDatasetByUrl(), url)
            .map(x => this.extractData<DataSet>(x));
    }

    public getMergeCandidates(start: number, size: number): Observable<MergeCandidate[]> {
        return this.http.get(this.appConfig.getMergeCandidateUrl(start, size)).map(x => this.extractData<MergeCandidate[]>(x));
    }

    public getUnMergeCandidates(): Observable<UnMergeDatasets[]> {
        return this.http.get(this.appConfig.getUnMergeCandidateUrl()).map(x => this.extractData<UnMergeDatasets[]>(x));
    }

    public getMergeCandidateCount(): Observable<number> {
        return this.http.get(this.appConfig.getMergeCandidateCountUrl()).map(x => this.extractData<number>(x));
    }

// unused
    // public getUnMergeCandidateCount(): Observable<MergeCandidate[]>{
    //     return this.http.get(this.appConfig.getUnMergeCandidateCountUrl()).map(x => this.extractData<MergeCandidate[]>(x))
    // }

    public merge(result: MergeCandidate): Observable<String> {
        const url = this.appConfig.getMergeUrl();

        const headers = new Headers({'Content-Type': 'application/json'});
        const options = new RequestOptions({headers: headers});

        return this.http.post(url, JSON.stringify(result), options)
            .map(res => {
                return 'OK';
            });
        // .catch(err=>{
        //   return Observable.throw(err);
        // })
    }

    public unmerge(result: Array<UnMergeDatasets>): Observable<String> {
        const url = this.appConfig.getUnMergeUrl();

        const headers = new Headers({'Content-Type': 'application/json'});
        const options = new RequestOptions({headers: headers});

        return this.http.post(url, JSON.stringify(result), options)
            .map(res => {
                return 'OK';
            });
        // .catch(err=>{
        //   return Observable.throw(err);
        // })
    }

    public skipMerge(result: MergeCandidate): Observable<String> {
        const url = this.appConfig.skipMergeUrl();

        const headers = new Headers({'Content-Type': 'application/json'});
        const options = new RequestOptions({headers: headers});

        return this.http.post(url, JSON.stringify(result), options)
            .map(res => {
                return 'OK';
            });
        // .catch(err=>{
        //     return Observable.throw(err);
        // })
    }

    public multiomicsMerge(result: MergeCandidate): Observable<String> {
        const url = this.appConfig.multiomicsMerge();

        const headers = new Headers({'Content-Type': 'application/json'});
        headers.append('Access-Control-Allow-Origin', '*');
        const options = new RequestOptions({headers: headers});

        return this.http.post(url, JSON.stringify(result), options)
            .map(res => {
                return 'OK';
            });
        // .catch(err=>{
        //     return Observable.throw(err);
        // })
    }


}
