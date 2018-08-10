import {LogPublisher} from '@shared/modules/logs/log.publisher';
import {LogConsole} from '@shared/modules/logs/providers/log.console';

export class LogPublisherService {

    publishers: LogPublisher[] = [];

    constructor() {
        this.buildPublishers();
    }

    buildPublishers(): void {
        const logPub: LogPublisher = new LogConsole();
        this.publishers.push(logPub);
    }
}
