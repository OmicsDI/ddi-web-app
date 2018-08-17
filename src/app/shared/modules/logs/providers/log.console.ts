import {Observable} from 'rxjs/Observable';
import {LogPublisher} from '@shared/modules/logs/log.publisher';
import {LogEntry} from '@shared/modules/logs/log.entry';
import {LogLevel} from '@shared/modules/logs/log.level';

export class LogConsole extends LogPublisher {

    log(entry: LogEntry): Observable<boolean> {
        // Log to console
        switch (entry.level)  {
            case LogLevel.ERROR:
            case LogLevel.FATAL:
                console.error.bind(console)(entry.buildLogString());
                break;
            case LogLevel.WARN:
                console.warn.bind(console)(entry.buildLogString());
                break;
            default:
                console.log.bind(console)(entry.buildLogString());
        }
        return Observable.of(true);
    }

    clear(): Observable<boolean> {
        return Observable.of(true);
    }
}
