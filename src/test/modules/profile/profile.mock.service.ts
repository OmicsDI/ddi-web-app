import {EventEmitter, Injectable} from '@angular/core';
import {Headers, RequestOptionsArgs, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Profile} from 'model/Profile';
import {AuthHttp} from 'angular2-jwt';
import {AppConfig} from 'app/app.config';
import {DataSetShort} from 'model/DataSetShort';
import {UserShort} from 'model/UserShort';
import {SavedSearch} from 'model/SavedSearch';
import {WatchedDataset} from 'model/WatchedDataset';
import {ConnectionData} from 'model/ConnectionData';
import {BaseService} from "@shared/services/base.service";


@Injectable()
export class ProfileMockService extends BaseService {

    public profile: Profile; // this.profile.userId
    public userId: string;
    public watchedDatasets: WatchedDataset[];

    onProfileReceived: EventEmitter<Profile> = new EventEmitter();

    constructor(private http: AuthHttp, public appConfig: AppConfig) {
        super();
    }

    getProfile(): Observable<Profile> {
        console.log(this.appConfig.getProfileUrl(null));
        return this.http.get('test/modules/profile/Profile.json') // ,config // { withCredentials: true }
            .map(x => {
                console.log(x);
                this.profile = this.extractData<Profile>(x);
                if (!this.profile || !this.profile.userId) {
                    console.log('profile not received');
                } else {
                    console.log('profile received:' + this.profile.userId);
                    this.userId = this.profile.userId;
                    this.getWatchedDatasets(this.profile.userId).subscribe(
                        d => {
                            this.watchedDatasets = d;
                        }
                    );
                    this.onProfileReceived.emit(this.profile);
                    console.log('lucky');
                }
                return this.profile;
            });
        // .catch(this.handleError);
    }



    getWatchedDatasets(userId: string): Observable<WatchedDataset[]> {
        return this.http.get('test/modules/profile/ProfileWatches.json')//
            .map(x => this.extractData<WatchedDataset[]>(x));
        // .catch(this.handleError);
    }

    getPublicProfile(username): Observable<Profile> {
        let _profile;
        return this.http.get('test/modules/profile/Profile.json') // ,config //{ withCredentials: true }
            .map(x => {
                _profile = this.extractData<Profile>(x);
                if (!_profile) {
                    console.log('public profile not received');
                } else {
                    console.log('public profile received:' + _profile.userId);
                }
                return _profile;
            });
        // .catch(this.handleError);
    }

    setSelected(userId: string, datasets: DataSetShort[]): Observable<String> {
        return this.http.post(this.appConfig.getSelectedDatasetsUrl(userId), JSON.stringify(datasets)).map(
            x => 'ok');
        // ).catch(this.handleError);
    }

    getSelected(userId: string): Observable<DataSetShort[]> {
        return this.http.get('test/modules/profile/ProfileSelected.json')//
            .map(x => this.extractData<DataSetShort[]>(x));
        // .catch(this.handleError);
    }

}






