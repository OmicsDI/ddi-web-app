import {ProfilePage} from './profile.po';

describe('public profile page', function() {
    let profilePage: ProfilePage;

    // looks like beforeEach will execute before all it,even it is not inside this e2e-spec file,
    // so we'd better use different page class file to do e2e test
    beforeEach( function() {
        profilePage = new ProfilePage();
    });

    it( 'should go to public profile page', function() {
        // setTimeout to wait for all promise finished
        profilePage.navigateTo();
        // user info
        expect<any>(profilePage.getAppProfileInfoUserName().getText()).toContain('Pan Xu0');

        // dataset widget
        // score
        expect<any>(profilePage.getScoreViews().getText()).toContain('0');
        expect<any>(profilePage.getScoreReanalysis().getText()).toContain('0');
        expect<any>(profilePage.getScoreCitations().getText()).toContain('0');
        expect<any>(profilePage.getScoreConnections().getText()).toContain('10');

        // title
        expect<any>(profilePage.getTitle().getText()).toContain('Transcription profiling of human monoc' +
            'ytic cells THP-1 stimulated with LPS (10ng/ml) in presence or absenc' +
            'e of LL-37 (5 ug/ml), as well as with the peptide alone, for 4 hours');
        expect<any>(profilePage.getTitle().getText()).toContain('Transcription profiling of rat kidney in diabete mellitus during puberty');
        expect<any>(profilePage.getTitle().getText()).toContain('Comprehensive ev' +
            'aluation of differential gene expression analysis methods for RNA-seq data');
        // Description
        expect<any>(profilePage.getDescription().getText()).toContain('The objective ' +
            'of the study was to evaluate transcriptional response of endotoxin-stimulated ' +
            'human monocytic cells in presence or absence of host defense peptide LL-37 at low physiologically relevant c...');
        expect<any>(profilePage.getDescription().getText()).toContain('Puberty unmasks ' +
            'or accelerates nephropathies, including the nephropathy of diabetes mellitus (DM). ' +
            'A number of cellular systems implicated in the kidney disease of DM interweave, forming an interdepen...');
        expect<any>(profilePage.getDescription().getText()).toContain('A large number ' +
            'of computational methods have been recently developed for analyzing differential ' +
            'gene expression (DE) in RNA-seq data. We report on a comprehensive evaluation of the commonly used DE me...');

        // organisms
        expect<any>(profilePage.getOrganisms().getText()).toContain('Homo sapiens ');
        expect<any>(profilePage.getOrganisms().getText()).toContain('Rattus norvegicus ');
        expect<any>(profilePage.getOrganisms().getText()).toContain('Homo sapiens ');


        // publicationDate
        expect<any>(profilePage.getPublicationDate().getText()).toContain('2014-05-01 |');
        expect<any>(profilePage.getPublicationDate().getText()).toContain('2014-05-02 |');
        expect<any>(profilePage.getPublicationDate().getText()).toContain('2017-04-08 |');

        // datasetId
        expect<any>(profilePage.getDatasetId().getText()).toContain('E-FPMI-6');
        expect<any>(profilePage.getDatasetId().getText()).toContain('E-GEOD-7253');
        expect<any>(profilePage.getDatasetId().getText()).toContain('E-GEOD-49712');

        // database
        expect<any>(profilePage.getDatabaseSource().getText()).toContain('ArrayExpress');

        // contact info
        // user
        expect<any>(profilePage.getAffiliation().getText()).toBe('Orcid user');

        // homepage
        expect<any>(profilePage.getHomepage().getAttribute('href')).toBe('https://orcid.org/0000-0003-3282-7478');

        // getOrcid
        expect<any>(profilePage.getOrcid().getText()).toBe(' 0000-0003-3282-7478');

        // public profile
        expect<any>(profilePage.getPublicProfile().getText()).toBe('http://localhost:4200/profile/bcdnTdFx');
    });
});

