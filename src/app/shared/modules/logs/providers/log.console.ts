import {Observable} from 'rxjs/Observable';
import {LogEntry, LogLevel} from '@shared/modules/logs/services/log.service';
import {LogPublisher} from '@shared/modules/logs/log.publisher';

export class LogConsole extends LogPublisher {

    private logProvider = console.log.bind(window.console);

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
        this.logProvider.clear();
        return Observable.of(true);
    }
}
