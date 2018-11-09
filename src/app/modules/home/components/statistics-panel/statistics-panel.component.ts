import {Component, OnInit} from '@angular/core';
import {StatisticsService} from '@shared/services/statistics.service';
import {ProfileService} from '@shared/services/profile.service';
import {AsyncInitialisedComponent} from '@shared/components/async/async.initialised.component';
import {MegaNumberPipe} from '@shared/pipes/mega-number.pipe';
import {ObjectUtils} from '@shared/utils/object-utils';
import {ArrayUtils} from '@shared/utils/array-utils';
import {forkJoin} from 'rxjs';

@Component({
    selector: 'app-statistics-panel',
    templateUrl: './statistics-panel.component.html',
    styleUrls: ['./statistics-panel.component.css'],
    providers: [ {provide: AsyncInitialisedComponent, useExisting: StatisticsPanelComponent }]
})
export class StatisticsPanelComponent extends AsyncInitialisedComponent implements OnInit {

    opts: {};

    constructor(private statisticsService: StatisticsService,
                public profileService: ProfileService,
                private megaNumber: MegaNumberPipe) {
        super();
    }


    ngOnInit() {
        const self = this;
        forkJoin(
            this.statisticsService.getStatisticsList(),
            this.statisticsService.getOmicsStats(),
            self.profileService.getUsersCount()
        ).subscribe(data => {
            self.componentLoaded();
            const generalData = data[0];
            const omicsData = data[1];
            const users = data[2];
            const opts = {};
            for (let i = 0; i < generalData.length; i++) {
                opts[generalData[i].label] = generalData[i].value;
            }
            for (let i = 0; i < 4; i++) {
                opts[omicsData[i].label] = omicsData[i].value;
            }
            ObjectUtils.renameKey('Different Repositories/Databases', 'Repositories', opts);
            ObjectUtils.renameKey('Different Datasets', 'Datasets', opts);
            ObjectUtils.renameKey('Different Diseases', 'Diseases', opts);
            ObjectUtils.renameKey('Different Tissues', 'Tissues', opts);
            ObjectUtils.renameKey('Different Species/Organisms', 'Species', opts);
            delete opts['Not available'];
            delete opts['Total'];
            delete opts['Unknown'];
            opts['Users'] = users;
            let items = [];
            Object.keys(opts).forEach(function(key) {
                if (key !== 'Datasets') {
                    items.push({text: key, count: self.megaNumber.transform(opts[key], 1)});
                }
            });
            items = ArrayUtils.prepend(
                {text: 'Datasets', count: self.megaNumber.transform(opts['Datasets'], 1)}, items);
            self.opts = {size: 500,
                innerRadius: 400 / 3.5,
                radiusMin: 50,
                data: {
                    items: items,
                    eval: function (item) {return item.count; },
                    classed: function (item) {return item.text.split(' ').join(''); }
                }};
        }, err => {
        }, () => {
            self.componentLoaded();
        });
    }
}
