import {Injectable} from '@angular/core';
import {LogPublisherService} from '@shared/modules/logs/services/log.publisher.service';
import {LogPublisher} from '@shared/modules/logs/log.publisher';
import {isDevMode} from '@angular/core';
import {LogEntry} from '@shared/modules/logs/log.entry';
import {LogLevel} from '@shared/modules/logs/log.level';


@Injectable()
export class LogService {

    level: LogLevel = LogLevel.ALL;
    logWithDate = true;

    publishers: LogPublisher[];

    constructor(private  publishersService: LogPublisherService) {
        this.publishers = this.publishersService.publishers;
    }

    /**
     * Usage: logger.debug('this is test debug {}, {}', 1, 'a')
     * @param {string} msg
     * @param optionalParams
     */
    debug(msg: string, ...optionalParams: any[]) {
        this.writeToLog(msg, LogLevel.DEBUG,
            optionalParams);
    }

    /**
     * Usage: logger.info('this is test info {}, {}', 1, 'a')
     * @param {string} msg
     * @param optionalParams
     */
    info(msg: string, ...optionalParams: any[]) {
        this.writeToLog(msg, LogLevel.INFO,
            optionalParams);
    }

    /**
     * Usage: logger.warn('this is test warn {}, {}', 1, 'a')
     * @param {string} msg
     * @param optionalParams
     */
    warn(msg: string, ...optionalParams: any[]) {
        this.writeToLog(msg, LogLevel.WARN,
            optionalParams);
    }

    /**
     * Usage: logger.error('this is test error {}, {}', 1, 'a')
     * @param {string} msg
     * @param optionalParams
     */
    error(msg: string, ...optionalParams: any[]) {
        this.writeToLog(msg, LogLevel.ERROR,
            optionalParams);
    }

    /**
     * Usage: logger.fatal('this is test fatal {}, {}', 1, 'a')
     * @param {string} msg
     * @param optionalParams
     */
    fatal(msg: string, ...optionalParams: any[]) {
        this.writeToLog(msg, LogLevel.FATAL,
            optionalParams);
    }

    /**
     * Usage: logger.log('this is test log {}, {}', 1, 'a')
     * @param {string} msg
     * @param optionalParams
     */
    log(msg: string, ...optionalParams: any[]) {
        this.writeToLog(msg, LogLevel.ALL,
            optionalParams);
    }

    private shouldLog(level: LogLevel): boolean {
        let ret = false;
        if ((level >= this.level &&
            level !== LogLevel.OFF) ||
            this.level === LogLevel.ALL) {
            ret = true;
        }
        if (!isDevMode() && ret) {
            ret = this.level >= LogLevel.ERROR;
        }
        return ret;
    }

    private writeToLog(msg: string, level: LogLevel, params: any[]) {
        if (this.shouldLog(level)) {
            const entry: LogEntry = new LogEntry();
            entry.message = msg;
            entry.level = level;
            entry.extraInfo = params;
            entry.logWithDate = this.logWithDate;
            for (const logger of this.publishers) {
                logger.log(entry)
                    .subscribe(response => {
                        if (response !== true) {
                            console.error(response);
                        }
                    });
            }
        }
    }

}
