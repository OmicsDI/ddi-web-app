import {DatasetPage} from './dataset.po';

describe('public dataset page', function() {
    let datasetPage: DatasetPage;

    // looks like beforeEach will execute before all it,even it is not inside this e2e-spec file,
    // so we'd better use different page class file to do e2e test
    beforeEach( function() {
        datasetPage = new DatasetPage();
    });

    it( 'should go to dataset page', function() {
        datasetPage.navigateTo();

        // scores
        // Todo: Find a new way to test scores
        // expect<any>(datasetPage.getScoreView().getText()).toBe('756');
        // expect<any>(datasetPage.getScoreCitations().getText()).toBe('1');
        // expect<any>(datasetPage.getScoreReanalysis().getText()).toBe('0');
        // expect<any>(datasetPage.getScoreConnections().getText()).toBe('7500');

        // title
        expect<any>(datasetPage.getDatasetTitle().getText()).toContain('M.musculus - Eye, Protein Intensity (Geiger,MCP,2013)');

        // abstract
        expect<any>(datasetPage.getAbstract().getText()).toContain('abundance ' +
            'based on MAPPED_BY_AUTHORS, Protein_Intensity, fromGeiger,MCP,2013\n' +
            'Interaction consistency score: 8.56 Coverage: 33');

        // submitter
        expect<any>(datasetPage.getSubmitter_mail().getText()).toContain('Christian von Mering');

        // provider
        expect<any>(datasetPage.getId().getText()).toContain('10090115');
        expect<any>(datasetPage.getSource().getText()).toContain('PAXDB');
        expect<any>(datasetPage.getPublicationDate().getText()).toContain('12/03/2015');

        // repositories
        expect<any>(datasetPage.getRepositories().getText()).toContain('PAXDB');

        // access data
        expect<any>(datasetPage.getFull_dataset_link().getAttribute('href')).toContain('http://pax-db.org/dataset/10090/115/');

        // publications
        expect<any>(datasetPage.getPublication_titles().getText()).toContain('PaxDb, a ' +
            'database of protein abundance averages across all three domains of life.');
        expect<any>(datasetPage.getPublication_authors().getText()).toContain('Wang M M  ');
        expect<any>(datasetPage.getPublication_authors().getText()).toContain('Weiss M M  ');
        expect<any>(datasetPage.getPublication_authors().getText()).toContain('Simonovic M M  ');
        expect<any>(datasetPage.getPublication_authors().getText()).toContain('Haertinger G G  ');
        expect<any>(datasetPage.getPublication_authors().getText()).toContain('Schrimpf S P SP  ');
        expect<any>(datasetPage.getPublication_authors().getText()).toContain('Hengartner M O MO  ');
        expect<any>(datasetPage.getPublication_authors().getText()).toContain('von Mering C C  ');

        expect<any>(datasetPage.getPubAbstract().getText()).toContain('Although protein expression is regulated both ' +
            'temporally and spatially, most proteins have an intrinsic, "typical" range of functionally effective abundance levels. ' +
            'These extend ' +
            'from a few molecules per cell for signaling proteins, to millions of molecules for structural proteins. When addressing ' +
            'fundamental questions related to protein evolution, translation and folding, but also in routine laboratory work, a simple ' +
            'rough estimate of the average wild type abundance of each detectable protein in  ...[more]');
        datasetPage.clickPubAbstractMoreLess();
        expect<any>(datasetPage.getPubAbstract().getText()).toContain('Although protein expression is regulated both ' +
            'temporally and spatially, most proteins have an intrinsic, "typical" range of functionally effective abundance levels. ' +
            'These extend from a few molecules per cell for signaling proteins, to millions of molecules for structural proteins. ' +
            'When addressing fundamental questions related to protein evolution, translation and folding, but also in routine ' +
            'laboratory work, a simple rough estimate of the average wild type abundance of each detectable protein in an organism ' +
            'is often desirable. Here, we introduce a meta-resource dedicated to integrating information on absolute protein abundance ' +
            'levels; we place particular emphasis on deep coverage, consistent post-processing and comparability across different ' +
            'organisms. Publicly available experimental data are mapped onto a common namespace and, in the case of tandem mass ' +
            'spectrometry data, re-processed using a standardized spectral counting pipeline. By aggregating and averaging over ' +
            'the various samples, conditions and cell-types, the resulting integrated data set achieves increased coverage and a high ' +
            'dynamic range. We score and rank each contributing, individual data set by assessing its consistency against externally ' +
            'provided protein-network information, and demonstrate that our weighted integration exhibits more consistency than the ' +
            'data sets individually. The current PaxDb-release 2.1 (at http://pax-db.org/) presents whole-organism data as well as ' +
            'tissue-resolved data, and covers 85,000 proteins in 12 model organisms. All values can be seamlessly compared across ' +
            'organisms via pre-computed orthology relationships. [less]');
        datasetPage.clickPubAbstractMoreLess();

        expect<any>(datasetPage.getPubId().getText()).toContain('22535208');


        // similar
        expect<any>(datasetPage.getSimilar().count()).toBe(10);
        expect<any>(datasetPage.getSimilar_title().getText()).toContain('M.musculus - Jejunum, Protein Intensity (Geiger,MCP,2013)');
        expect<any>(datasetPage.getSimilar_title().getText()).toContain('M.musculus - Pancreas, Protein Intensity (Geiger,MCP,2013)');
        expect<any>(datasetPage.getSimilar_title().getText()).toContain('M.musculus - Colon, Protein Intensity (Geiger,MCP,2013)');
        expect<any>(datasetPage.getSimilar_title().getText()).toContain('M.musculus - Ileum, Protein Intensity (Geiger,MCP,2013)');

        expect<any>(datasetPage.getSimilar_id().getText()).toContain('100909');
        expect<any>(datasetPage.getSimilar_id().getText()).toContain('10090400');
        expect<any>(datasetPage.getSimilar_id().getText()).toContain('10090378');
        expect<any>(datasetPage.getSimilar_id().getText()).toContain('10090222');

        expect<any>(datasetPage.getSimilar_publicationDate().getText()).toContain('2015-03-12');
        // expect<any>(datasetPage.getSimilar_publicationDate().getText()).toContain('2015-03-12');
        // expect<any>(datasetPage.getSimilar_publicationDate().getText()).toContain('2015-03-12');
        // expect<any>(datasetPage.getSimilar_publicationDate().getText()).toContain('2015-03-12');
        // expect<any>(datasetPage.getSimilar_publicationDate().getText()).toContain('2015-03-12');

        expect<any>(datasetPage.getSimilar_source().getText()).toContain('PAXDB');

        datasetPage.clickGetMoreSimilar();
        expect<any>(datasetPage.getSimilar().count()).toBe(14);


        expect<any>(datasetPage.getSimilar_title().getText()).toContain('M.musculus - Jejunum, Protein Intensity (Geiger,MCP,2013)');
        expect<any>(datasetPage.getSimilar_title().getText()).toContain('M.musculus - Colon, Protein Intensity (Geiger,MCP,2013)');
        expect<any>(datasetPage.getSimilar_title().getText()).toContain('M.musculus - Ileum, Protein Intensity (Geiger,MCP,2013)');
        expect<any>(datasetPage.getSimilar_title().getText()).toContain('M.musculus - Spleen, Protein Intensity (Geiger,MCP,2013)');
        expect<any>(datasetPage.getSimilar_title().getText()).toContain('M.musculus - Cerebellum, Protein Intensity (Geiger,MCP,2013)');
        expect<any>(datasetPage.getSimilar_title().getText()).toContain('M.musculus - Lung, Protein Intensity (Geiger,MCP,2013)');
        expect<any>(datasetPage.getSimilar_title().getText()).toContain('M.musculus - Duodenum, Protein Intensity (Geiger,MCP,2013)');
        expect<any>(datasetPage.getSimilar_title().getText()).toContain('M.musculus - Stomach, Protein Intensity (Geiger,MCP,2013)');

        expect<any>(datasetPage.getSimilar_id().getText()).toContain('100909');
        expect<any>(datasetPage.getSimilar_id().getText()).toContain('10090378');
        expect<any>(datasetPage.getSimilar_id().getText()).toContain('10090222');
        expect<any>(datasetPage.getSimilar_id().getText()).toContain('10090364');
        expect<any>(datasetPage.getSimilar_id().getText()).toContain('10090218');
        expect<any>(datasetPage.getSimilar_id().getText()).toContain('10090339');
        expect<any>(datasetPage.getSimilar_id().getText()).toContain('100906');
        expect<any>(datasetPage.getSimilar_id().getText()).toContain('1009080');
    });
});

