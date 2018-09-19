import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Subject} from 'rxjs';

@Injectable()
export class DataTransportService {

    private _channels: Map<string, Subject<any>> = new Map<string, Subject<any>>();

    /**
     * Listen channel, retrieve message
     * @param {string} channel
     * @returns {Observable<any>}
     */
    listen(channel: string): Observable<any> {
        if (!this._channels.has(channel)) {
            this._channels.set(channel, new Subject<any>());
        }
        return this._channels.get(channel).asObservable();
    }

    /**
     * Send a message into a channel
     * @param {string} channel
     * @param {T} message
     */
    fire<T>(channel: string, message: T) {
        if (!this._channels.has(channel)) {
            this._channels.set(channel, new Subject<any>());
        }
        this._channels.get(channel).next(message);
    }
}
