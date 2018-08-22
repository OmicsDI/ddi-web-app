import {browser, by, element} from 'protractor';

export class DatasetPage {
    navigateTo() {
        return browser.get('dataset/paxdb/10090115');
    }

    getScoreView() {
        return element(by.css('app-score .views'));
    }

    getScoreCitations() {
        return element(by.css('app-score .citations'));
    }

    getScoreReanalysis() {
        return element(by.css('app-score .reanalysis'));
    }

    getScoreConnections() {
        return element(by.css('app-score .connections'));
    }

    getDatasetTitle() {
        return element(by.css('h4'));
    }

    getAbstract () {
        return element(by.css('#abstract'));
    }

    getReanalisys_of () {
        return element.all(by.css('#reanalisys_of'));
    }

    getReanalisys_by () {
        return element.all(by.css('#reanalisys_by'));
    }

    getRelate_omics () {
        return element.all(by.css('#relate_omics'));
    }

    getInstruments () {
        return element.all(by.css('#instruments'));
    }

    getOrganisms () {
        return element.all(by.css('#organisms'));
    }

    getTissues () {
        return element(by.css('#tissues'));
    }

    getDiseases () {
        return element(by.css('#diseases'));
    }

    getSubmitter () {
        return element.all(by.css('#submitter'));
    }

    getSubmitter_mail () {
        return element.all(by.css('#submitter a'));
    }

    getId() {
        return element(by.css('#id'));
    }

    getSource () {
        return element(by.css('#source'));
    }

    getPublicationDate () {
        return element(by.css('#publicationDate'));
    }

    getSecondary_accession () {
        return element.all(by.css('#secondary_accession'));
    }

    getRepositories () {
        return element.all(by.css('.repositories'));
    }

    getFull_dataset_link () {
        return element(by.css('#full_dataset_link'));
    }

    // app-publication
    getPublication_titles () {
        return element(by.css('app-publication h4'));
    }

    getPublication_authors () {
        return element.all(by.css('app-publication .publication_authors'));
    }

    getJournal_date_issu () {
        return element(by.css('#journal_date_issu'));
    }

    getPubAbstract () {
        return element.all(by.css('.pubAbstract'));
    }

    clickPubAbstractMoreLess () {
        return element(by.css('.pubAbstract b')).click();
    }

    getPubId () {
        return element(by.css('#pubId'));
    }

    getSimilar () {
        return element.all(by.css('app-similar li'));
    }

    clickGetMoreSimilar () {
        return element.all(by.css('app-similar button')).click();
    }

    getSimilar_title () {
        return element.all(by.css('app-similar li .similar_title'));
    }

    getSimilar_publicationDate () {
        return element.all(by.css('app-similar li .similar_publicationDate'));
    }

    getSimilar_id () {
        return element.all(by.css('app-similar li .similar_id'));
    }

    getSimilar_source () {
        return element.all(by.css('app-similar li .similar_source'));
    }

}
