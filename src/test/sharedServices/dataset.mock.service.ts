import {Injectable} from '@angular/core';
import {BaseService} from '@shared/services/base.service';
import {Http} from '@angular/http';
import {AppConfig} from 'app/app.config';
import {Observable} from 'rxjs/Observable';
import {DataSetDetail} from 'model/DataSetDetail';
import {Subject} from 'rxjs/Subject';
import {DataSet} from 'model/DataSet';

@Injectable()
export class DataSetMockService extends BaseService {

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
    };
    private getDataSetDetail_private(accession: string, repository: string): Observable<DataSetDetail> {
        return this.http.get('test/sharedServices/DataSetDetail.json').map( x => this.extractData<DataSetDetail>(x));
    }

    public getDataSetDetail(accession: string, repository: string) {
        this.getDataSetDetail_private(accession, repository).subscribe(result => {
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

}
