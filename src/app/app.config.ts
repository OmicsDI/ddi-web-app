import {environment} from '../environments/environment';
import {Injectable} from '@angular/core';
import {INamed} from 'model/INamed';

/**
 * Created by user on 4/9/2017.
 */

@Injectable()
export class AppConfig {

    getTopDomain(): string {
        return `${environment.topDomain}`;
    }

    getLogoUri(): string {
        return `${environment.logoUri}`;
    }

    getTitle(): string {
        return `${environment.title}`;
    }

    getTopStripClass(): string {
        return `${environment.topStripClass}`;
    }

    getSubmissionUrl(): string {
        return `${environment.submissionUrl}`;
    }

    /***OBSOLETE***/
    getWebServiceUrl(): string {
        return `${environment.webServiceUrl}`;
    }

    getProfileServiceUrl(): string {
        return `${environment.userServiceUrl}`;
    }

    getValidateUrl(): string {
        return `${environment.webServiceUrl}dataset/checkfile`;
    }

    getStatisticsOmicsUrl(): string {
        const topDomain = this.getTopDomain();
        return `${environment.webServiceUrl}statistics/omics?domain=${topDomain}`;
    }

    getStatisticsUrl(): string {
        const topDomain = this.getTopDomain();
        return `${environment.webServiceUrl}statistics/general?domain=${topDomain}`;
    }

    getSimilarUrl(acc: string, repository: string): string {
        const topDomain = this.getTopDomain();
        return `${environment.webServiceUrl}dataset/getSimilar?accession=${acc}&domain=${topDomain}&database=${repository}&`;
    }

    getSearchUrl(query: string, facetcount: number, size: number, sortBy: string, sortOrder: string, start: number): string {
        const topDomain = this.getTopDomain();
        return `${environment.webServiceUrl}dataset/search?query=${query}&domain=${topDomain}&facetcount=${facetcount}&size=${size}&` +
            `sortfield=${sortBy}&order=${sortOrder}&start=${start}`;
    }

    getPublicationUrl(acc: string): string {
        return `${environment.webServiceUrl}publication/list?acc=${acc}`;
    }

    getProfileUrl(username: string): string {
        if (username) {
            return `${environment.userServiceUrl}user?username=${username}`;
        } else {
            return `${environment.userServiceUrl}user/current`;
        }
    }

    getAllProfilesUrl(): string {
        return `${environment.userServiceUrl}users`;
    }

    getUserConnectionsUrl(userId: string): string {
        return `${environment.userServiceUrl}users/${userId}/connections`;
    }

    getUserConnectionUrl(userId: string, provider: string): string {
        return `${environment.userServiceUrl}users/${userId}/connections/${provider}`;
    }

    getUserCoAuthorsUrl(userId: string): string {
        return `${environment.userServiceUrl}users/${userId}/coauthors`;
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
        const topDomain = this.getTopDomain();
        return `${environment.webServiceUrl}dataset/latest?size=12&domain=${topDomain}`;
    }

    getDatasetMostAccessedUrl(): string {
        const topDomain = this.getTopDomain();
        return `${environment.webServiceUrl}dataset/mostAccessed?size=20&domain=${topDomain}`;
    }

    getDatasetByUrl(): string {
        return `${environment.webServiceUrl}dataset/getDatasetByUrl`;
    }

    getAutocompleteUrl(keyword: string): string {
        return `${environment.webServiceUrl}term/getTermByPattern?q=${keyword}&size=10`;
    }

    getProfileClaimDatasetUrl(userId: string) {
        return `${environment.userServiceUrl}users/${userId}/datasets`;
    }

    getProfileSaveDatasetsUrl(userId: string) {
        return `${environment.userServiceUrl}users/${userId}/datasets`;
    }

    getProfileUploadImageUrl(userId: string) {
        return `${environment.userServiceUrl}users/${userId}/picture`;
    }

    getOntologyLookupUrl(keys: string[]) {
        return `${environment.userServiceUrl}ontology/ontologyLookup?key=${keys.join(',')}`;
    }

    getDatabasesUrl() {
        const topDomain = this.getTopDomain();
        var allPostFix;
        if (topDomain == "omics") {
           allPostFix = "all";
        } else {
           allPostFix = topDomain;
        }
        return `${environment.webServiceUrl}database/${allPostFix}`;
    }

    getDatabaseImageUrl(databaseName: string) {
        return `${environment.webServiceUrl}database/${databaseName}/picture`;
    }

    getLoginUrl(provider: string, scope: string) {
        return `${environment.userServiceUrl.replace('api', 'auth')}${provider}?scope=${scope}`;
    }

    getProfileImageUrl(userId: string) {
        // TODO: interpolate?
        return `${environment.userServiceUrl}users/${userId}/picture`;
    }

    getDeleteConnectionUrl(userId: string, provider: string) {
        return `${environment.userServiceUrl}users/${userId}/connections/${provider}`;
    }

    getUserSavedSearchesUrl(userId: string) {
        return `${environment.userServiceUrl}users/${userId}/savedsearches`;
    }

    getUserSavedSearchesDeleteUrl(userId: string, id: string) {
        return `${environment.userServiceUrl}users/${userId}/savedsearches/${id}`;
    }

    getWatchedDatasetsUrl(userId: string) {
        return `${environment.userServiceUrl}users/${userId}/watches`;
    }

    getWatchedDatasetsDeleteUrl(userId: string, id: string) {
        return `${environment.userServiceUrl}users/${userId}/watches/${id}`;
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
        const topDomain = this.getTopDomain();
        return `${environment.webServiceUrl}statistics/domains?domain=${topDomain}`;
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
        return `${environment.userServiceUrl}users/${userId}/selected`;
    }

    getInviteUrl(id: string) {
        return `${environment.userServiceUrl}invites/${id}`;
    }

    getMergeCandidateUrl(start: number, size: number) {
        return `${environment.webServiceUrl}dataset/getMergeCandidates?start=${start}&size=${size}`;
    }

    getUnMergeCandidateUrl() {
        return `${environment.webServiceUrl}dataset/getAllmerged`;
    }

    getMergeCandidateCountUrl() {
        return `${environment.webServiceUrl}dataset/getMergeCandidateCount`;
    }

    getUnMergeCandidateCountUrl() {
        return `${environment.webServiceUrl}dataset/getAllmerged`;
    }

    getMergeUrl() {
        return `${environment.webServiceUrl}dataset/merge`;
    }

    getUnMergeUrl() {
        return `${environment.webServiceUrl}dataset/unmerge`;
    }

    skipMergeUrl() {
        return `${environment.webServiceUrl}dataset/skipMerge`;
    }

    multiomicsMerge() {
        return `${environment.webServiceUrl}dataset/multiomicsMerge`;
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
