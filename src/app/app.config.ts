import {environment} from '../environments/environment';
import {Injectable} from '@angular/core';
import {INamed} from 'model/INamed';

/**
 * Created by user on 4/9/2017.
 */

@Injectable()
export class AppConfig {

    /***OBSOLETE***/
    getWebServiceUrl(): string {
        return `${environment.webServiceUrl}`;
    }

    getProfileServiceUrl(): string {

        return `${environment.userServiceUrl}`;
    }

    getStatisticsOmicsUrl(): string {
        return `${environment.webServiceUrl}statistics/omics`;
    }

    getStatisticsUrl(): string {
        return `${environment.webServiceUrl}statistics/general`;
    }

    getSimilarUrl(acc: string, repository: string): string {
        return `${environment.webServiceUrl}dataset/getSimilar?accession=${acc}&database=${repository}`;
    }

    getSearchUrl(query: string, facetcount: number, size: number, sortBy: string, sortOrder: string, start: number): string {
        return `${environment.webServiceUrl}dataset/search?query=${query}&facetcount=${facetcount}&size=${size}&` +
            `sortfield=${sortBy}&order=${sortOrder}&start=${start}`;
    }

    getPublicationUrl(acc: string): string {
        return `${environment.webServiceUrl}publication/list?acc=${acc}`;
    }

    getProfileUrl(username: string): string {
        if (username) {
            return `${environment.userServiceUrl}user?username=${username}&r=${Math.random()}`;
        } else {
            return `${environment.userServiceUrl}user/current?r=${Math.random()}`;
        }
    }

    getAllProfilesUrl(): string {
        return `${environment.userServiceUrl}users?r=${Math.random()}`;
    }

    getUserConnectionsUrl(userId: string): string {
        return `${environment.userServiceUrl}users/${userId}/connections?r=${Math.random()}`;
    }

    getUserConnectionUrl(userId: string, provider: string): string {
        return `${environment.userServiceUrl}users/${userId}/connections/${provider}?r=${Math.random()}`;
    }

    getUserCoAuthorsUrl(userId: string): string {
        return `${environment.userServiceUrl}users/${userId}/coauthors?r=${Math.random()}`;
    }

    getEnrichmentUrl(acc: string, repository: string): string {
        return `${environment.webServiceUrl}enrichment/getEnrichmentInfo?accession=${acc}&database=${repository}`;
    }

    getSynonymsUrl(acc: string, repository: string): string {
        return `${environment.webServiceUrl}enrichment/getSynonymsForDataset?accession=${acc}&database=${repository}`;
    }

    getDatasetUrl(acc: string, repository: string): string {
        return `${environment.webServiceUrl}dataset/get?accession=${acc}&database=${repository}`;
    }

    getDatasetDownloadUrl(acc: string, repository: string): string {
        return `${environment.webServiceUrl}dataset/${repository}/${acc}.json`;
    }

    getDatasetDRSUrl(acc: string, repository: string): string {
        return `${environment.webServiceUrl}dataset/getDRS?accession=${acc}&database=${repository}`;
    }

    getDatasetBatchUrl(): string {
        return `${environment.webServiceUrl}dataset/batch`;

    }

    getDatasetSchemaUrl(acc: string, repository: string): string {
        return `${environment.schemaServiceUrl}/schema/${repository}/${acc}`;
    }

    getHomeSchemaUrl(): string {
        return `${environment.schemaServiceUrl}/home`;
    }

    getDatasetLatestUrl(): string {
        return `${environment.webServiceUrl}dataset/latest?size=12`;
    }

    getDatasetMostAccessedUrl(): string {
        return `${environment.webServiceUrl}dataset/mostAccessed?size=20`;
    }

    getDatasetByUrl(): string {
        return `${environment.webServiceUrl}dataset/getDatasetByUrl`;
    }

    getAutocompleteUrl(keyword: string): string {
        return `${environment.webServiceUrl}term/getTermByPattern?q=${keyword}&size=10`;
    }

    getProfileClaimDatasetUrl(userId: string) {
        return `${environment.userServiceUrl}users/${userId}/datasets?r=${Math.random()}`;
    }

    getProfileSaveDatasetsUrl(userId: string) {
        return `${environment.userServiceUrl}users/${userId}/datasets?r=${Math.random()}`;
    }

    getProfileUploadImageUrl(userId: string) {
        return `${environment.userServiceUrl}users/${userId}/picture?r=${Math.random()}`;
    }

    getOntologyLookupUrl(keys: string[]) {
        return `${environment.userServiceUrl}ontology/ontologyLookup?key=${keys.join(',')}&r=${Math.random()}`;
    }

    getDatabasesUrl() {
        return `${environment.webServiceUrl}database/all`;
    }

    getDatabaseImageUrl(databaseName: string) {
        return `${environment.webServiceUrl}database/${databaseName}/picture`;
    }

    getLoginUrl(provider: string, scope: string) {
        return `${environment.userServiceUrl.replace('api', 'auth')}${provider}?scope=${scope}`;
    }

    getProfileImageUrl(userId: string) {
        // TODO: interpolate?
        return `${environment.userServiceUrl}users/${userId}/picture?&r=${Math.random()}`;
    }

    getDeleteConnectionUrl(userId: string, provider: string) {
        return `${environment.userServiceUrl}users/${userId}/connections/${provider}?r=${Math.random()}`;
    }

    getUserSavedSearchesUrl(userId: string) {
        return `${environment.userServiceUrl}users/${userId}/savedsearches?r=${Math.random()}`;
    }

    getUserSavedSearchesDeleteUrl(userId: string, id: string) {
        return `${environment.userServiceUrl}users/${userId}/savedsearches/${id}?r=${Math.random()}`;
    }

    getWatchedDatasetsUrl(userId: string) {
        return `${environment.userServiceUrl}users/${userId}/watches?r=${Math.random()}`;
    }

    getWatchedDatasetsDeleteUrl(userId: string, id: string) {
        return `${environment.userServiceUrl}users/${userId}/watches/${id}?r=${Math.random()}`;
    }

    getUserCountUrl() {
        return `${environment.userServiceUrl}users/count`;
    }

    getConnectUrl(provider: string) {
        if (provider === 'orcid') {
            return `${environment.userServiceUrl.replace('api', 'connect')}${provider}?scope=/authenticate`;
        } else if (provider === 'google') {
            return `${environment.userServiceUrl.replace('api', 'connect')}${provider}?` +
                `scope=https://www.googleapis.com/auth/userinfo.email`;
        } else {
            return `${environment.userServiceUrl.replace('api', 'connect')}${provider}`;
        }
    }

    /*******TODO:*******/
    getConnectCookiePath(provider: string) {
        return `${environment.userServiceCookiePath}connect/${provider}`;
    }

    getSimilarityMoleculesUrl(acc: string, repository: string) {
        return `${environment.webServiceUrl}enrichment/getSimilarityInfo?accession=${acc}&database=${repository}`;
    }

    getSimilarityDatasetsUrl(acc: string, repository: string) {
        return `${environment.webServiceUrl}enrichment/getSimilarDatasetsByBiologicalData?accession=${acc}&` +
            `database=${repository}`;
    }

    getFeedbackUrl() {
        return `${environment.webServiceUrl}feedback/saveFeedback`;
    }

    getDatasetStatsUrl() {
        return `${environment.webServiceUrl}statistics/domains`;
    }

    getAltmetricUrl(PMID) {
        return `https://api.altmetric.com/v1/pmid/${PMID}`;
    }

    getScoreViewsUrl(acc: string, repository: string) {
        return `${environment.webServiceUrl}scores/views/${repository}/${acc}`;
    }

    getScoreCitationsUrl(acc: string, repository: string) {
        return `${environment.webServiceUrl}scores/citation/${repository}/${acc}`;
    }

    getScoreReanalysisUrl(acc: string, repository: string) {
        return `${environment.webServiceUrl}scores/reanalysis/${repository}/${acc}`;
    }

    getScoreConnectionsUrl(acc: string) {
        return `${environment.webServiceUrl}scores/search/${acc}`;
    }

    getThorUrl() {
        return `${environment.thorUrl}`;
    }

    getSelectedDatasetsUrl(userId: string) {
        return `${environment.userServiceUrl}users/${userId}/selected?r=${Math.random()}`;
    }

    getInviteUrl(id: string) {
        return `${environment.userServiceUrl}invites/${id}?r=${Math.random()}`;
    }

    getMergeCandidateUrl(start: number, size: number) {
        return `${environment.webServiceUrl}dataset/getMergeCandidates?start=${start}&size=${size}&r=${Math.random()}`;
    }

    getUnMergeCandidateUrl() {
        return `${environment.webServiceUrl}dataset/getAllmerged?r=${Math.random()}`;
    }

    getMergeCandidateCountUrl() {
        return `${environment.webServiceUrl}dataset/getMergeCandidateCount?r=${Math.random()}`;
    }

    getUnMergeCandidateCountUrl() {
        return `${environment.webServiceUrl}dataset/getAllmerged?r=${Math.random()}`;
    }

    getMergeUrl() {
        return `${environment.webServiceUrl}dataset/merge?r=${Math.random()}`;
    }

    getUnMergeUrl() {
        return `${environment.webServiceUrl}dataset/unmerge?r=${Math.random()}`;
    }

    skipMergeUrl() {
        return `${environment.webServiceUrl}dataset/skipMerge?r=${Math.random()}`;
    }

    multiomicsMerge() {
        return `${environment.webServiceUrl}dataset/multiomicsMerge?r=${Math.random()}`;
    }

    public isEmpty(items: INamed[]): boolean {
        if (!items) {
            return true;
        }
        for (const i of items) {
            if ((i.name) && (i.name.trim() !== '')) {
                return false;
            }
        }
        return true;
    }
}
