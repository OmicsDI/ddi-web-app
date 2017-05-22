import { Component, OnInit } from '@angular/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { DatabaseListService } from '../../services/database-list.service';
import { Database } from '../../model/Database';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.css']
})
export class DatabaseComponent implements OnInit {
  public databases: Database[];
  public p: number = 1;
  public config = { 
    itemsPerPage: 8, 
    currentPage: this.p
  };
  public url: string;

  constructor(
    private databaseListService: DatabaseListService,
    private loadingService: SlimLoadingBarService) {
      this.loadingService.start();
      this.url = environment.userServiceUrl;
    }

  ngOnInit() {
    this.getDBs();
  }

  getDBs() {
    this.databaseListService
      .getDatabaseList()
      .subscribe(
        result => {
          console.log(result);
          this.databases = result;
          this.loadingService.complete();
        }
      )
  }
}
