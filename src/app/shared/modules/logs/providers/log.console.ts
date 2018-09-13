import {Observable} from 'rxjs';
import {LogPublisher} from '@shared/modules/logs/log.publisher';
import {LogEntry} from '@shared/modules/logs/log.entry';
import {LogLevel} from '@shared/modules/logs/log.level';
import {of} from 'rxjs/internal/observable/of';

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
        return of(true);
    }

    clear(): Observable<boolean> {
        return of(true);
    }
}
