<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
        <%@ page isELIgnored="false"%>
            <!DOCTYPE html>
            <html xmlns:ng="http://angularjs.org" xmlns:ng="http://angularjs.org" ng-app="ddiApp" id="ng-app" class="js flexbox canvas canvastext webgl no-touch geolocation postmessage no-websqldatabase indexeddb hashchange history draganddrop websockets rgba hsla multiplebgs backgroundsize borderimage borderradius boxshadow textshadow opacity cssanimations csscolumns cssgradients no-cssreflections csstransforms csstransforms3d csstransitions fontface generatedcontent video audio localstorage sessionstorage webworkers applicationcache svg inlinesvg smil svgclippaths ng-scope">

            <head ng-controller="MainContentCtrl">
                 <style type="text/css">@charset "UTF-8";
    [ng\:cloak], [ng-cloak], [data-ng-cloak], [x-ng-cloak], .ng-cloak, .x-ng-cloak, .ng-hide:not(.ng-hide-animate) {
        display: none !important;
    }

    ng\:form {
        display: block;
    }
    </style> 
                <meta charset="utf-8">
                <meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">
                <meta content="width=device-width" name="viewport">
                <meta content="OmicsDI is a integrate resource to multiple omics repositories, including Proteomics, Metabolomics and Genomics" name="description">
                <meta name="google-site-verification" content="rylKmRH17HeASfYu4pmNTaHi3eHYEopVnGERRiePpek" />
                <meta name="msvalidate.01" content="14CFC7A456C8506DAA18CE922378B13F" />

                <meta content={{meta_dataset_title}} name="dataset_title">
                <meta content={{meta_dataset_abstract}} name="dataset_abstract">
                <meta content={{meta_dataset_identifier}} name="dataset_identifier">
                <meta ng-repeat="entry in meta_entries" name={{entry.name}} content={{entry.content}}>


                <title>OmicsDI: Home</title>
                <link rel="canonical" href={{meta_originalURL}}>
                <link rel="canonical" href={{meta_ddiURL}}>
                <link rel="stylesheet" href="static/css/bootstrap.min.css">
                <link rel="stylesheet" href="static/css/boilerplate-style.css">
                <link rel="stylesheet" href="static/css/ebi-global.css" type="text/css" media="screen">
                <link rel="stylesheet" href="static/css/ebi-visual.css" type="text/css" media="screen">
                <link rel="stylesheet" href="static/css/984-24-col-fluid.css" type="text/css" media="screen">
                <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
                <link rel="stylesheet" href="static/js/libs/slick-carousel/slick/slick.css">
                <link rel="stylesheet" href="static/js/libs/slick-carousel/slick/slick-theme.css">
                <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet' type='text/css'>
                <link type="text/css" href="static/css/ngProgress.css" rel="stylesheet">
                <link type="text/css" href="static/css/ddi.css" rel="stylesheet">
                <link type="text/css" href="static/css/autocomplete.css" rel="stylesheet">

                <!-- favico -->
                <link rel="apple-touch-icon" sizes="57x57" href="static/images/favico/apple-icon-57x57.png">
                <link rel="apple-touch-icon" sizes="60x60" href="static/images/favico/apple-icon-60x60.png">
                <link rel="apple-touch-icon" sizes="72x72" href="static/images/favico/apple-icon-72x72.png">
                <link rel="apple-touch-icon" sizes="76x76" href="static/images/favico/apple-icon-76x76.png">
                <link rel="apple-touch-icon" sizes="114x114" href="static/images/favico/apple-icon-114x114.png">
                <link rel="apple-touch-icon" sizes="120x120" href="static/images/favico/apple-icon-120x120.png">
                <link rel="apple-touch-icon" sizes="144x144" href="static/images/favico/apple-icon-144x144.png">
                <link rel="apple-touch-icon" sizes="152x152" href="static/images/favico/apple-icon-152x152.png">
                <link rel="apple-touch-icon" sizes="180x180" href="static/images/favico/apple-icon-180x180.png">
                <link rel="icon" type="image/png" sizes="192x192" href="static/images/favico/android-icon-192x192.png">
                <link rel="icon" type="image/png" sizes="32x32" href="static/images/favico/favicon-32x32.png">
                <link rel="icon" type="image/png" sizes="96x96" href="static/images/favico/favicon-96x96.png">
                <link rel="icon" type="image/png" sizes="16x16" href="static/images/favico/favicon-16x16.png">
                <link rel="manifest" href="static/images/favico/manifest.json">
                <meta name="msapplication-TileColor" content="#ffffff">
                <meta name="msapplication-TileImage" content="static/images/favico/ms-icon-144x144.png">
                <meta name="theme-color" content="#ffffff">
                <!--favico end -->

                <base href="/">
                <script>
                    var fanke;
                </script>

            </head>

            <body class="level2 ng-cloak">

                <div id="" class="container" style="margin:0px;background-color: #0099cc;">

                    <!-- local-search -->
                    <div id="ddi-local-masthead" class="row">
                        <!-- local-title -->
                        <!-- NB: for additional title style patterns, see http://frontier.ebi.ac.uk/web/style/patterns -->
                        <div class="grid_12 alpha logo-title col-md-6 col-sm-12 col-xs-12" id="local-title">
                            <a href="/" title="Back to OmicsDI homepage"><img src="static/images/logo/OmicsDI-icon-3.png" alt="logo" width="64" height="64"></a>
                            <span><h1><a href="/" title="Back to OmicsDI homepage">Omics Discovery Index</a></h1></span>
                        </div>
                        <!-- /local-title -->

                        <!-- NB: if you do not have a local-search, delete the following div, and drop the class="grid_12 alpha" class from local-title above -->
                        <!-- /local-search -->
                        <div class="col-md-4 col-sm-10 col-xs-12" ng-hide="show_top_search" style="height:105px; float:right; margin-top:0px; z-index:1; width:45%">
                        </div>

                        <div ng-controller="QueryCtrl" id="queryCtrl" class="col-md-6 col-sm-12 col-xs-12" ng-show="show_top_search" style="height:105px; float:right; margin-top:0px; z-index:1; ">
                            <form novalidate name="queryForm" class="local-search" ng-submit="submit_query()">
                                <fieldset>
                                    <div class="form-group " ng-class="(query.submitted && queryForm.$invalid) ? 'has-error' : ''">
                                        <div class="input-group ">
                                            <autocomplete ng-model="query.text" attr-placeholder="organism, repository, gene, tissue, accession" click-activation="false" data="words" on-type="get_suggestions" on-select="do_query"></autocomplete>
                                            <!--
                                                                <input type="text" style="background-color:#fff; width:99%"
                                                                       placeholder="organism, repository, gene, tissue, accession"
                                                                       class="form-control"
                                                                       id="query-text"
                                                                       name="text"
                                                                       tabindex="1"
                                                                       ng-model="query.text"
                                                                       ng-minlength="2"
                                                                       ng-maxlength="1000"
                                                                       autocomplete="off"
                                                                       required>
                                -->
                                            <div class="input-group-btn">
                                                <button type="submit" class="btn btn-primary ddi-btn">
                                        <i class="fa fa-search"></i> Search
                                    </button>
                                            </div>
                                            <!-- /input-group-btn -->
                                        </div>
                                        <!--input-group -->
                                        <span class="help-block example-searches">
                         <small>
                             <i>
                                 Examples:
                                 <a href="" rel="nofollow" ng-click="example_query('cancer')">cancer</a>,
                                 <a href="" rel="nofollow" ng-click="example_query('TAXONOMY:&quot;9606&quot;')">Homo
                                     sapiens</a>,
                                 <a href="" rel="nofollow" ng-click="example_query('Orbitrap')">Orbitrap</a>,
                                 <a href="" rel="nofollow" ng-click="example_query('Q9HAU5')">Q9HAU5</a>,
                                 <a href="" rel="nofollow" ng-click="example_query('Phospho')">Phospho</a>,
                                 <a href="" rel="nofollow" ng-click="example_query('Hela')">Hela</a>
                             </i>
                         </small>
                     </span>
                                        <!--
                            <label class="control-label ng-cloak has-error"
                                   for="query-text"
                                   ng-show="query.submitted && (queryForm.text.$error.required || queryForm.text.$error.minlength)"
                                   ng-cloak>
                                Your query is too short
                            </label>
                            <label class="control-label ng-cloak"
                                   for="query-text" ng-show="query.submitted && (queryForm.text.$error.maxlength)"
                                   ng-cloak>
                                Your query is too long
                            </label>
                            -->
                                    </div>
                                    <!-- /form-group -->
                                </fieldset>
                            </form>
                        </div>

                    </div>

                    <div id="local-masthead" class="masthead row" style="margin-left:-15px;margin-right:-15px">
                        <!-- local-nav -->
                        <nav style="float:bottom" class="col-md-12 col-sm-12 col-xs-12">
                            <ul class="" id="local-nav">
                                <li class=" first" id="home-menu"><a title="Home" href="/">Home</a></li>
                                <li class="" id="browse-menu"><a title="Browse" href="/search?q=*:*">Browse</a>
                                </li>
                                <li class="" id="api-menu">
                                    <a title="OmicsDI API" href="/api">API</a>
                                </li>
                                <li class=" last" id="about-prider-menu">
                                    <a title="Databases" href="/databases">Databases</a>
                                </li>
                                <!-- If you need to include functional (as opposed to purely navigational) links in your local menu,
                    add them here, and give them a class of "functional". Remember: you'll need a class of "last" for
                    whichever one will show up last...
                    For example: -->
                                <li class="functional last"><a data-icon="\" class="icon icon-static" href="http://www.ebi.ac.uk/support/index.php?query=pride">Feedback</a>
                                </li>
                                <li class="functional"><a class="" href="/about">About</a></li>
                                <li class="functional"><a class="" href="/help">Help</a></li>
                                <li class="functional" id="login-menu" hidden="true"><a title="Login to PRIDE Archive" data-icon="l" class="icon icon-functional" href="http://www.ebi.ac.uk/pride/archive/login">Login</a>
                                </li>
                                <li class="functional first" id="register-menu" hidden="true"><a title="Register" data-icon="5" class="icon icon-functional" href="http://www.ebi.ac.uk/pride/archive/register">Register</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <!-- /local-nav -->
                </div>
                </header>
                <!--<div ng-controller="QueryCtrl" id="queryCtrl" class="" ng-show="show_top_search" ng-hide="true"-->
                <!--style="height:105px; float:right; margin-top:-140px; z-index:1; width:45%">-->
                <!--<form novalidate name="queryForm" class="local-search" ng-submit="submit_query()">-->
                <!--<fieldset>-->
                <!--<div class="form-group" ng-class="(query.submitted && queryForm.$invalid) ? 'has-error' : ''">-->
                <!--<div class="input-group ">-->
                <!--<autocomplete ng-model="query.text"-->
                <!--attr-placeholder="organism, repository, gene, tissue, accession"-->
                <!--click-activation="false" data="words" on-type="get_suggestions"-->
                <!--on-select="do_query"></autocomplete>-->
                <!--&lt;!&ndash;-->
                <!--<input type="text" style="background-color:#fff; width:99%"-->
                <!--placeholder="organism, repository, gene, tissue, accession"-->
                <!--class="form-control"-->
                <!--id="query-text"-->
                <!--name="text"-->
                <!--tabindex="1"-->
                <!--ng-model="query.text"-->
                <!--ng-minlength="2"-->
                <!--ng-maxlength="1000"-->
                <!--autocomplete="off"-->
                <!--required>-->
                <!--&ndash;&gt;-->
                <!--<div class="input-group-btn">-->
                <!--<button type="submit" class="btn btn-primary ddi-btn">-->
                <!--<i class="fa fa-search"></i> Search-->
                <!--</button>-->
                <!--</div>-->
                <!--&lt;!&ndash; /input-group-btn &ndash;&gt;-->
                <!--</div>-->
                <!--&lt;!&ndash;input-group &ndash;&gt;-->
                <!--<span class="help-block example-searches">-->
                <!--<small>-->
                <!--<i>-->
                <!--Examples:-->
                <!--<a href="" rel="nofollow" ng-click="example_query('cancer')">cancer</a>,-->
                <!--<a href="" rel="nofollow" ng-click="example_query('TAXONOMY:&quot;9606&quot;')">Homo-->
                <!--sapiens</a>,-->
                <!--<a href="" rel="nofollow" ng-click="example_query('Orbitrap')">Orbitrap</a>,-->
                <!--<a href="" rel="nofollow" ng-click="example_query('Q9HAU5')">Q9HAU5</a>,-->
                <!--<a href="" rel="nofollow" ng-click="example_query('Phospho')">Phospho</a>,-->
                <!--<a href="" rel="nofollow" ng-click="example_query('Hela')">Hela</a>-->
                <!--</i>-->
                <!--</small>-->
                <!--</span>-->
                <!--&lt;!&ndash;-->
                <!--<label class="control-label ng-cloak has-error"-->
                <!--for="query-text"-->
                <!--ng-show="query.submitted && (queryForm.text.$error.required || queryForm.text.$error.minlength)"-->
                <!--ng-cloak>-->
                <!--Your query is too short-->
                <!--</label>-->
                <!--<label class="control-label ng-cloak"-->
                <!--for="query-text" ng-show="query.submitted && (queryForm.text.$error.maxlength)"-->
                <!--ng-cloak>-->
                <!--Your query is too long-->
                <!--</label>-->
                <!--&ndash;&gt;-->
                <!--</div>-->
                <!--&lt;!&ndash; /form-group &ndash;&gt;-->
                <!--</fieldset>-->
                <!--</form>-->
                <!--</div>-->


                <div id="wrapper" class="container ng-cloak" ng-show="true">
                    <div id="ngProgressOutContainer" ng-show="show_progress_bar"></div>
                    <!--main container of page -->

                    <script>
                        document.title = "OmicsDI API";
                    </script>
                    <div id="content" class="row" style="margin: 10px">
                        <div class="col-md-9" role="main">

                            <h1 id="overview">
                                <i class="fa fa-book"></i>API overview
                            </h1>

                            <p>Most data in the Datatsets Discovery Index can be accessed programmatically using a <a href="http://www.ebi.ac.uk/Tools/ddi/ws/">RESTful API</a> allowing for integration with other resources. The API implementation is based
                                on the
                                <a href="https://spring.io/guides/gs/rest-service/">Spring Rest Framework</a>.
                            </p>

                            <h2 id="web-browsable-api">Web browsable API</h2>

                            <p>The OmicsDI API is <strong>web browsable</strong>, which means that:</p>

                            <ul>
                                <li>
                                    <p>The query results returned by the API are available in <a href="http://json.org/" target="_blank">JSON</a>format. This ensures that they can be viewed by human and accessed programmatically by computer.</p>
                                </li>

                                <li>
                                    <p>The main <a href="http://www.ebi.ac.uk/Tools/ddi/ws/" target="_blank">RESTful API</a> page provides a simple web-based user interface, which allows developers to familiarise themselves with the API and get a better
                                        sense of the OmicsDI data before writing a single line of code. </p>
                                </li>
                                <li>
                                    <p>many resources are <strong>hyperlinked</strong> so that it's possible to navigate the API in the browser.</p>
                                </li>
                            </ul>

                            <p>As a result, developers can familiarise themselves with the API and get a better sense of the OmicsDI data.
                            </p>


                            <p><a href="http://www.omicsdi.org/ws/" class="btn btn-primary" role="button" target="_blank">Browse the API</a></p>

                            <h2 id="versioning">Versioning</h2>

                            <p>
                                To ensure that changes in the OmicsDI API don't break the applications relying on it, the API is versioned, and the version is included in the API's URL.
                            </p>

                            <p>
                                For example, the current API is at Version 1 and is available at http://www.ebi.ac.uk/Tools/ddi/ws/v1, and the next version will be available at http://www.ebi.ac.uk/Tools/ddi/ws/v2.
                            </p>

                            <p>
                                The latest version of the API can be accessed at http://www.ebi.ac.uk/Tools/ddi/ws/current, but it's not recommended to use this endpoint for long-term development as the underlying data model may change.
                            </p>

                            <p>
                                No backward-incompatible changes are made to a version after it has been made public. More specifically, it's guaranteed that within one version there will be no:
                            </p>
                            <ul>
                                <li>changing urls</li>
                                <li>deleting or renaming data fields</li>
                                <li>changing data field types</li>
                            </ul>
                            <p>
                                The following non-disruptive changes may be implemented to a public API:
                            </p>
                            <ul>
                                <li>adding new endpoints</li>
                                <li>adding new data fields</li>
                                <li>adding new filtering methods</li>
                            </ul>
                            <p>
                                An advance notice will be given before obsoleting an API version. To stay up to date, please consider signing up for the PRIDE <a href="https://twitter.com/OmicsDIndex">Twitter</a> account.
                            </p>


                            <hr>

                            <h1 id="v1">API documentation</h1>

                            <h2 id="v1-example-responses">Example responses</h2>

                            <p>Responses containing <strong>multiple entries</strong> have the following fields:</p>

                            <ul>
                                <li><em>count</em> is the number of entries in the matching set.</li>
                                <li><em>datasets</em> is an array of datasets.</li>
                                <li><em>facets</em> is an array of facets.</li>
                            </ul>

                            <h4>Example</h4>
                            <pre>
<code class="prettyprint">
    http://www.omicsdi.org/ws/dataset/search?query=human
    {
    "count": 733,
    "datasets": [
    {
    "id": "PXD000456",
    "source": "pride",
    "title": "Human glomerular extracellular matrix analysed by LC-MSMS",
    "description": "Extracellular matrix proteins were isolated from human glomeruli and analysed by LC-MSMS",
    "keywords": [
    "Human",
    "kidney",
    "glomerulus",
    "extracellular matrix"
    ],
    "organisms": [
    {
    "acc": "9606",
    "name": "Homo sapiens"
    }
    ],
    "publicationDate": "20140122"
    },
    // 19 more datasets
    ],
    "facets": [
    {
    "id": "modification",
    "label": "Modification",
    "total": 181,
    "facetValues": [
    {
    "label": "Unknown modification",
    "value": "unknown modification",
    "count": "5"
    },
    //other facet values
    ],
    },
    //other facets
    ]
    }
</code>
</pre>

                            <p>Responses containing just a <strong>single dataset</strong> have some extra navigation fields, and without the facets</p>

                            <pre>
<code class="prettyprint">
    http://www.omicsdi.org/ws/dataset/get?acc=PXD001848&database=PRIDE
    {
    "id": "PXD001848",
    "name": "Global Analysis of Protein Folding Thermodynamics for Disease State Characterization, MCF7 vs MDAMB231",
    "description": "Protein biomarkers can be used to characterize and diagnose disease states such as cancer. They can also serve as therapeutic targets. Current methods for protein biomarker discovery, which generally rely on the large-scale analysis of gene and/or protein expression levels, fail to detect protein biomarkers with disease-related functions and unaltered expression levels. Here we describe the large-scale use of thermodynamic measurements of protein folding and stability for disease state characterization and the discovery of protein biomarkers. Using the Stable Isotope Labeling with Amino Acids in Cell Culture and Stability of Proteins from Rates of Oxidation (SILAC-SPROX) technique, we assayed ~800 proteins for protein folding and stability changes in three different cell culture models of breast cancer including the MCF-10A, MCF-7, and MDA-MB-231 cell lines. The thermodynamic stability profiles generated here created distinct molecular markers for the three cell lines, and a significant fraction (~45%) of the differentially stabilized proteins did not have altered expression levels. Thus, the protein biomarkers reported here created novel molecular signatures of breast cancer and provided additional insight into the molecular basis of the disease. Our results establish the utility of protein folding and stabilitymeasurements for the study of disease processes.",
    "keywords": null,
    "publicationDate": "20150410",
    "publications": [
    {
    "id": "25825992",
    "publicationDate": "2015-04-09",
    "title": "Global analysis of protein folding thermodynamics for disease state characterization.",
    "pubabstract": "Current methods for the large-scale characterization of disease states generally rely on the analysis of gene and/or protein expression levels. These existing methods fail to detect proteins with disease-related functions and unaltered expression levels. Here we describe the large-scale use of thermodynamic measurements of protein folding and stability for the characterization of disease states. Using the Stable Isotope Labeling with Amino Acids in Cell Culture and Stability of Proteins from Rates of Oxidation (SILAC-SPROX) technique, we assayed ∼800 proteins for protein folding and stability changes in three different cell culture models of breast cancer including the MCF-10A, MCF-7, and MDA-MB-231 cell lines. The thermodynamic stability profiles generated here created distinct molecular markers to differentiate the three cell lines, and a significant fraction (∼45%) of the differentially stabilized proteins did not have altered expression levels. Thus, the differential thermodynamic profiling strategy reported here created novel molecular signatures of breast cancer and provided additional insight into the molecular basis of the disease. Our results establish the utility of protein folding and stability measurements for the study of disease processes, and they suggest that such measurements may be useful for biomarker discovery in disease.",
    "cycle": "testcyclehere"
    }
    ],
    "related_datasets": null,
    "data_protocol": "Peak lists were extracted from the raw LC-MS/MS data files and the data were searched against the 20265 human proteins in the 2014-04 release of the UniProt Knowledgebase (downloaded at ftp://ftp.uniprot.org/pub/databases/uniprot/current_releases/release-2014_04/knowledgebase/) using Maxquant 1.3.0.5.41 The following modifications were used: methyl methanethiosulfonate at cysteine as a fixed modification, SILAC labeling of lysine (13C614N2) and arginine (13C6), and variable (0-1) oxidation of methionine and deamidation of Asparagine and Glutamine (N and Q), and acetylation of the protein N-terminus. The enzyme was set as Trypsin, and up to 2 missed cleavages were permitted. The false discovery rate for peptide and protein identifications was set to1%, and rest of the parameters were set at the default settings. As part of the default settings the mass tolerancefor precursor ions was set to 20 ppm for the first search where initial mass recalibration was completed and a 6 ppmprecursor mass tolerance was used for the main search. The mass tolerance for fragment ions was 0.5 Da. We alsoincluded match between runs and re-quantification of the searched peptides. The search results were exported toExcel for further data analysis as described below. Only the protein and peptide identifications with non-zeropositive ratios (H/L >0) were used in subsequent data analysis steps. The methionine-containing peptides wereselected, and those methionine-containing peptides consistently identified in the protein samples derived from sixor more denaturant-containing buffers were assayed. For the methionine-containing peptides, a single averaged H/Lratio was calculated for each peptide sequence and each charge state at each denaturant concentration. Similarly,for each analysis a median H/L ratio was determined for each protein using the H/L ratios measured for all thenon-methionine-containing peptides identified in all the denaturant concentrations for a given protein. These medianH/L ratios were used to select hits with H/L>2 fold in the protein expression level analyses. For hit peptide andprotein selection in the thermodynamic analyses, all the H/L ratios generated for the non-methionine containingpeptides from a given protein were divided by the median H/L ratio for that protein in order to generate normalizedH/L ratios for each non-methionine containing peptide. These normalized H/L ratios were log2 transformed. Thenormalized and log2 transformed H/L ratios generated for the non-methionine-containing peptides in a given analysiswere used to determine the 5th and 95th percentiles values used in subsequent analysis of methionine-containingpeptides. The averaged H/L ratios calculated for each methionine-containing peptides were also normalized and log2transformed. The methionine-containing peptides and proteins with log2 transformed H/L ratios less than the 5thpercentile or greater than the 95th percentile values determined above were selected and then visually inspected todetermine which peptides had altered H/L ratios at 2 or more consecutive denaturant concentrations to generate aninitial list of protein hits.",
    "sample_protocol": "SILAC labeled MCF-7 and MDA-MB-231 cell lysates were prepared according to established SILAC protocols. Aliquots of each lysate were distributed into a series of denaturant-containing buffers, reacted with hydrogen peroxide under conditions that selectively oxidize exposed methionine residues, and quenched with the addition of excess methionine. The light and heavy samples generated at matching denaturant concentration were combined. Each combined protein sample was submitted to a bottom-up, solution-phase, shotgun proteomics analysis using LC-MS/MS. Ultimately, L/H ratios were obtained for the peptides detected at each denaturant concentration, and the denaturant dependence of the L/H ratio’s was examined."
    }
</code></pre>

                            <h2 id="v1-pagination">Pagination</h2>

                            <p>Responses containing multiple datasets are paginated to prevent accidental downloads of large amounts of data and to speed up the API.</p>

                            <p>The page size is controlled by the <code>size</code> parameter. Its default value is
                                <strong>20 datasets per page</strong>, and the maximum number of datasets per page is
                                <strong>100</strong>.</p>

                            <p>Another parameter is <code>start</code> which indicates the numeric order (starting from <code>0</code>, not <code>1</code>) of the first dataset in this page. Its default value is
                                <strong>0</strong>.</p>

                            <h4>Examples</h4>

                            <ul>

                                <li><a href="http://www.ebi.ac.uk/Tools/ddi/ws/dataset/search?query=human&start=0&size=50">http://www.omicsdi.org/ws/dataset/search?query=human&start=0&size=50</a>
                                </li>
                                <li><a href="http://www.ebi.ac.uk/Tools/ddi/ws/dataset/search?query=human&start=0&size=50">http://www.omicsdi.org/ws/dataset/search?query=human&start=0&size=20</a>
                            </ul>


                            <h2 id="v1-sort">Sort</h2>

                            <p>The result datasets can be sorted using the title, description, publication date, accession id and the relevance of the query term..</p>

                            <h4>Examples</h4>

                            <ul>
                                <li><a href="http://www.ebi.ac.uk/Tools/ddi/ws/dataset/search?query=human&sort_field=id">http://www.omicsdi.org/ws/dataset/search?query=human&sort_field=id</a>
                                </li>
                                <li>
                                    <a href="http://www.ebi.ac.uk/Tools/ddi/ws/dataset/search?query=human&sort_field=publication_date">http://www.omicsdi.org/ws/dataset/search?query=human&sort_field=publication_date</a>
                                </li>
                            </ul>


                            <h2 id="v1-output-formats">Output formats</h2>

                            <p>The following output format is: <strong>JSON</strong></p>

                            <h2 id="v1-filtering">Filtering</h2>

                            <p>The API supports several filtering operations that complement the main OmicsDI search functionality.</p>

                            <h3 id="v1-filtering-by-search-term">Filtering by search term</h3>

                            <p>There is 1 url parameter: <code>query</code></p>

                            <h4>Examples</h4>

                            <ul>
                                <li><a href="http://www.ebi.ac.uk/Tools/ddi/ws/dataset/search?query=human">http://www.omicsdi.org/ws/dataset/search?query=human</a>
                                </li>
                                <li><a href="http://www.ebi.ac.uk/Tools/ddi/ws/dataset/search?query=cancer">http://www.omicsdi.org/ws/dataset/search?query=cancer</a>
                                </li>
                            </ul>

                            <h3 id="v1-filtering-by-omics-type">Filtering by omics type</h3>

                            <p>The omics type can be specified by adding terms in the <code>query</code> url parameter with key:
                                <code>omics_type</code> (possible values: <em>Proteomics</em>, <em>Metabolomics</em>,<em>Genomics</em>, <em>Transcriptomics</em>).</p>

                            <h4>Examples</h4>

                            <ul>

                                <li>
                                    <a href='http://www.ebi.ac.uk/Tools/ddi/ws/dataset/search?query=human AND omics_type: "Proteomics"'>http://www.omicsdi.org/ws/dataset/search?query=human
                            AND omics_type:"Proteomics"</a></li>
                                <li>
                                    <a href='http://www.ebi.ac.uk/Tools/ddi/ws/dataset/search?query=human AND omics_type: "Metabolomics"'>http://www.omicsdi.org/ws/dataset/search?query=human
                            AND omics_type:"Metabolomics"</a></li>
                            </ul>

                            <h3 id="v1-filtering-by-database">Filtering by database</h3>

                            <p>The database can be specified by adding terms in the <code>query</code> url parameter with key:
                                <code>repository</code> (possible values:<em>MassIVE</em>, <em>Metabolights</em>, <em>PeptideAtlas</em>, <em>PRIDE</em>, <em>GPMDB</em>, <em>EGA</em>, <em>Metabolights</em>, <em>Metabolomics Workbench</em>, <em>MetabolomeExpress</em>,
                                <em>GNPS</em>, <em>ArrayExpress</em>, <em>ExpressionAtlas</em>).
                            </p>

                            <h4>Examples</h4>

                            <ul>

                                <li>
                                    <a href='http://www.ebi.ac.uk/Tools/ddi/ws/dataset/search?query=human AND repository:"Massive"'>http://www.omicsdi.org/ws/dataset/search?query=human
                            AND repository:"MassIVE"</a></li>
                                <li>
                                    <a href='http://www.ebi.ac.uk/Tools/ddi/ws/dataset/search?query=human AND repository:"Metabolights"'>http://www.omicsdi.org/ws/dataset/search?query=human
                            AND repository:"Metabolights"</a></li>
                                <li>
                                    <a href='http://www.ebi.ac.uk/Tools/ddi/ws/dataset/search?query=human AND repository:"PeptideAtlas"'>http://www.omicsdi.org/ws/dataset/search?query=human
                            AND repository:"PeptideAtlas"</a></li>
                                <li>
                                    <a href='http://www.ebi.ac.uk/Tools/ddi/ws/dataset/search?query=human AND repository:"PRIDE"'>http://www.omicsdi.org/ws/dataset/search?query=human
                            AND repository:"PRIDE"</a></li>
                            </ul>

                            <h3 id="v1-filtering-by-organism">Filtering by Organism</h3>

                            <p>The organism can be specified by adding terms in the <code>query</code> url parameter with key:
                                <code>TAXONOMY</code> (possible values must be the TAXONOMY id: <em>9606</em>, <em>10090</em>...).</p>

                            <h4>Examples</h4>

                            <ul>
                                <li><a href='http://www.ebi.ac.uk/Tools/ddi/ws/dataset/search?query=human AND TAXONOMY:"9606"'>http://www.omicsdi.org/ws/dataset/search?query=human
                        AND TAXONOMY:"9606"</a></li>
                                <li><a href='http://www.ebi.ac.uk/Tools/ddi/ws/dataset/search?query=human AND TAXONOMY:"10090"'>http://www.omicsdi.org/ws/dataset/search?query=human
                        AND TAXONOMY:"10090"</a></li>
                            </ul>

                            <h3 id="v1-filtering-by-tissue">Filtering by Tissue</h3>

                            <p>The tissue can be specified by adding terms in the <code>query</code> url parameter with key:
                                <code>tissue</code> (possible values: <em>Liver</em>, <em>Cell culture</em>, <em>Brain</em>, <em>Lung</em>...).</p>

                            <h4>Examples</h4>

                            <ul>
                                <li><a href='http://www.ebi.ac.uk/Tools/ddi/ws/dataset/search?query=human AND tissue:"Brain"'>http://www.omicsdi.org/ws/dataset/search?query=human
                        AND tissue:"Brain"</a></li>
                                <li>
                                    <a href='http://www.ebi.ac.uk/Tools/ddi/ws/dataset/search?query=human AND tissue:"Cell culture"'>http://www.omicsdi.org/ws/dataset/search?query=human
                            AND tissue:"Cell culture"</a></li>
                            </ul>

                            <h3 id="v1-filtering-by-disease">Filtering by Disease</h3>

                            <p>The disease can be specified by adding terms in the <code>query</code> url parameter with key:
                                <code>disease</code> (possible values: <em>Breast cancer</em>, <em>Lymphoma</em>, <em>Carcinoma</em>, <em>prostate
                        adenocarcinoma</em>...).</p>

                            <h4>Examples</h4>

                            <ul>

                                <li>
                                    <a href='http://www.ebi.ac.uk/Tools/ddi/ws/dataset/search?query=human AND disease:"Breast cancer"'>http://www.omicsdi.org/ws/dataset/search?query=human
                            AND tissue:"Breast cancer"</a></li>
                                <li>
                                    <a href='http://www.ebi.ac.uk/Tools/ddi/ws/dataset/search?query=human AND disease:"Lymphoma"'>http://www.omicsdi.org/ws/dataset/search?query=human
                            AND tissue:"Lymphoma"</a></li>
                            </ul>


                            <h3 id="v1-filtering-by-modification">Filtering by Modification
                                <small>(in proteomics)</small>
                            </h3>

                            <p>The Modifications (in proteomics) can be specified by adding terms in the <code>query</code> url parameter with key: <code>disease</code> (possible values: <em>Deamidated residue</em>, <em>Deamidated</em>, <em>Monohydroxylated
                        residue</em>, <em>Iodoacetamide derivatized residue</em>...).</p>

                            <h4>Examples</h4>

                            <ul>
                                <li>
                                    <a href='http://www.ebi.ac.uk/Tools/ddi/ws/dataset/search?query=human AND modification:"iodoacetamide derivatized residue"'>http://www.omicsdi.org/ws/dataset/search?query=human
                            AND modification:"iodoacetamide derivatized residue"</a></li>
                                <li>
                                    <a href='http://www.ebi.ac.uk/Tools/ddi/ws/dataset/search?query=human AND modification:"monohydroxylated residue"'>http://www.omicsdi.org/ws/dataset/search?query=human
                            AND modification:"monohydroxylated residue"</a></li>
                            </ul>

                            <h3 id="v1-filtering-by-instruments-platforms">Filtering by Instruments & Platforms</h3>

                            <p>The Instruments & Platforms can be specified by adding terms in the <code>query</code> url parameter with key: <code>instrument_platform</code> (possible values: <em>QSTAR</em>, <em> LTQ Orbitrap</em>, <em>Q Exactive</em>,
                                <em>LTQ</em>...).</p>

                            <h4>Examples</h4>

                            <ul>
                                <li>
                                    <a href='http://www.ebi.ac.uk/Tools/ddi/ws/dataset/search?query=human AND instrument_platform:"LTQ"'>http://www.omicsdi.org/ws/dataset/search?query=human
                            AND instrument_platform:"LTQ"</a></li>
                                <li>
                                    <a href='http://www.ebi.ac.uk/Tools/ddi/ws/dataset/search?query=human AND instrument_platform:"Q Exactive"'>http://www.omicsdi.org/ws/dataset/search?query=human
                            AND instrument_platform:"Q Exactive"</a></li>
                            </ul>


                            <h3 id="v1-filtering-by-publicationdate">Filtering by Publication Date</h3>

                            <p>The Publication Date can be specified by adding terms in the <code>query</code> url parameter with key: "publication_date" (possible values: <em>2015</em>, <em>2014</em>, <em>2013</em>, <em>2014</em>...).</p>

                            <h4>Examples</h4>

                            <ul>
                                <li>
                                    <a href='http://www.ebi.ac.uk/Tools/ddi/ws/dataset/search?query=human AND publication_date:"2015"'>http://www.omicsdi.org/ws/dataset/search?query=human
                            AND publication_date:"2015"</a></li>
                                <li>
                                    <a href='http://www.ebi.ac.uk/Tools/ddi/ws/dataset/search?query=human AND publication_date:"2014"'>http://www.omicsdi.org/ws/dataset/search?query=human
                            AND publication_date:"2014"</a></li>
                            </ul>


                            <h3 id="v1-filtering-by-technologytype">Filtering by Technology Type</h3>

                            <p>The Technology Type can be specified by adding terms in the <code>query</code> url parameter with key: "technology_type" (possible values: <em>Mass Spectrometry</em>, <em>Bottom-up proteomics</em>, <em>Gel-based
                        experiment</em>, <em> Shotgun proteomics</em>...).</p>

                            <h4>Examples</h4>

                            <ul>
                                <li>
                                    <a href='http://www.ebi.ac.uk/Tools/ddi/ws/dataset/search?query=human AND technology_type:"Mass Spectrometry"'>http://www.omicsdi.org/ws/dataset/search?query=human
                            AND technology_type:"Mass Spectrometry"</a></li>
                                <li>
                                    <a href='http://www.ebi.ac.uk/Tools/ddi/ws/dataset/search?query=human AND technology_type:"Shotgun proteomics"'>http://www.omicsdi.org/ws/dataset/search?query=human
                            AND technology_type:"Shotgun proteomics"</a></li>
                            </ul>


                            <h3 id="v1-combined-filters">Combined filters</h3>

                            <p>Any filters can be combined to narrow down the query using the <code>AND</code> operator. More logical operators will be supported in the future.</p>

                            <h4>Examples</h4>

                            <ul>
                                <li>
                                    <a href='http://www.ebi.ac.uk/Tools/ddi/ws/dataset/search?query=human AND technology_type:"Mass Spectrometry" AND publication_date:"2015"'>http://www.omicsdi.org/ws/dataset/search?query=human
                            AND technology_type:"Mass Spectrometry" AND publication_date:"2015"</a></li>
                                <li>
                                    <a href='http://www.ebi.ac.uk/Tools/ddi/ws/dataset/search?query=human AND technology_type:"Shotgun proteomics" AND modification:"monohydroxylated residue"'>http://www.omicsdi.org/ws/dataset/search?query=human
                            AND technology_type:"Shotgun proteomics" and AND modification:"monohydroxylated residue"</a>
                                </li>
                            </ul>

                        </div>


                        <div class="col-md-2 nav-float" style="position:sticky;top:6em">
                            <nav id="affix-nav" class="sidebar hidden-print visible-lg" role="complementary">
                                <ul style="width: 272px;" class="nav sidenav affix-top" data-spy="affix" id="affix-ul">
                                    <li>
                                        <a href="" ng-click="scrollTo('overview')">API Overview</a>
                                        <ul class="nav">
                                            <li><a href="" ng-click="scrollTo('web-browsable-api')">Web browsable API</a></li>
                                            <li><a href="" ng-click="scrollTo('versioning')">Versioning</a></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="" ng-click="scrollTo('v1')">API v1 documentation</a>
                                        <ul class="nav">
                                            <li>
                                                <a href="" ng-click="scrollTo('v1-example-responses')">Example responses</a>
                                                <ul class="nav hide">
                                                    <li><a href="" ng-click="scrollTo('v1-hyperlinked-vs-flat-responses')">Hyperlinked
                                            vs flat responses</a></li>
                                                </ul>
                                            </li>
                                            <li><a href="" ng-click="scrollTo('v1-pagination')">Pagination</a></li>
                                            <li><a href="" ng-click="scrollTo('v1-sort')">Sort</a></li>
                                            <li><a href="" ng-click="scrollTo('v1-output-formats')">Output formats</a></li>
                                            <li>
                                                <a href="" ng-click="scrollTo('v1-filtering')">Filtering</a>
                                                <ul class="nav">
                                                    <li><a href="" ng-click="scrollTo('v1-filtering-by-database')">Filtering by
                                            database</a></li>
                                                    <li><a href="" ng-click="scrollTo('v1-filtering-by-organism')">Filtering by
                                            Organism</a></li>
                                                    <li><a href="" ng-click="scrollTo('v1-filtering-by-tissue')">Filtering by
                                            Tissue</a>
                                                    </li>
                                                    <li><a href="" ng-click="scrollTo('v1-filtering-by-disease')">Filtering by
                                            Disease</a></li>
                                                    <li><a href="" ng-click="scrollTo('v1-filtering-by-modification')">Filtering by
                                            Modification</a></li>
                                                    <li><a href="" ng-click="scrollTo('v1-filtering-by-instruments-platform')">Filtering
                                            by Instruments & Platforms</a></li>
                                                    <li><a href="" ng-click="scrollTo('v1-filtering-by-publicationdate')">Filtering
                                            by
                                            Publication Date</a></li>
                                                    <li><a href="" ng-click="scrollTo('v1-filtering-by-technologytype')">Filtering
                                            by
                                            Technology Type</a></li>
                                                    <li><a href="" ng-click="scrollTo('v1-combined-filters')">Combined filters</a>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                <!--wrapper-->

                <script src="https://google-code-prettify.googlecode.com/svn/loader/run_prettify.js"></script>

                <!--main container -->

                <!-- </div> ResultsListCtrl -->
                <footer>
                    <div class="row" id="global-footer">

                        <nav class="col-md-12" id="global-nav-expanded">

                            <div class="col-md-2 col-sm-12 col-xs-12">
                                <a title="European Bioinformatics Institute homepage" target="_blank" class="no-icon" href="http://www.ebi.ac.uk/">
                                    <img class="img_at_footer ebi-img" alt="EMBL-EBI logo" src="static/images/logo/embl-ebi.jpg" style="width:150px; margin-top:9px">
                                </a>

                                <a title="BD2K" target="_blank" class="no-icon" href="http://www.heartbd2k.org/">
                                    <img class="img_at_footer img" alt="" src="static/images/logo/bd2k.png" style="width:150px; margin-top:9px">
                                </a>
                                <a href="http://metabolomexchange.org/" target="_blank">
                                    <img src="static/images/home/metabolome.png" class="img_at_footer" style="width:150px; margin-top:9px" /></a>
                                <a class="img_at_footer" href="http://www.proteomexchange.org/" target="_blank">
                                    <img src="static/images/home/proteome.png" style="width:150px; margin-top:9px"></a>
                                <a class="img_at_footer" href="https://www.ebi.ac.uk/ega/" target="_blank">
                                    <img src="static/images/db-logos/ega_phenome_logo.jpg" style="width:80px; margin-top:9px">
                                </a>
                            </div>

                            <div class="col-md-8 col-sm-8 col-xs-12">
                                <h3 class="about">
                                    OmicsDI Databases
                                </h3>


                                <div class="col-md-3 col-sm-4 col-xs-4">
                                    <ul>

                                        <li><a target="_blank" href="http://www.ebi.ac.uk/pride/archive/" class="no-icon">PRIDE</a>
                                        </li>

                                        <li><a target="_blank" href="http://www.peptideatlas.org/" class="no-icon">PeptideAtlas</a>
                                        </li>

                                        <li><a target="_blank" href="https://massive.ucsd.edu/ProteoSAFe/datasets.jsp" class="no-icon">MassIVE</a>
                                            <li><a target="_blank" href="http://gpmdb.thegpm.org/" class="no-icon">GPMDB</a>
                                            </li>

                                    </ul>
                                </div>

                                <div class="col-md-3 col-sm-4 col-xs-4">
                                    <ul>

                                        <li><a target="_blank" href="https://www.ebi.ac.uk/ega/" class="no-icon">EGA</a></li>


                                    </ul>
                                </div>

                                <div class="col-md-3 col-sm-4 col-xs-4">
                                    <ul>


                                        <li><a target="_blank" href="http://www.ebi.ac.uk/metabolights/" class="no-icon">MetaboLights</a>
                                        </li>

                                        <li><a target="_blank" href="http://www.metabolomicsworkbench.org/" class="no-icon">Metabolomics
                                Workbench</a></li>
                                        <li><a target="_blank" href="https://www.metabolome-express.org/" class="no-icon">MetabolomeExpress</a>
                                            <li><a target="_blank" href="https://GNPS.ucsd.edu" class="no-icon">GNPS</a>
                                            </li>

                                    </ul>
                                </div>
                                <div class="col-md-3 col-sm-4 col-xs-4">
                                    <ul>
                                        <li><a target="_blank" href="https://www.ebi.ac.uk/arrayexpress/" class="no-icon">ArrayExpress</a>
                                        </li>
                                        <li><a target="_blank" href="http://www.ebi.ac.uk/gxa/home" class="no-icon">ExpressionAtlas</a></li>

                                    </ul>
                                </div>


                            </div>

                            <div class="col-md-2 col-sm-4 col-xs-12">
                                <h3 class="about">Information</h3>
                                <ul>
                                    <li><a href="/about">About OmicsDI</a></li>
                                    <li><a href="/databases">Databases</a></li>
                                    <li><a href="/help">Help</a></li>
                                    <li><a href="/api">API</a></li>
                                    <li><a href="http://www.ebi.ac.uk/support/index.php?query=pride">Contact us</a></li>
                                    <li><a target="_blank" href="https://github.com/BD2K-DDI/" class="no-icon">Code on GitHub</a>
                                    </li>
                                    <li><a target="_blank" href="http://www.ebi.ac.uk/about/terms-of-use" class="no-icon">Terms of
                            use</a>
                                    </li>
                                </ul>
                            </div>

                        </nav>

                    </div>
                </footer>
                </div>

                <!--wraper of page -->
                <!-- To have google analytics-->
               <%-- <script>
                    (function(i, s, o, g, r, a, m) {
                        i['GoogleAnalyticsObject'] = r;
                        i[r] = i[r] || function() {
                            (i[r].q = i[r].q || []).push(arguments)
                        }, i[r].l = 1 * new
                        Date();
                        a = s.createElement(o),
                            m = s.getElementsByTagName(o)[0];
                        a.async = 1;
                        a.src = g;
                        m.parentNode.insertBefore(a, m)
                    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

                    ga('create', 'UA-70417662-1', 'auto');
                    ga('send', 'pageview');
                </script>
--%>

                <script src="static/js/libs/jquery/jquery-1.10.1.min.js"></script>
                <script src="static/js/libs/angular/angular.min.js"></script>
                <script src="static/js/libs/underscore/underscore-min.js"></script>
                <script src="static/js/libs/angular-route/angular-route.min.js"></script>
                <script src="static/js/libs/angular/angular-cookies.js"></script>
                <script src="static/js/libs/angular/angular-animate.min.js"></script>
                <script src="static/js/libs/angular/ngprogress.min.js"></script>
                <script src="static/js/libs/angular/autocomplete.js"></script>
                <script src="static/js/libs/angular-ui/ui-bootstrap-tpls-0.14.2.js"></script>

                <script src="static/js/app.js"></script>
                <script src="static/js/DDIService.js"></script>
                <script src="static/js/DDIMainContentCtl.js"></script>
                <script src="static/js/DDIQueryCtl.js"></script>
                <script src="static/js/DDIDatasetListsCtl.js"></script>
                <script src="static/js/DDIResultsListCtl.js"></script>
                <script src="static/js/DDIDatasetCtl.js"></script>
                <script src="static/js/DDICheckCtl.js"></script>
                <script src="static/js/DDIGoogleAnalytics.js"></script>


                <script src="static/js/DDIGetTweets.js"></script>
                <script src="static/js/DDIPieCharts.js"></script>
                <script src="static/js/DDIWordCloud.js"></script>
                <script src="static/js/DDIChordDiagram.js"></script>
                <script src="static/js/libs/d3/queue.v1.min.js"></script>
                <script src="static/js/libs/d3/d3.min.js"></script>
                <script src="static/js/libs/d3/d3.layout.cloud.js"></script>
                <script src="static/js/libs/chord2/chord2.js"></script>
                <script src="static/js/libs/slick-carousel/slick/slick.js"></script>
                <script src="static/js/libs/angular-slick/dist/slick.js"></script>

            </body>

            </html>