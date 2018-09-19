import { Observable } from 'rxjs';
import {LogEntry} from '@shared/modules/logs/log.entry';

export abstract class LogPublisher {
    location: string;
    abstract log(record: LogEntry): Observable<boolean>;
    abstract clear(): Observable<boolean>;
}
