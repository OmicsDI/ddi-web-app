import {Injectable} from '@angular/core';
import {OrcidWorkList} from 'model/thor/OrcidWorkList';
import {OrcidWork} from 'model/thor/OrcidWork';
import {WorkExternalIdentifier} from 'model/thor/WorkExternalIdentifier';
import {OrcidRecord} from 'model/thor/OrcidRecord';
import {DataSetDetail} from 'model/DataSetDetail';
import {Observable} from 'rxjs';
import {NotificationsService} from 'angular2-notifications';
import {SyncResult} from 'model/thor/SyncResult';
import {DatabaseListService} from './database-list.service';
import {DataSetService} from './dataset.service';
import {DataSetShort} from 'model/DataSetShort';
import {ProfileService} from './profile.service';
import {AppConfig} from 'app/app.config';
import {LogService} from '@shared/modules/logs/services/log.service';
import {AuthService} from '@shared/services/auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable()
export class ThorService {

    public loginUrl: string;
    public logoutUrl: string;
    public isUserLoggedIn: boolean;
    public orcIdRecord: OrcidRecord;
    public syncResult: SyncResult;
    public datasets: DataSetDetail[];

    constructor(private http: HttpClient,
                private authService: AuthService,
                private notificationsService: NotificationsService,
                private databaseListService: DatabaseListService,
                private datasetService: DataSetService,
                public profileService: ProfileService,
                private logger: LogService,
                public appConfig: AppConfig) {
    }

    isClaimed(source: string, id: string): boolean {

        if (!this.orcIdRecord) {
            return false;
        }
        if (!this.orcIdRecord.works) {
            return false;
        }
        // TODO search by database
        return (this.orcIdRecord.works.find(x => x.workExternalIdentifiers[0].workExternalIdentifierId === id) !== undefined);

    }

    openLoginScreen(datasets: DataSetDetail[]) {

        const url = this.appConfig.getThorUrl() + 'loginDEFAULT?clientAddress=https://www.ebi.ac.uk';

        const child = window.open(url, '', 'toolbar=0,status=0,width=626,height=436');
        const timer = setInterval(checkChild, 500);

        const self = this;

        this.syncResult = new SyncResult();


        function checkChild() {
            if (child.closed) {
                clearInterval(timer);
                self.getUserInfo().subscribe(x => {
                    self.syncResult.oldOrcid = self.orcIdRecord.works ? self.orcIdRecord.works.length : 0;
                    self.syncResult.oldOmicsDI = self.datasets ? self.datasets.length : 0;
                    self.claim();
                });
            }
        }
    }

    getUserInfo(): Observable<any> {
        const claimUrl = this.appConfig.getThorUrl() + 'claiming?clientAddress=https://www.ebi.ac.uk&ordIdWorkJson={}';

        return this.http.get(claimUrl, {withCredentials: true}).pipe(map(data => {
            this.isUserLoggedIn = data['isUserLoggedIn'];
            this.loginUrl = data['loginUrl'];
            this.logoutUrl = data['logoutUrl'];
            this.orcIdRecord = data['orcIdRecord'];
        }));
    }

    claim() {
        const claimUrl = this.appConfig.getThorUrl() + 'claimWorkBatch';
        const headers = new HttpHeaders({'Content-Type': 'application/json'});

        const orcidWorkList = new OrcidWorkList();
        orcidWorkList.orcIdWorkLst = [];

        // omicsdi to orcid
        if (this.datasets) {
            this.databaseListService.getDatabaseList().subscribe(databases => {
                for (const dataset of this.datasets) {
                    if (this.orcIdRecord && this.orcIdRecord.works) {
                        if (this.orcIdRecord.works.find(x => x.workExternalIdentifiers[0].workExternalIdentifierId === dataset.id)) {
                            continue;
                        }
                        const o = new OrcidWork();
                        o.url = dataset.full_dataset_link; // ."https://www.ebi.ac.uk/arrayexpress/experiments/E-MTAB-2589";
                        o.title = dataset.name; // "E-MTAB-2589 - compchipsubmission1";
                        o.workType = 'data-set';
                        let publicationYear = '';
                        try {
                            publicationYear = (new Date(dataset.publicationDate)).getFullYear().toString();
                        } catch (ex) {
                        }
                        o.publicationYear = publicationYear;
                        o.workExternalIdentifiers = [];

                        const i = new WorkExternalIdentifier();
                        i.workExternalIdentifierId = dataset.id; // "E-MTAB-2589";
                        o.workExternalIdentifiers.push(i);

                        o.shortDescription = dataset.description;
                        const orcidName = this.databaseListService.getDatabaseBySource(dataset.source, databases).orcidName;
                        this.logger.debug('Claim orcidName: {}', orcidName);
                        o.clientDbName = orcidName; // Todo

                        orcidWorkList.orcIdWorkLst.push(o);
                    }
                }
            });
        }
        if (orcidWorkList.orcIdWorkLst.length > 0) {
            this.http.post(claimUrl, JSON.stringify(orcidWorkList), {headers: headers, withCredentials: true}).subscribe(
                data => {
                    this.syncResult.newOrcid = orcidWorkList.orcIdWorkLst.length;
                    this.syncResult.newOmicsDI = 0;

                    this.getUserInfo().subscribe();

                    this.notificationsService.success(orcidWorkList.orcIdWorkLst.length + ' datasets claimed in orcid');
                },
                err => this.notificationsService.error('error in claiming datasets')
            );
        }

        // orcid to omicsdi
        for (const orcidWork of this.orcIdRecord.works) {
            if (orcidWork.url) {
                this.datasetService.getDatasetByUrl(orcidWork.url).subscribe(
                    x => {
                        if (x) {
                            if (!this.datasets.find(y => x.id === y.id && x.source === y.source)) {

                                const d = new DataSetShort();
                                d.source = x.source;
                                d.id = x.id;
                                d.name = x.title;
                                d.omics_type = x.omicsType;
                                let profile;
                                this.authService.loggedIn().then(isLogged => {
                                    if (isLogged) {
                                        profile = this.profileService.getProfileFromLocal();
                                        this.profileService.claimDataset(profile.userId, d);
                                    }
                                });
                            }
                        }
                    }
                );
            }
        }
    }

    forget() {

        this.syncResult = null;

        this.http.get(this.logoutUrl, {withCredentials: true}).subscribe(
            data => {
                this.notificationsService.success('ORCID credentials removed');
                this.getUserInfo().subscribe();
            },
            err => this.notificationsService.error(err.toString()));
    }

}
