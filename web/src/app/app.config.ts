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
    return `${environment.userServiceUrl}user/current`;
  }
  getUserConnectionsUrl(userId:string):string{
    return `${environment.userServiceUrl}users/${userId}/connections`;
  }
  getUserCoAuthorsUrl(userId:string):string{
    return `${environment.userServiceUrl}users/${userId}/coauthors`;
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
  getProfileClaimDatasetUrl(userId:string){
    return `${environment.userServiceUrl}users/${userId}/datasets`;
  }
  getProfileSaveDatasetsUrl(userId:string){
    return `${environment.userServiceUrl}users/${userId}/datasets`;
  }
  getProfileUploadImageUrl(userId:string){
    return `${environment.userServiceUrl}users/${userId}/picture`;
  }
  getOntologyLookupUrl(keys: string[]) {
    return `${environment.userServiceUrl}ontology/ontologyLookup?key=${keys.join(',')}`;
  }
  getDatabasesUrl(){
    return `${environment.userServiceUrl}database/all`;
  }
  getLoginUrl(provider: string, scope: string){
    return `${environment.userServiceUrl.replace("api","auth")}${provider}?scope=${scope}`;
  }
  getProfileImageUrl(userId: string){
    //TODO: interpolate?
    return `${environment.userServiceUrl}users/${userId}/picture?random=` + Math.random();
  }

  public repositories = {
  "pride": "PRIDE",
  "PRIDE": "PRIDE",
  "peptideatlas": "PeptideAtlas",
  "peptide_atlas": "PeptideAtlas",
  "PeptideAtlas": "PeptideAtlas",
  "massive": "MassIVE",
  "MassIVE": "MassIVE",
  "Massive": "MassIVE",
  "metabolights": "MetaboLights",
  "metabolights_dataset": "MetaboLights",
  "MetaboLights": "MetaboLights",
  "metabolome_workbench": "MetabolomicsWorkbench",
  "metabolomics_workbench": "MetabolomicsWorkbench",
  "Metabolomics Workbench": "MetabolomicsWorkbench",
  "MetabolomicsWorkbench": "MetabolomicsWorkbench",
  "ega": "EGA",
  "EGA": "EGA",
  "GPMDB": "GPMDB",
  "gpmdb": "GPMDB",
  "GNPS": "GNPS",
  "metabolome_express": "MetabolomeExpress MetaPhenDB",
  "MetabolomeExpress MetaPhenDB": "MetabolomeExpress MetaPhenDB",
  "MetabolomeExpress": "MetabolomeExpress MetaPhenDB",
  "ArrayExpress": "ArrayExpress",
  "arrayexpress": "ArrayExpress",
  "arrayexpress-repository": "ArrayExpress",
  "expression-atlas": "ExpressionAtlas",
  "ExpressionAtlas": "ExpressionAtlas",
  "atlas-experiments": "ExpressionAtlas",
  "Expression Atlas Experiments": "ExpressionAtlas",
  "BioModels Database":"BioModels Database",
  "LINCS":"LINCS",
  "JPOST Repository":"JPOST Repository",
  "PAXDB":"PAXDB",
  "Biomodels":"BioModels Database",
  "jPOST":"JPOST Repository",
  "Paxdb":"PAXDB",
  "biomodels":"BioModels Database",
  "lincs":"LINCS",
  "jpost":"JPOST Repository",
  "paxdb":"PAXDB",
  "Pride": "PRIDE"
  }

  public database_urls = {
  "PRIDE": "http://www.ebi.ac.uk/pride/archive/",
  "MetaboLights": "http://www.ebi.ac.uk/metabolights/",
  "MetabolomicsWorkbench": "http://www.metabolomicsworkbench.org/",
  "PeptideAtlas": "http://www.peptideatlas.org/",
  "MassIVE": "https://massive.ucsd.edu/ProteoSAFe/datasets.jsp",
  "GPMDB": "http://gpmdb.thegpm.org/",
  "GNPS": "http://gnps.ucsd.edu/ProteoSAFe/static/gnps-splash.jsp",
  "EGA": "https://www.ebi.ac.uk/ega/",
  "MetabolomeExpress": "https://www.metabolome-express.org/",
  "ArrayExpress": "https://www.ebi.ac.uk/arrayexpress/",
  "ExpressionAtlas": "http://www.ebi.ac.uk/gxa/home",
  "BioModels Database":"https://wwwdev.ebi.ac.uk/ebisearch/search.ebi?db=BioModels Database&query=domain_source:BioModels Database",
  "LINCS":"https://wwwdev.ebi.ac.uk/ebisearch/search.ebi?db=lincs&query=domain_source:lincs",
  "PAXDB":"https://wwwdev.ebi.ac.uk/ebisearch/search.ebi?db=PAXDB&query=domain_source:PAXDB",
  "JPOST Repository" :"https://wwwdev.ebi.ac.uk/ebisearch/search.ebi?db=JPOST Repository&query=domain_source:jpost"
  }

}
