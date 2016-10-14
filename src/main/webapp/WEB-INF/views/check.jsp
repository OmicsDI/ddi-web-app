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
                <link rel="stylesheet" href="static/scripts/libs/slick-carousel/slick/slick.css">
                <link rel="stylesheet" href="static/scripts/libs/slick-carousel/slick/slick-theme.css">
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
                        <div class="grid_12 alpha logo-title col-md-5 col-sm-12 col-xs-12" id="local-title">
                            <a href="/home" title="Back to OmicsDI homepage"><img src="static/images/logo/OmicsDI-icon-3.png" alt="logo" width="64" height="64"></a>
                            <span><h1><a href="/home" title="Back to OmicsDI homepage">Omics Discovery Index</a></h1></span>
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

                    <div>
                        <div id="statisticspanel" class="panel panel-default" ng-controller="CheckCtrl" style="height:260px">
                            <p>
                                Web Check: {{$root.web_service_fail}}
                            </p>
                            <p ng-repeat="statisticdata in statistic_list">
                                {{statisticdata.name}}: {{statisticdata.value|number}}
                            </p>
                            <p>
                                Number of most accessed Datasets: {{most_accessed_list.length}}
                            </p>
                        </div>
                    </div>

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


                <script src="static/scripts/libs/jquery/jquery-1.10.1.min.js"></script>
                <script src="static/scripts/libs/angular/angular.min.js"></script>
                <script src="static/scripts/libs/underscore/underscore-min.js"></script>
                <script src="static/scripts/libs/angular-route/angular-route.min.js"></script>
                <script src="static/scripts/libs/angular/angular-cookies.js"></script>
                <script src="static/scripts/libs/angular/angular-animate.min.js"></script>
                <script src="static/scripts/libs/angular/ngprogress.min.js"></script>
                <script src="static/scripts/libs/angular/autocomplete.js"></script>
                <script src="static/scripts/libs/angular-ui/ui-bootstrap-tpls-0.14.2.js"></script>

                <script src="static/scripts/app.js"></script>
                <script src="static/scripts/DDIService.js"></script>
                <script src="static/scripts/DDIMainContentCtl.js"></script>
                <script src="static/scripts/DDIQueryCtl.js"></script>
                <script src="static/scripts/DDIDatasetListsCtl.js"></script>
                <script src="static/scripts/DDIResultsListCtl.js"></script>
                <script src="static/scripts/DDIDatasetCtl.js"></script>
                <script src="static/scripts/DDICheckCtl.js"></script>

                <script src="static/scripts/DDIGetTweets.js"></script>
                <script src="static/scripts/DDIPieCharts.js"></script>
                <script src="static/scripts/DDIWordCloud.js"></script>
                <script src="static/scripts/DDIChordDiagram.js"></script>
                <script src="static/scripts/libs/d3/queue.v1.min.js"></script>
                <script src="static/scripts/libs/d3/d3.min.js"></script>
                <script src="static/scripts/libs/d3/d3.layout.cloud.js"></script>
                <script src="static/scripts/libs/chord2/chord2.js"></script>
                <script src="static/scripts/libs/slick-carousel/slick/slick.js"></script>
                <script src="static/scripts/libs/angular-slick/dist/slick.js"></script>

            </body>

            </html>