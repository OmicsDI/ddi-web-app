import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../app.config';
import { BaseService } from './base.service';
import { Database } from '../model/Database';

@Injectable()
export class DatabaseListService extends BaseService {

  constructor(
    private http: Http,
    private appConfig: AppConfig) { 
      super();
      this.getDatabaseList().subscribe();
    }

  public databases = {};
  
  public getDatabaseList(): Observable<Database[]> {
    return this.http.get(this.appConfig.getDatabasesUrl())
      .map(x => {
        var d1: Database[] = this.extractData<Database[]>(x);
        for(let d of d1){
          this.databases[d.source] = d;
        }
        return d1;
      });
  }

  public  getSourceByDatabaseName(database:string):string{
      var self = this;
      var source = null;
      Object.keys(this.databases).forEach(key => {
          var d = self.databases[key];
          if(d.databaseName==database){
              source= d.source;
              return;
          }
      });
      return source;
  }
}
