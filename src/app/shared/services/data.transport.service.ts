import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class DataTransportService {

    private _channels: Map<string, Subject<any>> = new Map<string, Subject<any>>();

    listen(channel: string): Observable<any> {
        if (!this._channels.has(channel)) {
            this._channels.set(channel, new Subject<any>());
        }
        return this._channels.get(channel).asObservable();
    }

    fire<T>(channel: string, message: T) {
        if (!this._channels.has(channel)) {
            this._channels.set(channel, new Subject<any>());
        }
        this._channels.get(channel).next(message);
    }
}
