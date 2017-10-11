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

  repositories:number;
    datasets:number;
    diseases:number;
    tissues:number;
    organisms:number;
    users:number = 99;


  ngOnInit() {
    this.statisticsService.getStatisticsList()
      .then(data => {
        this.notifyHomeLoader.emit('statistics');
        this.statisticsList = data;


          for (let i = 0; i < this.statisticsList.length; i++) {
            switch(this.statisticsList[i].name){
                case "Different Repositories/Databases": this.repositories = this.statisticsList[i].value; break;
                case "Different Datasets" : this.datasets = this.statisticsList[i].value; break;
                case "Different Diseases" : this.diseases = this.statisticsList[i].value; break;
                case "Different Tissues" : this.tissues = this.statisticsList[i].value; break;
                case "Different Species/Organisms" : this.organisms = this.statisticsList[i].value; break;
                case "Users" : this.users = this.statisticsList[i].value; break;
            }
          }

      })
      .catch(this.handleError);
  }
 private handleError(error: any) {

    console.log("GET error with url: http://www.omicsdi.org/ws/statistics/general");
    return Promise.reject(error.message || error);
  }
}
