import {environment} from "../environments/environment";
import {Injectable} from "@angular/core";
/**
 * Created by user on 4/9/2017.
 */

@Injectable()
export class AppConfig{
  /***OBSOLETE***/
  getWebServiceUrl():string{
    return `${environment.webServiceUrl}`;
  }
  getStatisticsUrl():string{
    return `${environment.webServiceUrl}statistics/general`;
  }
  getSimilarUrl(acc:string,repository:string):string{
    return `${environment.webServiceUrl}dataset/getSimilar?acc=${acc}&database=${repository}`;
  }
  getSearchUrl(query:string,facetcount:number,size:number,sortBy:string,sortOrder:string,start:number):string{
    return `${environment.webServiceUrl}dataset/search?query=${query}&facetcount=${facetcount}&size=${size}&sortfield=${sortBy}&order=${sortOrder}&start=${start}`;
  }
  getPublicationUrl(acc:string):string{
    return `${environment.webServiceUrl}publication/list?acc=${acc}`;
  }
  getProfileUrl():string{
    return "${environment.userServiceUrl}user/current";
  }
  getUserConnectionsUrl(userId:string):string{
    return `${environment.userServiceUrl}users/${userId}/connections`;
  }
  getEnrichmentUrl(acc:string,repository:string):string{
    return `${environment.webServiceUrl}enrichment/getEnrichmentInfo?accession=${acc}&database=${repository}`;
  }
  getSynonymsUrl(acc:string,repository:string):string{
    return `${environment.webServiceUrl}enrichment/getSynonymsForDataset?accession=${acc}&database=${repository}`;
  }
  getDatasetUrl(acc:string,repository:string):string{
    return `${environment.webServiceUrl}dataset/get?acc=${acc}&database=${repository}`;
  }
  getDatasetLatestUrl():string{
    return `${environment.webServiceUrl}dataset/latest?size=10`;
  }
  getDatasetMostAccessedUrl():string{
    return `${environment.webServiceUrl}dataset/mostAccessed?size=20`;
  }
  getAutocompleteUrl(keyword:string):string{
    return `${environment.webServiceUrl}term/getTermByPattern?q=${keyword}&size=10`;
  }
}
