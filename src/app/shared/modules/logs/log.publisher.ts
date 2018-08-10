import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {LogEntry} from '@shared/modules/logs/services/log.service';

export abstract class LogPublisher {
    location: string;
    abstract log(record: LogEntry): Observable<boolean>;
    abstract clear(): Observable<boolean>;
}
