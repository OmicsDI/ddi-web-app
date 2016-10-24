<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
        <%@ page isELIgnored="false"%>
            <!DOCTYPE html>
            <html xmlns:ng="http://angularjs.org" xmlns:ng="http://angularjs.org" ng-app="ddiApp" id="ng-app" class="js flexbox canvas canvastext webgl no-touch geolocation postmessage no-websqldatabase indexeddb hashchange history draganddrop websockets rgba hsla multiplebgs backgroundsize borderimage borderradius boxshadow textshadow opacity cssanimations csscolumns cssgradients no-cssreflections csstransforms csstransforms3d csstransitions fontface generatedcontent video audio localstorage sessionstorage webworkers applicationcache svg inlinesvg smil svgclippaths ng-scope">

            <head ng-controller="MainContentCtrl">
                <!-- <style type="text/css">@charset "UTF-8";
    [ng\:cloak], [ng-cloak], [data-ng-cloak], [x-ng-cloak], .ng-cloak, .x-ng-cloak, .ng-hide:not(.ng-hide-animate) {
        display: none !important;
    }

    ng\:form {
        display: block;
    }
    </style> -->
                <meta charset="utf-8">
                <meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">
                <meta content="width=device-width" name="viewport">
                <meta content="OmicsDI is a integrate resource to multiple omics repositories, including Proteomics, Metabolomics and Genomics" name="description">

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
                <script type="application/ld+json">
                    {
                        "@context": "http://schema.org",
                        "@type": "Book",
                        "name": "${name}",
                        "publisher": "Linked Data Tools",
                        "inLanguage": "English",
                        "bookFormat": {
                            "@type": "EBook"
                        }
                    }
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
                        document.title = "OmicsDI Help";
                    </script>

                    <div id="content" class="row" style="margin: 10px">
                        <div id="" class="col-md-9 col-lg-9" role="main">
                            <h1 id="Overview">
                                Overview
                            </h1>


                            <p class="align-justify">
                                The Omics Discovery Index (OmicsDI) provides dataset discovery across a heterogeneous, distributed group of genomics, proteomics and metabolomics data resources spanning eight repositories in two continents and six organisations, including both open and
                                controlled access data resources. The resource provides a short description of every dataset: accession, description, sample/data protocols biological evidences, publication, etc. The search capabilities offer a unique
                                resource to search for omics datasets. This fact converts the OmicsDI in the first resource worldwide to provide search capabilities through multi-omics experiments.
                            </p>


                            <h1 id="MajorPartner">
                                Major Partners
                            </h1>


                            <h2 id="ProteomeXchange">
                                <a href="http://www.proteomexchange.org/">ProteomeXchange</a>
                            </h2>


                            <p class="align-justify">
                                The ProteomeXchange Consortium is a collaboration of currently three major mass spectrometry proteomics data repositories, <a href="http://www.ebi.ac.uk/pride/archive/">PRIDE</a> at EMBL-EBI in Cambridge  (UK), <a href="http://peptideatlas.org">PeptideAtlas </a>                                at ISB in Seattle (US), and <a href="http://massive.ucsd.edu"> MASSive</a> at UCSD (US), offering a unified data deposition and discovery strategy across all three repositories. ProteomeXchange is a distributed database
                                infrastructure; the potentially very large raw data component of the data is only held at the original submission database, while the searchable metadata is centrally collected and indexed. All ProteomeXchange data is fully
                                open after release of the associated publication.
                            </p>


                            <h2 id="MetabolomeXchange">
                                <a href="http://metabolomexchange.org/">MetabolomeXchange</a>
                            </h2>


                            <p class="align-justify">
                                MetabolomeXchange is a collaboration of 4 major metabolomics repositories, with a total of 10 partners contributing. MetabolomeXchange was inspired by and is implementing similar coordination strategies to ProteomeXchange. The founding partners are MetaboLights
                                at <a href="http://www.ebi.ac.uk/metabolights/"> EMBL-EBI(UK)</a>, <a href="http://www.cbib.u-bordeaux2.fr/">Metabolomics Repository Bordeaux</a>(FR), <a href="http://gmd.mpimp-golm.mpg.de/">Golm Metabolome Database </a>                                and the <a href="http://www.metabolomicsworkbench.org/">Metabolomics Workbench</a> (US). The Metabolomics Workbench is a NIH funded collaboration of 6 Regional Comprehensive Metabolomics Resource Cores. MetabolomeXchange
                                started accepting metadata submissions in summer 2014, and reached 200 public datasets in March 2015.
                            </p>


                            <h2 id="EGA">
                                The European Genome-Phenome Archive
                            </h2>


                            <p class="align-justify">
                                The European Genome-Phenome Archive (EGA) provides a service for the permanent archiving and distribution of personally identifiable genetic and phenotypic data resulting from biomedical research projects. Data at EGA was collected from individuals whose
                                consent agreements authorise data release only for specific research use to bona fide researchers. Strict protocols govern how information is managed, stored and distributed by the EGA project. The EGA comprises a public
                                metadata section, allowing searching and identifying relevant studies, and the controlled access data section. Access to the data section for a particular study is only granted after validation of a research proposal through
                                the relevant ethics approval.
                            </p>


                            <h2 id="CurrentDatabases">
                                Current Databases
                            </h2>


                            <p class="align-justify">
                                The original OmicsDI project provides access to eleven different databases with proteomics, genomics, transcriptomics and metabolomics data from Europe and Unite States (see <a href="/databases">updated list </a>). The
                                original list includes: PRIDE (proteomics, UK), PeptideAtlas (proteomics, US), MassIVE (proteomics, US), GPMDB (proteomics, Canada), Metaboligths (metabolomics, UK), MetabolomeWorkbench (metabolomics, US), GNPS (metabolomics,
                                USA), MetabolomeExpress (metabolomics, Australia), ArrayExpress and GEO (transcriptomics, genomics, UK), ExpressionAtlas (UK), EGA (genomics, UK).
                            </p>


                            <p class="align-justify">
                                The project is open for new partners and databases (please contact us: <a href="omicsdi-support@ebi.ac.uk">omicsdi-support@ebi.ac.uk</a>). If you are interested in the architecture and the metadata that the resource should
                                provide see section <a href="https://github.com/BD2K-DDI/specifications#23-Omicsdi-architecture">2.3</a> and <a href="https://github.com/BD2K-DDI/specifications#24-omicsDI-xml">2.4</a> in "Specifications" of OmicsDI.
                            </p>


                            <h1 id="OmicsDIwebapplication">
                                OmicsDI web application
                            </h1>


                            <p class="align-justify">
                                The main goal of OmicsDI project is to have a way to search interesting datasets across omics repositories. The main web application and web service (see <a href="/api">here</a>) allow the user to search and navigate through
                                the OmicsDI datasets. The OmicsDI web application offers two main access modes: (i) using the home page navigation panels or (ii) the search box.
                            </p>


                            <h2 id="Navigate">
                                Navigate the data from home page
                            </h2>

                            <p class="align-justify">
                                The OmicsDI home page provides different blocks to navigate through the datasets, some of them are: 2D WordCloud; the species/organism/diseases bubble chart, repo/omics pie chart, Latest datasets, Most accessed datasets, Datasets per year. All the charts
                                allow the user to search the data using the specific attribute. These boxes also act as an statistic component of the resource : for example the pie chart shows how many datasets for each repository and omics the resource
                                contains.
                            </p>

                            <p>
                                <img src="/static/images/help/1.png" class="center">
                            </p>


                            <p class="align-justify">
                                A <b>TagCloud or WordCloud</b> is a visual representation for metadata, typically used to depict keyword metadata (tags) on datasets, or to visualize free form text. The WordCloud is build using the more frequently words
                                for every database/repository. The OmicsDI <a>WordCloud</a> can be consider as a two dimensional term representation where the user can select the database and the field they want to look for: description vs database. The
                                user can click the highlight word in the wordcloud to search for this term in the resource.
                            </p>


                            <p class="align-justify">
                                The <b>bubble chart block</b> allows the users to navigate the data using three main categories: Tissues, Organisms, and Diseases. The user can click in the bubble and it will be redirected to the search using the clicked
                                term.
                            </p>


                            <p class="align-justify">
                                The <b>Repo/Omics pie chart</b> and the <b>Omics vs Year bar chart</b> allow the users navigate the data using the omics categories (metabolomics, transcriptomics, proteomics and genomics). The user can click a bar or the
                                pie and it will be redirected to the search using the clicked term.
                            </p>


                            <p class="align-justify">
                                The <b>Latest Datasets</b> and <b>Most accessed datasets</b> blocks provide a list of the datasets by the tow categories.
                            </p>


                            <h2 id="Searchingdatasets">
                                Searching datasets
                            </h2>

                            <p class="align-justify">
                                The main search box in OmicsDI allows the user to search datasets using different keywords. The main search redirects the user to the browser page where the user can see the results of the search (see section 3.3).
                            </p>

                            <p>
                                <img src="/static/images/help/2.png" class="center">
                            </p>

                            <p class="align-justify">
                                <code>
                        The OmicsDI search page is better that most of the partners (proteomeXchange, metabolomeXchange)
                        searching the data because the data is also indexed using cross-references to other databases.
                    </code>
                            </p>

                            <h3 id="Searchingusingpublication">
                                Searching using publication details
                            </h3>


                            <p class="align-justify">
                                The user can use the PubMed identifier, Title, Authors or even terms from the publication abstract.
                            </p>


                            <p>
                                <img src="/static/images/help/3.png" class="center">
                            </p>


                            <h3 id="Searchingusingbiological">
                                Searching using biological Evidences
                            </h3>


                            <p class="align-justify">
                                The search box allows the end-users to search data using biological evidences such as the list of the proteins identified in the proteomics experiment or the metabolite reported in the metabolomics experiment. For example if the user search for 3-methyl-2-oxobutanoic
                                in the resource it will found one dataset in Metaboligths and five in Metabolome workbench that identified the current molecule.
                            </p>


                            <p>
                                <img src="/static/images/help/4.png" class="center">
                            </p>


                            <h2 id="RefiningtheSearchresults">
                                Refining the Search results
                            </h2>

                            <p class="align-justify">
                                The search results can be filter or refine using different categories, filters or terms. The OmicsDI web application supports at the moment nine different refinements: (1) omics type, (2) repository/database, (3) organisms, (4) tissue, diseases, (5) modifications
                                (proteomics), (6) instruments and platforms, (7)publication data, (8) technology type.
                            </p>


                            <p>
                                <img src="/static/images/help/5.png" class="center">
                            </p>


                            <p class="align-justify">
                                The refine filters works in combination, if the user set two filters they will act at the same time.
                            </p>


                            <h1 id="DatasetView">
                                Dataset View
                            </h1>

                            <p class="align-justify">
                                The dataset View shows the information for every dataset in the resource. It contains four main information components: (1) the dataset description, (2) the sample/data protocol, (3) the publication information, and (4) the similar datasets.
                            </p>

                            <p>
                                <img src="/static/images/help/6.png" class="center">
                            </p>


                            <h1 id="OmicsDIArchitecture">
                                OmicsDI Architecture
                            </h1>

                            <p class="align-justify">
                                The OmicsDI project design is a modular architecture with three main components (Figure 1): (i) Database/Repository Adapters, (ii) EBI Search Indexer, (iii) OmicsDI Application. In summary, the Database/Repository Adapters provides all the libraries and
                                readers to translate the original repository/databases information into a universal and highly customizable XML file for each dataset (see section 5.1). The EBI Search Indexer is a Lucene-based framework that enables to
                                index all the metadata and biological evidences for each dataset (see section 5.2). The OmicsDI application component provides a MongoDB, web-services and web application for search and access the different datasets.
                            </p>


                            <p>
                                <img src="/static/images/help/7.png" class="center">
                            </p>


                            <h2 id="DatabaseRepositoryAdapters">
                                Database/Repository Adapters
                            </h2>

                            <p class="align-justify">
                                The database/repository Adapter components are a set of readers and libraries that translate the data from the original repositories to a common XML-based file. The OmicsDI-XML is a fully customizable XML file used to represent the data from the different
                                datasets, it contains as mandatory for each dataset:
                                <ul>
                                    <li>Dataset ID</li>
                                    <li>Dataset Title</li>
                                    <li>Type of experiment</li>
                                    <li>Publication date</li>
                                    <li>Submitter details</li>
                                </ul>
                                A full description of the XML and the exporters can be found in <a href="https://github.com/BD2K-OmicsDI">Github </a>. If you need to add a new data resource, that is a new domain, get in touch first with the <a href="omicsdi-support@ebi.ac.uk">OmicsDI team </a>.
                            </p>

                            <h2 id="EBISearchIndexer">
                                EBI Search Indexer
                            </h2>

                            <p>
                                In summary, the indexing pipeline:
                                <ul>
                                    <li>Based on Apache Lucene</li>
                                    <li>An automatized indexing cycle takes place on daily basis.</li>
                                    <li>Check every night, for every domain if new data is available.</li>
                                    <li>The process benefits from the indexing parallelization.</li>
                                    <li>All domains together: ~750GB, more than 300GB indexes</li>
                                    <li>While the software releases are less frequent, the data to index is checked dail</li>
                                </ul>
                            </p>


                        </div>
                        <div class="col-md-3 col-lg-3 nav-float" style="position:sticky;top:6em">
                            <nav id="affix-nav" class="sidebar  hidden-print visible-lg " role="complementary" style="">
                                <ul style="width: 272px;" class="nav sidenav affix-top" data-spy="affix" id="affix-ul">
                                    <li>
                                        <a href="" ng-click="scrollTo('Overview')">Overview</a>
                                    </li>
                                    <li>
                                        <a href="" ng-click="scrollTo('MajorPartner')">Major Partners</a>
                                        <ul class="nav">
                                            <li>
                                                <a href="" ng-click="scrollTo('ProteomeXchange')">ProteomeXchange</a>
                                            </li>
                                            <li><a href="" ng-click="scrollTo('MetabolomeXchange')">MetabolomeXchange</a></li>
                                            <li><a href="" ng-click="scrollTo('EGA')">The European Genome-Phenome Archive</a></li>
                                            <li><a href="" ng-click="scrollTo('CurrentDatabases')">Current Databases</a></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="" ng-click="scrollTo('OmicsDIwebapplication')">OmicsDI web application</a>
                                        <ul class="nav">
                                            <li><a href="" ng-click="scrollTo('Navigate')">Navigate the data from home page</a></li>
                                            <li><a href="" ng-click="scrollTo('Searchingdatasets')">Searching datasets</a>
                                                <ul class="nav">
                                                    <li><a href="" ng-click="scrollTo('Searchingusingpublication')">Searching using
                                            publication details</a></li>
                                                    <li><a href="" ng-click="scrollTo('Searchingusingbiological')">Searching using
                                            biological Evidences</a></li>
                                                </ul>
                                            </li>
                                            <li><a href="" ng-click="scrollTo('RefiningtheSearchresults')">Refining the Search
                                    results</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="" ng-click="scrollTo('DatasetView')">Dataset View</a></li>
                                    <li><a href="" ng-click="scrollTo('OmicsDIArchitecture')">OmicsDI Architecture</a>
                                        <ul class="nav">
                                            <li><a href="" ng-click="scrollTo('DatabaseRepositoryAdapters')">Database/Repository
                                    Adapters</a></li>
                                            <li><a href="" ng-click="scrollTo('EBISearchIndexer')">EBI Search Indexer</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
                <!--container-->

                </div>
                <!--wrapper-->

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
                                    <li><a href="/help#/Overview">Help</a></li>
                                    <li><a href="/api#/overview">API</a></li>
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
                <script>
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