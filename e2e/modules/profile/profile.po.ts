import {browser, by, element} from 'protractor';

export class ProfilePage {
    navigateTo() {

        // get() will instance a object of 'profile/bcdnTdFx' page
        return browser.get('profile/bcdnTdFx');
    }

    getAppProfileInfoUserName() {
        // visit <selector></selector> page
        return element(by.css('app-profile-info #userName'));
    }
    getAppProfileInfoBio() {
        // visit <selector></selector> page
        return element(by.css('app-profile-info #bio'));
    }


    getDatasets() {
        return element.all(by.css('#datasets app-datasetwidget'));
    }

    getScoreViews() {
        return element.all(by.css('app-score .views'));
    }

    getScoreCitations() {
        return element.all(by.css('app-score .citations'));
    }

    getScoreReanalysis() {
        return element.all(by.css('app-score .reanalysis'));
    }

    getScoreConnections() {
        return element.all(by.css('app-score .connections'));
    }

    getTitle() {
        return element.all(by.css('app-datasetwidget .project-widget-accession a span'));
    };

    getDescription() {
        return element.all(by.css('app-datasetwidget .ddi-blockquote span'));
    };

    getOrganisms() {
        return element.all(by.css('app-datasetwidget .organisms'));
    };

    getTissues() {
        return element.all(by.css('app-datasetwidget .tissues'));
    };
    getDiseases() {
        return element.all(by.css('app-datasetwidget .diseases'));
    };

    getPublicationDate() {
        return element.all(by.css('app-datasetwidget .publicationDate'));
    }

    getDatasetId() {
        return element.all(by.css('app-datasetwidget .dataset_id'));
    }

    getDatabaseSource() {
        return element.all(by.css('app-datasetwidget .database_source'));
    }

    getAppProfileContacts() {
        return element(by.css('app-profile-contacts'));
    }
    getAffiliation() {
        return element(by.css('app-profile-contacts .affiliation'));
    }
    getHomepage() {
        return element(by.css('app-profile-contacts .homepage a'));
    }
    getOrcid() {
        return element(by.css('app-profile-contacts .orcid'));
    }
    getPublicProfile() {
        return element(by.css('app-profile-contacts .publicProfile'));
    }

    getAppCountingDataDashboard() {
        return element(by.css('app-counting-data-dashboard'));
    }
}
