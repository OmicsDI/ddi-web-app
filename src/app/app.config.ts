import {environment} from "../environments/environment";
import {Injectable} from "@angular/core";
import {Profile} from "./model/Profile";
import {INamed} from "./model/INamed";
import {forEach} from "@angular/router/src/utils/collection";
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
    return `${environment.webServiceUrl}statistics/general?r=${Math.random()}`;
  }
  getSimilarUrl(acc:string,repository:string):string{
    return `${environment.webServiceUrl}dataset/getSimilar?acc=${acc}&database=${repository}&r=${Math.random()}`;
  }
  getSearchUrl(query:string,facetcount:number,size:number,sortBy:string,sortOrder:string,start:number):string{
    return `${environment.webServiceUrl}dataset/search?query=${query}&facetcount=${facetcount}&size=${size}&sortfield=${sortBy}&order=${sortOrder}&start=${start}`;
  }
  getPublicationUrl(acc:string):string{
    return `${environment.webServiceUrl}publication/list?acc=${acc}&r=${Math.random()}`;
  }
  getProfileUrl(username:string):string{
    if(username)
      return `${environment.userServiceUrl}user?username=${username}&r=${Math.random()}`;
    else
      return `${environment.userServiceUrl}user/current?r=${Math.random()}`;
  }
  getAllProfilesUrl():string{
    return `${environment.userServiceUrl}users?r=${Math.random()}`;
  }
  getUserConnectionsUrl(userId:string):string{
    return `${environment.userServiceUrl}users/${userId}/connections?r=${Math.random()}`;
  }
  getUserCoAuthorsUrl(userId:string):string{
    return `${environment.userServiceUrl}users/${userId}/coauthors?r=${Math.random()}`;
  }
  getEnrichmentUrl(acc:string,repository:string):string{
    return `${environment.webServiceUrl}enrichment/getEnrichmentInfo?accession=${acc}&database=${repository}&r=${Math.random()}`;
  }
  getSynonymsUrl(acc:string,repository:string):string{
    return `${environment.webServiceUrl}enrichment/getSynonymsForDataset?accession=${acc}&database=${repository}&r=${Math.random()}`;
  }
  getDatasetUrl(acc:string,repository:string):string{
    return `${environment.webServiceUrl}dataset/get?acc=${acc}&database=${repository}&r=${Math.random()}`;
  }
  getDatasetLatestUrl():string{
    return `${environment.webServiceUrl}dataset/latest?size=10&r=${Math.random()}`;
  }
  getDatasetMostAccessedUrl():string{
    return `${environment.webServiceUrl}dataset/mostAccessed?size=20&r=${Math.random()}`;
  }
  getAutocompleteUrl(keyword:string):string{
    return `${environment.webServiceUrl}term/getTermByPattern?q=${keyword}&size=10&r=${Math.random()}`;
  }
  getProfileClaimDatasetUrl(userId:string){
    return `${environment.userServiceUrl}users/${userId}/datasets?r=${Math.random()}`;
  }
  getProfileSaveDatasetsUrl(userId:string){
    return `${environment.userServiceUrl}users/${userId}/datasets?r=${Math.random()}`;
  }
  getProfileUploadImageUrl(userId:string){
    return `${environment.userServiceUrl}users/${userId}/picture?r=${Math.random()}`;
  }
  getOntologyLookupUrl(keys: string[]) {
    return `${environment.userServiceUrl}ontology/ontologyLookup?key=${keys.join(',')}&r=${Math.random()}`;
  }
  getDatabasesUrl(){
    return `${environment.webServiceUrl}database/all?=${Math.random()}`;
  }
  getDatabaseImageUrl(databaseName: string){
    return `${environment.webServiceUrl}database/${databaseName}/picture?=${Math.random()}`;
  }
  getLoginUrl(provider: string, scope: string){
    return `${environment.userServiceUrl.replace("api","auth")}${provider}?scope=${scope}`;
  }
  getProfileImageUrl(userId: string){
    //TODO: interpolate?
    return `${environment.userServiceUrl}users/${userId}/picture?&r=${Math.random()}`;
  }
  getDeleteConnectionUrl(userId: string, provider: string){
    return `${environment.userServiceUrl}users/${userId}/connections/${provider}?r=${Math.random()}`;
  }
  getUserSavedSearchesUrl(userId: string){
    return `${environment.userServiceUrl}users/${userId}/savedsearches?r=${Math.random()}`;
  }
  getUserSavedSearchesDeleteUrl(userId: string, id: string){
    return `${environment.userServiceUrl}users/${userId}/savedsearches/${id}?r=${Math.random()}`;
  }
  getWatchedDatasetsUrl(userId: string){
    return `${environment.userServiceUrl}users/${userId}/watches?r=${Math.random()}`;
  }
  getWatchedDatasetsDeleteUrl(userId: string, id: string){
    return `${environment.userServiceUrl}users/${userId}/watches/${id}?r=${Math.random()}`;
  }
  getConnectUrl(provider:string){
    if(provider=="orcid")
      return `${environment.userServiceUrl.replace("api","connect")}${provider}?scope=/authenticate`;
    else if(provider=="google")
      return `${environment.userServiceUrl.replace("api","connect")}${provider}?scope=https://www.googleapis.com/auth/userinfo.email`
    else
      return `${environment.userServiceUrl.replace("api","connect")}${provider}`;
  }
  /*******TODO:*******/
  getConnectCookiePath(provider:string){
    return `${environment.userServiceCookiePath}connect/${provider}`;
  }
  getSimilarityMoleculesUrl(acc: string, repository: string){
    return `${environment.webServiceUrl}enrichment/getSimilarityInfo?accession=${acc}&database=${repository}&r=${Math.random()}`;
  }
  getSimilarityDatasetsUrl(acc: string, repository: string){
    return `${environment.webServiceUrl}enrichment/getSimilarDatasetsByBiologicalData?accession=${acc}&database=${repository}&r=${Math.random()}`;
  }
  getFeedbackUrl(){
    return `${environment.webServiceUrl}feedback/saveFeedback`;
  }
  getDatasetStatsUrl(){
    return `${environment.webServiceUrl}statistics/domains`;
  }
  getAltmetricUrl(PMID){
    return `http://api.altmetric.com/v1/pmid/${PMID}`;
  }
  getScoreViewsUrl(acc: string, repository: string){
    return `${environment.webServiceUrl}scores/views/${repository}/${acc}?r=${Math.random()}`;
  }
  getScoreCitationsUrl(acc: string, repository: string){
    return `${environment.webServiceUrl}scores/citation/${repository}/${acc}?r=${Math.random()}`;
  }
  getScoreReanalysisUrl(acc: string, repository: string){
  return `${environment.webServiceUrl}scores/reanalysis/${repository}/${acc}?r=${Math.random()}`;
  }
  getScoreConnectionsUrl(acc: string){
    return `${environment.webServiceUrl}scores/search/${acc}?r=${Math.random()}`;
  }
  public githubScope = "public_profile";
  public facebookScope = "email,public_profile";
  public twitterScope = "public_profile";
  public orcidScope = "/authenticate";
  public elixirScope = "openid,profile,email";

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

  public isEmpty(items: INamed[]): boolean{
    if(!items)
      return true;
    for(var i of items){
      if((i.name)&&(i.name.trim()!=""))
        return false;
    }
    return true;
  }

}
