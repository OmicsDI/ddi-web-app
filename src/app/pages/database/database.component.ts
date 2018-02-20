import { Component, OnInit } from '@angular/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { DatabaseListService } from '../../services/database-list.service';
import { Database } from '../../model/Database';
import { environment } from '../../../environments/environment';
import {StatisticsService} from "../../services/statistics.service";
import {DomainStat} from "../../model/DomainStat";
import {AppConfig} from "../../app.config";

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.css']
})
export class DatabaseComponent implements OnInit {
  public databases: Database[];
  public domainStats: DomainStat[];
  public p: number = 1;
  public config = {
    itemsPerPage: 8,
    currentPage: this.p
  };
  public url: string;

  constructor(
    private databaseListService: DatabaseListService,
    private statisticsService: StatisticsService,
    private loadingService: SlimLoadingBarService,
    private appConfig: AppConfig) {
      this.loadingService.start();
      this.url = environment.userServiceUrl;
    }

  ngOnInit() {
    this.getDBs();
    this.getDBStats();
  }

  getDBs() {
    this.databaseListService
      .getDatabaseList()
      .subscribe(
        result => {
          console.log(result);
          this.databases = result.filter(d => d.source !== 'NCBI'); //AZ:TODO: add "display on database page" bit in mongo
          this.loadingService.complete();
        }
      )
  }

  getDBStats(){
    this.statisticsService
      .getDatasetStats()
      .subscribe(
        result => {
          this.domainStats = result;
        }
      )
  }

  getDatasetCount(domain: string){
    for(var d of this.domainStats){

      if(d.domain.name == domain)
        return d.domain.value;
    }
   return domain;
  }
}
