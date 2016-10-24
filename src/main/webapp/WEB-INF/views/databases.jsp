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
                        document.title = "OmicsDI Databases";
                    </script>

                    <div id="databases" style="margin: 20px" ng-controller="DatasetListsCtrl">

                        <slick infinite=true dots=true slides-to-show=1 slides-to-scroll=1>
                            <div id="slick-page-one">

                                <div class="row">

                                    <div class="col-md-3 col-sm-6 col-xs-12">
                                        <div class="panel panel-default expert-db-card ">

                                            <div class="expert-db-card-header">
                                                <a href="http://www.ebi.ac.uk/pride/archive/">PRIDE</a>
                                            </div>

                                            <div class="expert-db-card-logo">
                                                <a title="PRIDE Database" href="http://www.ebi.ac.uk/pride/archive/" class="pull-right expert-db-logo image_a">
                                                    <img alt="PRIDE logo" src="/static/images/db-logos/pride_logo.jpg" class="img-rounded hvr-grow">
                                                </a>
                                            </div>

                                            <div class="panel-body small">
                                                is a centralized, standards compliant, public data repository for proteomics data, including protein and peptide identifications, post-translational modifications and supporting spectral evidence.
                                            </div>

                                            <div class="panel-footer small">
                                                <a rel="nofollow" href='/search?q=*:* AND repository:"pride"'><em>{{databases.PRIDE}}</em>
                                datasets</a>
                                            </div>

                                        </div>
                                    </div>


                                    <div class="col-md-3 col-sm-6 col-xs-12">
                                        <div class="panel panel-default expert-db-card ">

                                            <div class="expert-db-card-header">
                                                <a href="https://www.ebi.ac.uk/ega/">EGA</a>
                                            </div>

                                            <div class="expert-db-card-logo">
                                                <a title="EGA Database" href="https://www.ebi.ac.uk/ega/" class="pull-right expert-db-logo image_a">
                                                    <img alt="EGA logo" src="/static/images/db-logos/ega_phenome_logo.jpg" class="img-rounded hvr-grow">
                                                </a>
                                            </div>

                                            <div class="panel-body small">
                                                allows you to explore datasets from genomic studies, provided by a range of data providers. Access to datasets must be approved by the specified Data Access Committee (DAC).
                                            </div>

                                            <div class="panel-footer small">
                                                <a rel="nofollow" href='/search?q=*:* AND repository:"ega"'><em>{{databases.EGA}}</em>
                                datasets</a>
                                            </div>

                                        </div>
                                    </div>


                                    <div class="col-md-3 col-sm-6 col-xs-12">
                                        <div class="panel panel-default expert-db-card ">

                                            <div class="expert-db-card-header">
                                                <a href="http://www.ebi.ac.uk/metabolights/">MetaboLights</a>
                                            </div>

                                            <div class="expert-db-card-logo">
                                                <a title="MetaboLights Database" href="http://www.ebi.ac.uk/metabolights/" class="pull-right expert-db-logo image_a">
                                                    <img alt="MetaboLignts logo" src="/static/images/db-logos/MetaboLightsLogo.png" class="img-rounded hvr-grow">
                                                </a>
                                            </div>

                                            <div class="panel-body small">
                                                is a database for Metabolomics experiments and derived information.
                                            </div>

                                            <div class="panel-footer small">
                                                <a rel="nofollow" href='/search?q=*:* AND repository:"MetaboLights"'><em>{{databases["MetaboLights Dataset"]}}</em> datasets</a>
                                            </div>

                                        </div>
                                    </div>


                                    <div class="col-md-3 col-sm-6 col-xs-12">
                                        <div class="panel panel-default expert-db-card ">

                                            <div class="expert-db-card-header">
                                                <a href="http://www.peptideatlas.org/">PeptideAtlas</a>
                                            </div>

                                            <div class="expert-db-card-logo">
                                                <a title="PeptideAtlas Database" href="http://www.peptideatlas.org/" class="pull-right expert-db-logo image_a">
                                                    <img alt="RefSeq logo" src="/static/images/db-logos/PeptideAtlas_Logo.png" class="img-rounded hvr-grow">
                                                </a>
                                            </div>

                                            <div class="panel-body small">
                                                is a multi-organism, publicly accessible compendium of peptides identified in a large set of tandem mass spectrometry proteomics experiments.
                                            </div>

                                            <div class="panel-footer small">
                                                <a rel="nofollow" href='/search?q=*:* AND repository:"PeptideAtlas"'><em>{{databases.PeptideAtlas}}</em>
                                datasets</a>
                                            </div>

                                        </div>
                                    </div>

                                </div>

                                <div class="row">

                                    <div class="col-md-3 col-sm-6 col-xs-12">
                                        <div class="panel panel-default expert-db-card ">

                                            <div class="expert-db-card-header">
                                                <a href="https://massive.ucsd.edu/ProteoSAFe/datasets.jsp">MassIVE</a>
                                            </div>

                                            <div class="expert-db-card-logo">
                                                <a title="MassIVE Database" href="https://massive.ucsd.edu/ProteoSAFe/datasets.jsp" class="pull-right expert-db-logo image_a">
                                                    <img alt="MassIVE logo" src="/static/images/db-logos/MassIVE_logo.png" class="img-rounded hvr-grow">
                                                </a>
                                            </div>

                                            <div class="panel-body small">
                                                is a community resource developed by the NIH-funded Center for Computational Mass Spectrometry to promote the global, free exchange of mass spectrometry data.
                                            </div>

                                            <div class="panel-footer small">
                                                <a rel="nofollow" href='/search?q=*:* AND repository:"MassIVE"'><em>{{databases.MassIVE}}</em>
                                datasets</a>
                                            </div>

                                        </div>
                                    </div>

                                    <div class="col-md-3 col-sm-6 col-xs-12">
                                        <div class="panel panel-default expert-db-card ">

                                            <div class="expert-db-card-header">
                                                <a href="http://www.metabolomicsworkbench.org/">Metabolomics Workbench</a>
                                            </div>

                                            <div class="expert-db-card-logo">
                                                <a title="Metabolomics Workbench Database" href="http://www.metabolomicsworkbench.org/" class="pull-right expert-db-logo image_a">
                                                    <img alt="Metabolomics Workbench logo" src="/static/images/db-logos/Metabolomics_Workbench_logo.png" class="img-rounded hvr-grow">
                                                </a>
                                            </div>

                                            <div class="panel-body small">
                                                is a scalable and extensible informatics infrastructure which will serve as a national metabolomics resource.
                                            </div>

                                            <div class="panel-footer small">
                                                <a rel="nofollow" href='/search?q=*:* AND repository:"MetabolomicsWorkbench"'><em>{{databases["Metabolomics Workbench"]}}</em> datasets</a>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-3 col-sm-6 col-xs-12">
                                        <div class="panel panel-default expert-db-card ">

                                            <div class="expert-db-card-header">
                                                <a href="http://gpmdb.thegpm.org/">GPMDB</a>
                                            </div>

                                            <div class="expert-db-card-logo">
                                                <a title="GPMDB Database" href="http://gpmdb.thegpm.org/" class="pull-right  image_a">
                                                    <img alt="GPMDB logo" src="/static/images/db-logos/the_gpm_db_140x105.png" class="img-rounded hvr-grow">
                                                </a>
                                            </div>

                                            <div class="panel-body small">
                                                The Global Proteome Machine Database was constructed to utilize the information obtained by GPM servers to aid in the difficult process of validating peptide MS/MS spectra as well as protein coverage patterns.
                                            </div>

                                            <div class="panel-footer small">
                                                <a rel="nofollow" href='/search?q=*:* AND repository:"GPMDB"'><em>{{databases["GPMdb"]}}</em> datasets</a>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-3 col-sm-6 col-xs-12">
                                        <div class="panel panel-default expert-db-card ">

                                            <div class="expert-db-card-header">
                                                <a href="https://www.metabolome-express.org/">MetabolomeExpress</a>
                                            </div>

                                            <div class="expert-db-card-logo">
                                                <a title="MetabolomeExpress Database" href="https://www.metabolome-express.org/" class="pull-right  image_a">
                                                    <img alt="MetabolomeExpress logo" src="/static/images/db-logos/metabolome express logo_Mx.png" class="img-rounded hvr-grow">
                                                </a>
                                            </div>

                                            <div class="panel-body small">
                                                A public place to process, interpret and share GC/MS metabolomics datasets.
                                                <!--MetabolomeExpress houses both private and public uncurated repositories as well as a quality-controlled database of highly-annotated metabolite response statistics submitted by MetabolomeExpress users.-->
                                            </div>
                                            <div class="panel-footer small">
                                                <a rel="nofollow" href='/search?q=*:* AND repository:"MetabolomeExpress"'><em>{{databases["MetabolomeExpress"]}}</em> datasets</a>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <!--row-->
                            </div>
                            <div id="slick-page-two">

                                <div class="row">
                                    <div class="col-md-3 col-sm-6 col-xs-12">
                                        <div class="panel panel-default expert-db-card ">

                                            <div class="expert-db-card-header">
                                                <a href="https://gnps.ucsd.edu/ProteoSAFe/static/gnps-splash.jsp">GNPS</a>
                                            </div>

                                            <div class="expert-db-card-logo">
                                                <a title="GNPS Database" href="https://gnps.ucsd.edu/ProteoSAFe/static/gnps-splash.jsp" class="pull-right expert-db-logo image_a">
                                                    <img alt="GNPS logo" src="/static/images/db-logos/GNPS_logo.png" class="img-rounded hvr-grow">
                                                </a>
                                            </div>

                                            <div class="panel-body small">
                                                The Global Natural Products Social Molecular Networking (GNPS) is a platform for providing an overview of the molecular features in mass spectrometry based metabolomics by comparing fragmentation patterns to identify chemical relationships.
                                            </div>
                                            <div class="panel-footer small">
                                                <a rel="nofollow" href='/search?q=*:* AND repository:"GNPS"'><em>{{databases.GNPS}}</em>
                                datasets</a>
                                            </div>

                                        </div>
                                    </div>

                                    <div class="col-md-3 col-sm-6 col-xs-12">
                                        <div class="panel panel-default expert-db-card ">

                                            <div class="expert-db-card-header">
                                                <a href="https://www.ebi.ac.uk/arrayexpress/">ArrayExpress</a>
                                            </div>

                                            <div class="expert-db-card-logo">
                                                <a title="ArrayExpress Database" href="https://www.ebi.ac.uk/arrayexpress/" class="pull-right expert-db-logo image_a">
                                                    <img alt="ArrayExpress logo" src="/static/images/db-logos/array_express.png" class="img-rounded hvr-grow">
                                                </a>
                                            </div>

                                            <div class="panel-body small">
                                                ArrayExpress Archive of Functional Genomics Data stores data from high-throughput functional genomics experiments, and provides these data for reuse to the research community.
                                            </div>

                                            <div class="panel-footer small">
                                                <a rel="nofollow" href='/search?q=*:* AND repository:"ArrayExpress"'><em>{{databases.ArrayExpress}}</em>
                                datasets</a>
                                            </div>

                                        </div>
                                    </div>

                                    <div class="col-md-3 col-sm-6 col-xs-12">
                                        <div class="panel panel-default expert-db-card ">

                                            <div class="expert-db-card-header">
                                                <a href="http://www.ebi.ac.uk/gxa/home">Expression Atlas</a>
                                            </div>

                                            <div class="expert-db-card-logo">
                                                <a title="Expression Atlas Database" href="http://www.ebi.ac.uk/gxa/home" class="pull-right expert-db-logo image_a">
                                                    <img alt="ExpressioAtlas logo" src="/static/images/db-logos/expression_atlas.png" class="img-rounded hvr-grow">
                                                </a>
                                            </div>

                                            <div class="panel-body small">
                                                The Expression Atlas provides information on gene expression patterns under different biological conditions. Gene expression data is re-analysed in-house to detect genes showing interesting baseline and differential expression patterns.
                                            </div>

                                            <div class="panel-footer small">
                                                <a rel="nofollow" href='/search?q=*:* AND repository:"ExpressionAtlas"'><em>{{databases["Expression Atlas Experiments"]}}</em>
                            datasets</a>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                                <div class="row">
                                </div>
                            </div>
                        </slick>
                    </div>

                    <footer>
                        <div id="footer" class="container"></div>
                    </footer>
                </div>
                </div>
                <!-- wrapper-->

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