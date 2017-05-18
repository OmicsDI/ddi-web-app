import { Component, OnInit } from '@angular/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { DatabaseListService } from '../../services/database-list.service';
import { Database } from '../../model/Database';

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.css']
})
export class DatabaseComponent implements OnInit {
  databases: Database[];

  constructor(
    private databaseListService: DatabaseListService,
    private loadingService: SlimLoadingBarService) {
      this.loadingService.start();
    }

  ngOnInit() {
    this.getDBs();
  }

  getDBs() {
    this.databaseListService
      .getDatabaseList()
      .subscribe(
        result => {
          this.databases = result;
          this.prepareDBs();
          this.loadingService.complete();
        }
      )
  }

  prepareDBs() {
    
  }
}
