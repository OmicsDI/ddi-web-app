import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StatisticsService } from 'app/services/statistics.service';

@Component({
  selector: 'app-statistics-panel',
  templateUrl: './statistics-panel.component.html',
  styleUrls: ['./statistics-panel.component.css']
})
export class StatisticsPanelComponent implements OnInit {

  @Output()
  notifyHomeLoader:EventEmitter<string> = new EventEmitter<string>();

  statisticsList: any;
  constructor(private statisticsService: StatisticsService) { }

  ngOnInit() {
    this.statisticsService.getStatisticsList()
      .then(data => {
        this.notifyHomeLoader.emit('statistics');
        this.statisticsList = data;
        for (let i = 0; i < this.statisticsList.length; i++) {
          this.statisticsList[i].name = this.statisticsList[i].name.replace(/Different /g, '');
          this.statisticsList[i].name = this.statisticsList[i].name.replace(/Repositories\/Databases/g, 'repositories');
          this.statisticsList[i].name = this.statisticsList[i].name.replace(/Species\/Organisms/g, 'species');
          this.statisticsList[i].name = this.statisticsList[i].name.replace(/D/g, 'd');
          this.statisticsList[i].name = this.statisticsList[i].name.replace(/T/g, 't');
        }
      })
      .catch(this.handleError);
  }
 private handleError(error: any) {

    console.log("GET error with url: http://www.omicsdi.org/ws/statistics/general");
    return Promise.reject(error.message || error);
  }
}
