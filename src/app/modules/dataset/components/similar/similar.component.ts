import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {SimilarityService} from '@shared/services/similarity.service';
import {SimilarityResult} from 'model/SimilarityResult';
import {Subscription} from 'rxjs/Subscription';
import {DataSet} from 'model/DataSet';
import {AppConfig} from 'app/app.config';
import {DatabaseListService} from '@shared/services/database-list.service';
import {LogService} from '@shared/modules/logs/services/log.service';
import {DatabaseDetail} from 'model/DatabaseDetail';
import {Router} from '@angular/router';

@Component({
    selector: 'app-similar',
    templateUrl: './similar.component.html',
    styleUrls: ['./similar.component.css']
})
export class SimilarComponent implements OnInit, OnChanges {


    d: SimilarityResult = new SimilarityResult;
    subscription: Subscription;
    DEFAULT_DATASET_NUMBER = 5;
    datasetNumber: number = this.DEFAULT_DATASET_NUMBER;

    @Input() acc: string;
    @Input() repository: string;

    @Input()
    databases: DatabaseDetail[];

    loadMoreButtonText = 'Load More';

    constructor(private similarityService: SimilarityService,
                public appConfig: AppConfig,
                private logger: LogService,
                private router: Router,
                private databaseListServce: DatabaseListService) {
        this.subscription = this.similarityService.searchResult$.subscribe(
            result => {
                this.d = result;
            });
    }

    ngOnInit() {
    }

    ngOnChanges(...args: any[]) {
        this.logger.debug('OnChanges fired, args: {}', args);

        if ((this.acc != null) && (this.repository != null)) {
            if ((this.acc !== '') && (this.repository !== '')) {
                this.similarityService.search(this.acc, this.repository);
            }
        }
    }

    loadMore() {
        if (this.datasetNumber === this.DEFAULT_DATASET_NUMBER) {
            this.datasetNumber = 100;
            this.loadMoreButtonText = 'Go Back';
        } else {
            this.datasetNumber = this.DEFAULT_DATASET_NUMBER;
            this.loadMoreButtonText = 'Load More';
        }
    }

    getDatasets(): DataSet[] {
        if (null == this.d) {
            return null;
        }
        if (null == this.d.datasets) {
            return null;
        }

        return this.d.datasets.slice(0, this.datasetNumber);
    }

    getDatabaseTitle(source) {
        const db = this.databaseListServce.getDatabaseBySource(source, this.databases);
        if (!db) {
            this.logger.debug('Source not found: {}', source);
        } else {
            return db.databaseName;
        }
    }

    openDataset(dataset: DataSet) {
        this.router.navigate(['dataset', dataset.source, dataset.id]);
    }
}
