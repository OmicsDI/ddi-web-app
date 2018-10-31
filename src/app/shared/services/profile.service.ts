import {Injectable, PLATFORM_ID} from '@angular/core';
import {Profile} from 'model/Profile';
import {AppConfig} from 'app/app.config';
import {BaseService} from './base.service';
import {DataSetShort} from 'model/DataSetShort';
import {UserShort} from 'model/UserShort';
import {SavedSearch} from 'model/SavedSearch';
import {WatchedDataset} from 'model/WatchedDataset';
import {ConnectionData} from 'model/ConnectionData';
import {LogService} from '@shared/modules/logs/services/log.service';
import {CookieUtils} from '@shared/utils/cookie-utils';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs/internal/observable/throwError';
import {DataTransportService} from '@shared/services/data.transport.service';
import {isPlatformBrowser} from '@angular/common';


@Injectable()
export class ProfileService extends BaseService {

    constructor(private http: HttpClient,
                public appConfig: AppConfig,
                private dataTransporterService: DataTransportService,
                private logger: LogService) {
        super();
    }

    setProfile(profile: Profile): void {
        if (!isPlatformBrowser(PLATFORM_ID)) {
            return;
        }
        localStorage.removeItem('profile');
        localStorage.setItem('profile', JSON.stringify(profile));
    };
    removeProfile() {
        localStorage.removeItem('profile');
    };
    getProfileFromLocal(): Profile {
        if (!isPlatformBrowser(PLATFORM_ID)) {
            return null;
        }
        return JSON.parse(localStorage.getItem('profile'));
    };

    getProfile(): Observable<Profile> {
        return this.http.get(this.appConfig.getProfileUrl(null))
            .pipe(map(data => this.extractData<Profile>(data)));
    }

    getPublicProfile(username): Observable<Profile> {
        let _profile;
        return this.http.get(this.appConfig.getProfileUrl(username))
            .pipe(map(x => {
                _profile = this.extractData<Profile>(x);
                if (!_profile) {
                    this.logger.debug('public profile not received');
                } else {
                    this.logger.debug('public profile received: {}', _profile.userId);
                }
                return _profile;
            }));
    }

    getAllProfiles(): Observable<Profile[]> {
        let _profiles;
        return this.http.get(this.appConfig.getAllProfilesUrl())
            .pipe(map(x => {
                _profiles = this.extractData<Profile[]>(x);
                if (!_profiles) {
                    this.logger.debug('public profile not received');
                } else {
                    this.logger.debug('public profiles received: {}', _profiles.length);
                }
                return _profiles;
            }), catchError(e => this.handleError(e)));
    }

    getUserConnections(userId: string): Observable<string[]> {
        return this.http.get(this.appConfig.getUserConnectionsUrl(userId))
            .pipe(map(x => this.extractData<string[]>(x)));
    }

    getUserConnection(userId: string, provider: string): Observable<ConnectionData> {
        return this.http.get(this.appConfig.getUserConnectionUrl(userId, provider))
            .pipe(
                map(x => this.extractData<ConnectionData>(x)),
                catchError(e => this.handleError(e)));
    }

    deleteConnection(userId: string, provider: string): Observable<any> {
        const deleteConnectionUrl = this.appConfig.getDeleteConnectionUrl(userId, provider);
        return this.http.delete(deleteConnectionUrl)
            .pipe(map(res => res), catchError(e => this.handleError(e)));
    }

    getCoAuthors(userId: string): Observable<UserShort[]> {
        return this.http.get(this.appConfig.getUserCoAuthorsUrl(userId))//
            .pipe(map(x => this.extractData<UserShort[]>(x)));
    }

    public updateUser(profile: Profile): Observable<string> {
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type':  'application/json'})
        };
        return this.http.post(this.appConfig.getProfileUrl(null), JSON.stringify(profile), httpOptions)
            .pipe(map(() => {
                this.setProfile(profile);
                this.dataTransporterService.fire('user_profile', true);
                return 'OK'
            }));
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            this.logger.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            this.logger.error('Backend returned code {}, body was: {}', error.status, error.error);
        }
        // return an observable with a user-facing error message
        return throwError('Something bad happened; please try again later.');
    }

    public saveDataSets(userID: string, datasets: DataSetShort[]) {
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type':  'application/json'})
        };
        this.http.put(this.appConfig.getProfileSaveDatasetsUrl(userID), JSON.stringify(datasets), httpOptions)
            .pipe(map(res => res)).subscribe(() => {});
    }

    public claimDataset(userID: string, dataset: DataSetShort) {
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type':  'application/json'})
        };
        this.http.post(this.appConfig.getProfileClaimDatasetUrl(userID), JSON.stringify(dataset), httpOptions)
            .subscribe(x => {});
    }

    public connect(provider: string) {

        const form = document.createElement('form');

        form.method = 'POST';
        form.action = this.appConfig.getConnectUrl(provider);


        // /element1.value = localStorage.getItem("id_token");
        // /element1.name = "X-AUTH-TOKEN";
        // /form.appendChild(element1);

        document.body.appendChild(form);
        const expire = new Date(new Date().getTime() + 30 * 24 * 3600 * 1000);
        CookieUtils.setCookie('X-AUTH-TOKEN',
            localStorage.getItem('id_token'), this.appConfig.getConnectCookiePath(provider), expire);

        form.submit();
    }

    getSavedSearches(userId: string): Observable<SavedSearch[]> {
        return this.http.get(this.appConfig.getUserSavedSearchesUrl(userId))//
            .pipe(map(x => this.extractData<SavedSearch[]>(x)));
    }

    saveSavedSearch(savedSearch: SavedSearch) {
        this.logger.debug('Saving saved search');
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type':  'application/json'})
        };
        this.http.post(this.appConfig.getUserSavedSearchesUrl(savedSearch.userId), JSON.stringify(savedSearch), httpOptions)
            .subscribe(() => this.logger.debug('Search saved saved'));
    }

    deleteSavedSearch(userId: string, id: string): Observable<String> {
        return this.http.delete(this.appConfig.getUserSavedSearchesDeleteUrl(userId, id))
            .pipe(map(x => 'ok'), catchError(e => this.handleError(e)));
    }

    getWatchedDatasets(userId: string): Observable<WatchedDataset[]> {
        return this.http.get(this.appConfig.getWatchedDatasetsUrl(userId))//
            .pipe(map(x => this.extractData<WatchedDataset[]>(x)));
    }

    saveWatchedDataset(watchedDataset: WatchedDataset) {
        this.logger.debug('Saving saved search');
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type':  'application/json'})
        };
        this.http.post(this.appConfig.getWatchedDatasetsUrl(watchedDataset.userId), JSON.stringify(watchedDataset), httpOptions)
            .subscribe(() => this.logger.debug('Watched dataset saved'));
    }

    deleteWatchedDataset(userId: string, id: string): Observable<String> {
        return this.http.delete(this.appConfig.getWatchedDatasetsDeleteUrl(userId, id)).pipe(map(x => 'ok'));
    }

    getUsersCount(): Observable<number> {
        return this.http.get(this.appConfig.getUserCountUrl()).pipe(map(x => this.extractData<number>(x)));
    }

    setSelected(userId: string, datasets: DataSetShort[]): Observable<String> {
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type':  'application/json'})
        };
        return this.http.post(this.appConfig.getSelectedDatasetsUrl(userId), JSON.stringify(datasets), httpOptions)
            .pipe(map(x => 'ok'));
    }

    getSelected(userId: string): Observable<DataSetShort[]> {
        return this.http.get(this.appConfig.getSelectedDatasetsUrl(userId))//
            .pipe(map(x => this.extractData<DataSetShort[]>(x)));
    }

    getAdminUsers() {
        return this.http.get('static/adminUser/adminUser.json');
    }
}






