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

                <meta content="${meta_dataset_title}" name="dataset_title">
                <meta content="${meta_dataset_abstract}" name="dataset_abstract">
                <meta content={{meta_dataset_identifier}} name="dataset_identifier">
                <meta ng-repeat="entry in meta_entries" name={{entry.name}} content={{entry.content}}>


                <title>OmicsDI: Home</title>
                <link rel="canonical" href={{meta_originalURL}}>
                <link rel="canonical" href={{meta_ddiURL}}>
                <link rel="stylesheet" href="/static/css/bootstrap.min.css">
                <link rel="stylesheet" href="/static/css/boilerplate-style.css">
                <link rel="stylesheet" href="/static/css/ebi-global.css" type="text/css" media="screen">
                <link rel="stylesheet" href="/static/css/ebi-visual.css" type="text/css" media="screen">
                <link rel="stylesheet" href="/static/css/984-24-col-fluid.css" type="text/css" media="screen">
                <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
                <link rel="stylesheet" href="/static/js/libs/slick-carousel/slick/slick.css">
                <link rel="stylesheet" href="/static/js/libs/slick-carousel/slick/slick-theme.css">
                <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet' type='text/css'>
                <link type="text/css" href="/static/css/ngProgress.css" rel="stylesheet">
                <link type="text/css" href="/static/css/ddi.css" rel="stylesheet">
                <link type="text/css" href="/static/css/autocomplete.css" rel="stylesheet">

                <!-- favico -->
                <link rel="apple-touch-icon" sizes="57x57" href="/static/images/favico/apple-icon-57x57.png">
                <link rel="apple-touch-icon" sizes="60x60" href="/static/images/favico/apple-icon-60x60.png">
                <link rel="apple-touch-icon" sizes="72x72" href="/static/images/favico/apple-icon-72x72.png">
                <link rel="apple-touch-icon" sizes="76x76" href="/static/images/favico/apple-icon-76x76.png">
                <link rel="apple-touch-icon" sizes="114x114" href="/static/images/favico/apple-icon-114x114.png">
                <link rel="apple-touch-icon" sizes="120x120" href="/static/images/favico/apple-icon-120x120.png">
                <link rel="apple-touch-icon" sizes="144x144" href="/static/images/favico/apple-icon-144x144.png">
                <link rel="apple-touch-icon" sizes="152x152" href="/static/images/favico/apple-icon-152x152.png">
                <link rel="apple-touch-icon" sizes="180x180" href="/static/images/favico/apple-icon-180x180.png">
                <link rel="icon" type="image/png" sizes="192x192" href="/static/images/favico/android-icon-192x192.png">
                <link rel="icon" type="image/png" sizes="32x32" href="/static/images/favico/favicon-32x32.png">
                <link rel="icon" type="image/png" sizes="96x96" href="/static/images/favico/favicon-96x96.png">
                <link rel="icon" type="image/png" sizes="16x16" href="/static/images/favico/favicon-16x16.png">
                <link rel="manifest" href="/static/images/favico/manifest.json">
                <meta name="msapplication-TileColor" content="#ffffff">
                <meta name="msapplication-TileImage" content="/static/images/favico/ms-icon-144x144.png">
                <meta name="theme-color" content="#ffffff">
                <!--favico end -->

                <base href="/">
                <script type="application/ld+json">
                    {
                        "@context": "http://schema.org",
                        "@type": "Dataset",
                        "name": "${name}"
                    }
                </script>
                <script>
                    if (!window.omicsdi) {
                        window.omicsdi = {};
                    }
                    window.omicsdi.datasetDomain = "${datasetDomain}";
                    window.omicsdi.datasetAcc = "${datasetAcc}";
                </script>


                <script src="/static/js/libs/jquery/jquery-1.10.1.min.js"></script>
                <script src="/static/js/libs/angular/angular.min.js"></script>
                <script src="/static/js/libs/underscore/underscore-min.js"></script>
                <script src="/static/js/libs/angular-route/angular-route.min.js"></script>
                <script src="/static/js/libs/angular/angular-cookies.js"></script>
                <script src="/static/js/libs/angular/angular-animate.min.js"></script>
                <script src="/static/js/libs/angular/ngprogress.min.js"></script>
                <script src="/static/js/libs/angular/autocomplete.js"></script>
                <script src="/static/js/libs/angular-ui/ui-bootstrap-tpls-0.14.2.js"></script>

                <script src="/static/js/app.js"></script>
                <script src="/static/js/DDIService.js"></script>
                <script src="/static/js/DDIMainContentCtl.js"></script>
                <script src="/static/js/DDIQueryCtl.js"></script>
                <script src="/static/js/DDIDatasetListsCtl.js"></script>
                <script src="/static/js/DDIResultsListCtl.js"></script>
                <script src="/static/js/DDIDatasetCtl.js"></script>
                <script src="/static/js/DDICheckCtl.js"></script>




                <script src="/static/js/DDIGetTweets.js"></script>
                <script src="/static/js/DDIPieCharts.js"></script>
                <script src="/static/js/DDIWordCloud.js"></script>
                <script src="/static/js/DDIChordDiagram.js"></script>
                <script src="/static/js/libs/d3/queue.v1.min.js"></script>
                <script src="/static/js/libs/d3/d3.min.js"></script>
                <script src="/static/js/libs/d3/d3.layout.cloud.js"></script>
                <script src="/static/js/libs/chord2/chord2.js"></script>
                <script src="/static/js/libs/slick-carousel/slick/slick.js"></script>
                <script src="/static/js/libs/angular-slick/dist/slick.js"></script>

            </head>

            <body class="level2 ng-cloak">

                <div id="" class="container" style="margin:0px;background-color: #0099cc;">

                    <!-- local-search -->
                    <div id="ddi-local-masthead" class="row">
                        <!-- local-title -->
                        <!-- NB: for additional title style patterns, see http://frontier.ebi.ac.uk/web/style/patterns -->
                        <div class="grid_12 alpha logo-title col-md-5 col-sm-12 col-xs-12" id="local-title">
                            <a href="/home" title="Back to OmicsDI homepage"><img src="/static/images/logo/OmicsDI-icon-3.png" alt="logo" width="64" height="64"></a>
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

                    <script>
                        document.title = "OmicsDI Dataset";
                    </script>

                    <div class="container" id="datasetCtrl" ng-controller="DatasetCtrl">
                        <div id="" class="row">
                        </div>
                        <div id="error-row" class="row">
                            <p>
                            </p>
                        </div>
                        <div class="row" style="">
                            <div class="col-md-1 col-sm-2 col-xs-4 " style="display: block;">
                                <div id="socialnetworks" style="top:13em; z-index:100;margin-left:20px; width:50px" ng-show="get_dataset_fail.length<1">
                                    <!-- <g:plusone></g:plusone> -->

                                    <div class="simple-skinnyleft">
                                        <a href="" class="tweetcountwrapper" ng-click="click_share_this('twitter')"><i
                            class="fa fa-twitter"></i>
                        <!-- <div class="simple-skinnyleft tweetcount">1,421</div> -->
                    </a>
                                        <a href="" class="facebookcountwrapper" ng-click="click_share_this('facebook')"><i
                            class="fa fa-facebook"></i>
                    </a>
                                        <a href="" class="emailcountwrapper" ng-click="click_share_this('email')"><i
                            class="fa fa-envelope"></i>
                    </a>
                                        <a href="" class="tumblrcountwrapper" ng-click="click_share_this('tumblr')"><i
                            class="fa fa-tumblr"></i>
                    </a>
                                        <a href="" class="linkedincountwrapper" ng-click="click_share_this('linkedin')"><i
                            class="fa fa-linkedin"></i>
                    </a>
                                        <a href="" class="googlepluscountwrapper" ng-click="click_share_this('google')"> <i class="fa fa-google-plus"></i>
                                        </a>
                                    </div>

                                </div>
                            </div>
                            <!-- col-md-1-->

                            <div class="col-md-8 col-sm-12 col-xs-12" id="centerpanel" style="margin-left:-15px">
                                <div id="dataset-error-row" class="row error-info" ng-hide="get_dataset_fail.length<1">
                                    <p>
                                        {{get_dataset_fail}}
                                    </p>
                                </div>


                                <div class="panel panel-default" id="dataset_upper" ng-hide="get_dataset_fail.length>0">
                                    <div class="panel-footer ">
                                        <h3>Dataset Information
                                        </h3>
                                    </div>
                                    <div class="" id="dataset_upper_left" style="height:50px;width:50px;float:left;margin:5px">

                                        <img src="/static/images/omics/Multipleomics.png" ng-show="dataset.omics_type.indexOf('Multi-Omics') != -1" />
                                        <img src="/static/images/omics/Proteomics.png" ng-show="dataset.omics_type.indexOf('Proteomics') == 0 && dataset.omics_type.indexOf('Multi-Omics') == -1" />
                                        <img src="/static/images/omics/Metabolomics.png" ng-show="dataset.omics_type.indexOf('Metabolomics') == 0 && dataset.omics_type.indexOf('Multi-Omics') == -1" />
                                        <img src="/static/images/omics/Genomics.png" ng-show="dataset.omics_type.indexOf('Genomics') == 0 && dataset.omics_type.indexOf('Multi-Omics') == -1 " />
                                        <img src="/static/images/omics/Transcriptomics.png" ng-show="(dataset.omics_type.indexOf('Transcriptomics') == 0 || dataset.omics_type.indexOf('transcriptomics') == 0) && dataset.omics_type.indexOf('Multi-Omics') == -1" />

                                        <br>
                                        <br>
                                        <br>

                                    </div>
                                    <div class="" id="dataset_upper_right" style="overflow:hidden;margin-right:20px">
                                        <div>
                                            <h4>
                                                <span ng-if="title_sections!=null" ng-repeat="section in title_sections" style="">
                                <span ng-if="section.beAnnotated == 'false'">{{section.text}}</span>
                                                <span ng-if="section.beAnnotated == 'true'&& enrich_button_label == 'Enrich'">{{section.text}}</span>
                                                <a ng-if="section.synonyms.length >0 && section.beAnnotated == 'true'&& enrich_button_label == 'Enriched'" href="/search?q={{section.text}}" tooltip-animation="true" tooltip-template="'myTooltipTemplate.html'" class="enrichedWords" style="color:darkcyan;">{{section.text}}</a>
                                                <a ng-if="section.synonyms == null && section.beAnnotated == 'true'&& enrich_button_label == 'Enriched'" href="/search?q={{section.text}}" class="enrichedWords" style="color:darkcyan;">{{section.text}}</a>
                                                </span>

                                                <span ng-if="title_sections == null">
                                {{dataset.name}}
                            </span>

                                            </h4>

                                            <p id="ontology_highlight_box" ng-click="enrich_click()" class="hotword" ng-class="{'ontology-highlight-on': enrich_button_label == 'Enriched' }" style="">
                                                <i class="fa fa-pencil-square-o" aria-hidden="true">Ontology highlight</i>
                                            </p>
                                        </div>
                                        <hr style="margin-right:10px">
                                        <div>
                                            <div ng-show="dataset.description.length > 1 && dataset.description!=='Not available'">
                                                <p class="align-justify"><b>ABSTRACT</b>:
                                                    <span ng-if="abstract_sections != null" ng-repeat="section in abstract_sections" style="">
                                        <span ng-if="section.beAnnotated == 'false'" ng-hide="section.tobeReduced=='true' && description_show_full=='false'">{{section.text}}</span>
                                                    <span ng-if="section.beAnnotated == 'true' && enrich_button_label == 'Enrich'" ng-hide="section.tobeReduced=='true' && description_show_full=='false'">{{section.text}}</span>
                                                    <a ng-if="section.synonyms.length > 0 && section.beAnnotated == 'true' && enrich_button_label == 'Enriched'" ng-hide="section.tobeReduced=='true' && description_show_full=='false'" href="/search?q={{section.text}}" tooltip-animation="true" tooltip-template="'myTooltipTemplate.html'"
                                                        class="enrichedWords" style="color:darkcyan;">{{section.text}}</a>
                                                    <a ng-if="section.synonyms == null && section.beAnnotated == 'true'&& enrich_button_label == 'Enriched'" ng-hide="section.tobeReduced=='true' && description_show_full=='false'" href="/search?q={{section.text}}" class="enrichedWords" style="color:darkcyan;">{{section.text}}</a>
                                                    </span>

                                                    <span ng-click="description_show_full='true'" ng-hide="description_show_full=='true'" class="hotword"><b>{{abstract_sections[abstract_sections.length-1].tobeReduced=='true'?"... [more]":""}}</b></span>
                                                    <span ng-click="description_show_full='false'" ng-hide="description_show_full=='false'" class="hotword"><b> [less]</b></span>
                                                </p>


                                            </div>
                                        </div>

                                        <p ng-show="sample_protocol_description.length > 0 && sample_protocol_description!=='Not available'" class="align-justify">
                                            <span><b>SAMPLE PROTOCOL:</b></span>
                                            <span ng-if="sample_protocol_sections != null" ng-repeat="section in sample_protocol_sections" style="">
                                        <span ng-if="section.beAnnotated == 'false'" ng-hide="section.tobeReduced=='true' && sample_protocol_show_full=='false'">{{section.text}}</span>
                                            <span ng-if="section.beAnnotated == 'true'&& enrich_button_label == 'Enrich'" ng-hide="section.tobeReduced=='true' && sample_protocol_show_full=='false'">{{section.text}}</span>
                                            <a ng-if="section.synonyms.length > 0 && section.beAnnotated == 'true' && enrich_button_label == 'Enriched'" ng-hide="section.tobeReduced=='true' && sample_protocol_show_full=='false'" href="/search?q={{section.text}}" tooltip-animation="true" tooltip-template="'myTooltipTemplate.html'"
                                                class="enrichedWords" style="color:darkcyan;">{{section.text}}</a>
                                            <a ng-if="section.synonyms == null && section.beAnnotated == 'true'&& enrich_button_label == 'Enriched'" ng-hide="section.tobeReduced=='true' && sample_protocol_show_full=='false'" href="/search?q={{section.text}}" class="enrichedWords" style="color:darkcyan;">{{section.text}}</a>
                                            </span>

                                            <!--<span ng-if="title_sections == null" >-->
                                            <!--{{dataset.sample_protocol_description}}-->
                                            <!--</span>-->

                                            <span ng-click="sample_protocol_show_full='true'" ng-hide="sample_protocol_show_full=='true'" class="hotword"><b>{{sample_protocol_sections[sample_protocol_sections.length-1].tobeReduced=='true'?"... [more]":""}}</b></span>
                                            <span ng-click="sample_protocol_show_full='false'" ng-hide="sample_protocol_show_full=='false'" class="hotword"><b> [less]</b></span>
                                        </p>

                                        <p ng-show="data_protocol_description.length > 0 && data_protocol_description !== 'Not available'" class="align-justify">
                                            <span><b>DATA PROTOCOL:</b></span>
                                            <span ng-if="data_protocol_sections != null" ng-repeat="section in data_protocol_sections" style="">
                                        <span ng-if="section.beAnnotated == 'false'" ng-hide="section.tobeReduced=='true' && data_protocol_show_full=='false'">{{section.text}}</span>
                                            <span ng-if="section.beAnnotated == 'true' && enrich_button_label == 'Enrich'" ng-hide="section.tobeReduced=='true' && data_protocol_show_full=='false'">{{section.text}}</span>
                                            <a ng-if="section.synonyms.length > 0 && section.beAnnotated == 'true' && enrich_button_label == 'Enriched'" ng-hide="section.tobeReduced=='true' && data_protocol_show_full=='false'" href="/search?q={{section.text}}" tooltip-animation="true" tooltip-template="'myTooltipTemplate.html'"
                                                class="enrichedWords" style="color:darkcyan;">{{section.text}}</a>
                                            <a ng-if="section.synonyms == null && section.beAnnotated == 'true'&& enrich_button_label == 'Enriched'" ng-hide="section.tobeReduced=='true' && data_protocol_show_full=='false'" href="/search?q={{section.text}}" class="enrichedWords" style="color:darkcyan;">{{section.text}}</a>
                                            </span>
                                            <span ng-click="data_protocol_show_full='true'" ng-hide="data_protocol_show_full=='true'" class="hotword"><b>{{data_protocol_sections[data_protocol_sections.length-1].tobeReduced=='true'?"... [more]":""}}</b></span>
                                            <span ng-click="data_protocol_show_full='false'" ng-hide="data_protocol_show_full=='false'" class="hotword"><b> [less]</b></span>
                                        </p>

                                        <div class="row" id="dataset_protocol_bottom" style="margin-top:10px;margin-left:10px">
                                            <p ng-show="reanalysis_list.length > 0" style="margin-left:15px" class="align-justify">
                                                <b>REANALYSIS of:</b>
                                                <span>
                               <span ng-repeat="reanalysis_item in reanalysis_list" class="sameline">
                               <a  class="biological"
                                  ng-href="/dataset/{{reanalysis_item.database}}/{{reanalysis_item.accession}}">
                                   <img src="/static/images/omics/Proteomics2.png" ng-show="proteomics_list.indexOf(reanalysis_item.database)>-1" class = "ddi-icon-in-reanalysis" title="Proteomics"/>
                                   <img src="/static/images/omics/Metabolomics2.png" ng-show="metabolomics_list.indexOf(reanalysis_item.database)>-1" class = "ddi-icon-in-reanalysis" title="Metabolomics"/>
                                   <img src="/static/images/omics/Genomics2.png" ng-show="genomics_list.indexOf(reanalysis_item.database)>-1" class = "ddi-icon-in-reanalysis" title="Gemonics"/>
                                   <img src="/static/images/omics/Transcriptomics2.png" ng-show="transcriptomics_list.indexOf(reanalysis_item.database)>-1" class = "ddi-icon-in-reanalysis" title="Transcriptomics"/>

                                   {{reanalysis_item.accession}}
                               </a>
                               </span>
                                                </span>
                                            </p>

                                            <p ng-show="reanalyzed_list.length > 0" style="margin-left:15px" class="align-justify">
                                                <b>REANALYZED by:</b>
                                                <span>
                               <span ng-repeat="reanalyzed_item in reanalyzed_list" class="sameline">
                               <a class="biological"
                                  href="/dataset/{{reanalyzed_item.database}}/{{reanalyzed_item.accession}}">
                                   <img src="/static/images/omics/Proteomics2.png" ng-show="proteomics_list.indexOf(reanalyzed_item.database)>-1" class = "ddi-icon-in-reanalysis" title="Proteomics"/>
                                   <img src="/static/images/omics/Metabolomics2.png" ng-show="metabolomics_list.indexOf(reanalyzed_item.database)>-1" class = "ddi-icon-in-reanalysis" title="Metabolomics"/>
                                   <img src="/static/images/omics/Genomics2.png" ng-show="genomics_list.indexOf(reanalyzed_item.database)>-1" class = "ddi-icon-in-reanalysis"  title="Gemonics"/>
                                   <img src="/static/images/omics/Transcriptomics2.png" ng-show="transcriptomics_list.indexOf(reanalyzed_item.database)>-1" class = "ddi-icon-in-reanalysis"  title="Transcriptomics"/>
                                   {{reanalyzed_item.accession}}
                               </a>
                               </span>
                                                </span>
                                            </p>

                                            <p ng-show="other_omics_list.length > 0" style="margin-left:15px" class="align-justify">
                                                <b>OTHER RELATED OMICS DATASETS IN:</b>
                                                <span>
                               <a ng-repeat="reanalysis_item in other_omics_list" class="biological"
                                  ng-href="/dataset/{{reanalysis_item.database}}/{{reanalysis_item.accession}}">
                                   <img src="/static/images/omics/Proteomics2.png" ng-show="proteomics_list.indexOf(reanalysis_item.database)>-1" class = "ddi-icon-in-reanalysis" title="Proteomics"/>
                                   <img src="/static/images/omics/Metabolomics2.png" ng-show="metabolomics_list.indexOf(reanalysis_item.database)>-1" class = "ddi-icon-in-reanalysis" title="Metabolomics"/>
                                   <img src="/static/images/omics/Genomics2.png" ng-show="genomics_list.indexOf(reanalysis_item.database)>-1" class = "ddi-icon-in-reanalysis" title="Gemonics"/>
                                    <img src="/static/images/omics/Transcriptomics2.png" ng-show="transcriptomics_list.indexOf(reanalysis_item.database)>-1" class = "ddi-icon-in-reanalysis" title="Transcriptomics"/>

                                   {{reanalysis_item.accession}}
                               </a>
                          </span>
                                            </p>


                                            <p ng-show="dataset.instruments.length > 0 && dataset.instruments[0] != 'Not available'" style="margin-left:15px" ng-show="dataset.instruments" class="align-justify">
                                                <b>INSTRUMENT(S):</b>
                                                <span>
                               <a ng-repeat="instrument in dataset.instruments" title={{instrument}} class="biological"
                                  href={{instrument_pre_url+'"'+instrument+'"'}}>
                                   {{instrument+';'}}
                               </a>
                          </span>
                                            </p>

                                            <p ng-show="dataset.organisms.length > 0 && dataset.organisms[0] != 'Not available'" style="margin-left:15px" class="align-justify">
                                                <b>ORGANISM(S):</b>
                                                <span>
                   <a ng-repeat="organism in dataset.organisms" title={{organnism.name}} class="biological"
                      href={{organism_pre_url+'"'+organism.acc+'"'}}>
                       {{organism.name + ';'}}
                   </a>
              </span>
                                            </p>

                                            <p ng-show="dataset.tissues.length > 0 && dataset.tissues[0] != 'Not available'" style="margin-left:15px" class="align-justify"><b>TISSUE(S):</b>

                                                <span>
                   <a ng-repeat="tissue in dataset.tissues" title={{tissue}} class="biological"
                      href={{tissue_pre_url+'"'+tissue+'"'}}>
                       {{tissue+';'}}
                   </a>
              </span>
                                            </p>

                                            <p ng-show="dataset.diseases.length > 0 && dataset.diseases[0] != 'Not available'" style="margin-left:15px" class="align-justify"><b>DISEASE(S):</b>
                                                <span>
                   <a ng-repeat="disease in dataset.diseases" title={{disease}} class="biological"
                      href={{disease_pre_url+'"'+disease+'"'}}>
                       <span> {{disease+';'}}</span>
                                                </a>
                                                </span>
                                            </p>


                                            <p style="margin-left:15px" class="align-justify">
                                                <span ng-show="dataset.publicationDate"> {{dataset['publicationDate'].substr(0,4)+"-"+dataset['publicationDate'].substr(4,2)+"-"+dataset['publicationDate'].substr(6,2)}}| </span>
                                                <a href={{dataset.full_dataset_link}}>{{acc}}</a> |
                                                <a href={{database_urls[repositories[domain]]}}> {{repositories[domain]}} </a>
                                            </p>


                                        </div>
                                        <!--dataset_protocol_bottom-->

                                        <div id="buttons_highlight_box">
                                            <a href={{web_service_url+ "/dataset/"+domain+ "/"+acc+ ".json"}} target="_blank" title="Download Dataset as JSON" class="json-button">{JSON}</a>
                                            <a href={{web_service_url+ "/dataset/"+domain+ "/"+acc+ ".xml"}} target="_blank" title="Download Dataset as XML" class="xml-button">&lt;XML&gt;</a>
                                        </div>
                                    </div>
                                    <!--dataset_protocol_bottom-->

                                    <div class="row" id="dataset_bottom_repository" style="margin-top:10px">


                                        <!--<div class="col-md-6" style="margin-left:10px">-->
                                        <!--Repository:<a href={{dataset.full_dataset_link}}>{{acc}}</a> [As supplied by <a-->
                                        <!--href={{database_urls[repositories[domain]]}}>{{repositories[domain]}}</a>]-->
                                        <!--</div>-->
                                        <!--<div class="col-md-4" style="marginleft:10px" ng-show="dataset.publicationDate">-->
                                        <!--<p>Date:-->
                                        <!--{{dataset['publicationDate'].substr(0,4)+'-'+dataset['publicationDate'].substr(4,2)}}-->
                                        <!--&lt;!&ndash;                                '+month_names_short[dataset['publicationDate'].substr(4,2)-1]+' '}}&ndash;&gt;-->
                                        <!--{{dataset['publicationDate'].substr(6,2)!=='00'?'-'+dataset['publicationDate'].substr(6,2):''}}</p>-->
                                        <!--</div>-->
                                    </div>
                                    <!--dataset_bottom-->


                                </div>
                                <!--dataset_upper -->


                                <div class="panel panel-default" id="dataset_middle_publication" style="position:relative" ng-hide="dataset.publicationIds ==null || dataset.publicationIds.length < 1 || get_dataset_fail.length > 0">
                                    <div class="panel-footer ">
                                        <h3>Publications</h3>
                                    </div>
                                    <span ng-hide="current_publication===0 || dataset.publicationIds === null" class="fa fa-chevron-circle-left ddi-prev" ng-click="onclick_publication_left()">
                    </span>
                                    <span ng-hide="current_publication===dataset.publicationIds.length-1 || dataset.publicationIds === null" class="fa fa-chevron-circle-right ddi-next" ng-click="onclick_publication_right()">
                    </span>

                                    <div class="" id="dataset_middle_left" style="height:50px;width:50px;float:left;margin:5px">
                                        <img ng-show="altmetric_entities[publication_index[dataset.publicationIds[current_publication]]]==null" src="/static/images/altmetric/altmetric_unknown.png">
                                        <a href={{altmetric_entities[publication_index[dataset.publicationIds[current_publication]]].detail_url}} style="border-bottom-style:none"> <img ng-if="altmetric_entities[publication_index[dataset.publicationIds[current_publication]]].image_url" src="{{altmetric_entities[publication_index[dataset.publicationIds[current_publication]]].image_url}}">
                                        </a>
                                    </div>
                                    <div class="" id="dataset_middle" style="overflow:hidden;">
                                        <div>
                                            <h4 style="margin-right:20px">
                                                {{publication_info[publication_index_info[dataset.publicationIds[current_publication]]].title}}</h4>

                                            <p style="margin-right:20px" class="align-justify">
                                                <span ng-repeat="author in publication_info[publication_index_info[dataset.publicationIds[current_publication]]].authors">
                                    <a ng-href="/search?q={{author.name_for_searching}}">
                                        {{author.fullname.substr(0,author.fullname.length-2)}} </a> <span
                                        ng-if="!$last">,</span>
                                                </span>
                                            </p>

                                            <p style="margin-right:20px" class="align-justify">
                                                {{publication_info[publication_index_info[dataset.publicationIds[current_publication]]].citation}}</p>
                                        </div>
                                        <hr style="margin-right:30px">
                                        <p ng-show="publication_info.length < 1 && dataset.publicationIds.length > 0" class="align-justify">
                                            Sorry, this publication's infomation has not been loaded in the Indexer, please go directly to
                                            <a href="{{'http://www.ncbi.nlm.nih.gov/pubmed/?term='+dataset.publicationIds[current_publication]}}">
                            PUBMED
                        </a> or
                                            <a href={{altmetric_entities[publication_index[dataset.publicationIds[current_publication]]].detail_url}}>Altmetric</a>.
                                        </p>

                                        <div style="margin-right:20px" ng-show="publication_info[publication_index_info[dataset.publicationIds[current_publication]]].pub_abstract[0].length>0">

                                            <p ng-show="pubmed_abstract_show_full=='true'" class="align-justify">
                                                ABSTRACT: {{publication_info[publication_index_info[dataset.publicationIds[current_publication]]].pub_abstract[0]}}
                                                <br> {{publication_info[publication_index_info[dataset.publicationIds[current_publication]]].pub_abstract[1]}}
                                                <span ng-click="pubmed_abstract_show_full='false'" class="hotword"><b> [less]</b>
                                </span>
                                            </p>

                                            <p ng-show="pubmed_abstract_show_full=='false'" class="align-justify">
                                                ABSTRACT: {{publication_info[publication_index_info[dataset.publicationIds[current_publication]]].pub_abstract[0]|limitTo:500}}
                                                <span ng-click="pubmed_abstract_show_full='true'" class="hotword"><b>{{publication_info[publication_index_info[dataset.publicationIds[current_publication]]].pub_abstract[0].length>500?"... [more]":""}}</b></span>
                                                <!--{{publication_info[publication_index_info[dataset.publicationIds[current_publication]]].pub_abstract[1]}}-->
                                            </p>
                                        </div>
                                    </div>

                                    <div class="row" id="dataset_middle_bottom" style="margin-top:10px; margin-left:45px ">
                                        <div class="col-md-4" style="margin-left:10px">
                                            <a ng-hide="dataset.publications === null" href={{ "http://europepmc.org/abstract/MED/"+publication_info[publication_index_info[dataset.publicationIds[current_publication]]].pmid}}>
                            PMID:
                            {{dataset.publicationIds[current_publication]}}</a>
                                        </div>
                                        <div class="col-md-4">
                                            <span ng-hide="dataset.publications === null">
                                Publication: {{current_publication +1}}/{{dataset.publicationIds.length}}
                            </span>
                                        </div>
                                        <div class="col-md-3">
                                            <p>{{dataset.publicationIds[current_publication].publicationDate}}</p>
                                        </div>
                                    </div>
                                    <br>
                                    <!--dataset_middle_bottom-->

                                </div>
                                <!--dataset_middle_panel-->

                                <div class="panel panel-default" id="dataset_bottom_chord_diagram" style="visibility:visible">
                                    <div class="panel-footer ">
                                        <h3>Shared Molecules</h3>
                                    </div>

                                    <script>
                                        drawChordDiagram();
                                    </script>

                                    <h4 style="text-align: center"> Only show the datasets with similarity scores above:<span id="threshold_text" style="color:darkgoldenrod">{{threshold}}</span></h4>
                                    <div class="row">
                                        <div class="col-md-1" id="chord_diagram_input">
                                            <h5 style="margin-top: 100px"> Threshold:<br> <span id="threshold_text2" style="color:darkgoldenrod">&nbsp;&nbsp;&nbsp;&nbsp;{{threshold}}</span></h5>
                                            <!--<input style="width: 80%;" class="center" id="slider1" type="range" orient="vertical" min="0.50" max="1" step=".01" value="0.50" ng-model="threshold" ng-initial/>-->
                                            <input id="slider1" style="margin-left: 30px" type="range" class="center" orient="vertical" min="0.50" max="1" step=".01" value="0.50" ng-model="threshold" ng-change="threshold_change(0)" />
                                        </div>
                                        <div class="col-md-6" id="chord_diagram" style="text-align:center;">
                                            <button ng-click="threshold_change(-0.1)" class="threshold_botton fa fa-angle-double-left fa-2x ddi-transparent-button"></button>
                                            <button ng-click="threshold_change(-0.01)" class="threshold_botton fa fa-angle-left fa-2x ddi-transparent-button "></button>
                                            <span>&nbsp;&nbsp; </span>
                                            <button ng-click="threshold_change(0)" class="threshold_botton fa fa-refresh fa-2x  ddi-transparent-button"></button>
                                            <span>&nbsp;&nbsp; </span>
                                            <button ng-click="threshold_change(0.01)" class="threshold_botton fa fa-angle-right fa-2x  ddi-transparent-button "></button>
                                            <button ng-click="threshold_change(0.1)" class="threshold_botton fa fa-angle-double-right fa-2x  ddi-transparent-button "></button>
                                            <br>
                                            <i id="chord_diagram_fa-spinner" style="margin-top:50px" class="fa fa-spinner fa-spin fa-5x"></i>
                                        </div>
                                        <div class="col-md-5" style="text-align:center;" ng-if="related_datasets_by_biological_limit != null">
                                            <div class="panel-body ">
                                                <ul class="nobullet">
                                                    <!-- ngRepeat: dataset in result.datasets -->
                                                    <br>
                                                    <br>
                                                    <br>
                                                    <br>
                                                    <li ng-repeat="relatedDataset in related_datasets_by_biological| limitTo:related_datasets_by_biological_limit" class="title_one_line" style="height: 2.0em">
                                                        <img src="/static/images/omics/Multipleomics2.png" ng-show="relatedDataset.omicsType.indexOf('Multi-Omics') != -1" />
                                                        <img src="/static/images/omics/Proteomics2.png" ng-show="relatedDataset.omicsType.indexOf('Proteomics') == 0 && relatedDataset.omicsType.indexOf('Multi-Omics') == -1" />
                                                        <img src="/static/images/omics/Metabolomics2.png" ng-show="relatedDataset.omicsType.indexOf('Metabolomics') == 0 && relatedDataset.omicsType.indexOf('Multi-Omics') == -1" />
                                                        <img src="/static/images/omics/Genomics2.png" ng-show="relatedDataset.omicsType.indexOf('Genomics') == 0 && relatedDataset.omicsType.indexOf('Multi-Omics') == -1 " />
                                                        <img src="/static/images/omics/Transcriptomics2.png" ng-show="(relatedDataset.omicsType.indexOf('Transcriptomics') == 0 || relatedDataset.omicsType.indexOf('transcriptomics') == 0) && relatedDataset.omicsType.indexOf('Multi-Omics') == -1" />
                                                        <a target="" class="align-justify" ng-href="/dataset/{{relatedDataset.source}}/{{relatedDataset.id}}">
                                            {{relatedDataset.title}}
                                            <!--{{relatedDataset.title|limitTo:40}} {{relatedDataset.title.length>40?'...':''}}-->
                                        </a>
                                                    </li>
                                                    <!-- end ngRepeat: -->
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <!--row-->
                                    <p style="font-size:11px; color:#bbb"><span data-icon="i" class="icon icon-generic"></span>The biological similarity score is calculated based on the number of molecules (Proteins, Metabolites, Genes) common between two different projects.</p>
                                </div>
                                <!--dataset_bottom_panel-->
                                <div class="panel panel-default">

                                    <div class="panel-footer ">
                                        <h3>Comment
                                        </h3>
                                    </div>

                                    <div id="disqus_thread" style="margin:10px"></div>

                                    <!-- comment public JS code start -->
                                    <script>
                                        /**
                                         * RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
                                         * LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables
                                         */
                                        var currentURL = window.location.href,
                                            indexDataset = currentURL.indexOf("dataset");

                                        var disqus_config = function() {
                                            var acc_database = getAccDatabase();
                                            this.page.url = currentURL.substr(0, indexDataset - 2) + currentURL.substr(indexDataset); // Replace PAGE_URL with your page's canonical URL variable
                                            this.page.identifier = currentURL.substr(indexDataset); // Replace PAGE_IDENTIFIER with your page's unique identifier variable
                                            this.page.title = "(" + acc_database["database"] + " - " + acc_database["acc"] + ") - " + document.title;
                                        };

                                        function getAccDatabase() {

                                            while (document.title == "OmicsDI Dataset") {
                                                wait(10);
                                            }

                                            var url = document.location.toString();
                                            var arrUrl = url.split("//");
                                            var start = arrUrl[1].indexOf("/");
                                            var relUrl = arrUrl[1].substring(start);
                                            if (relUrl.indexOf("?") != -1) {
                                                relUrl = relUrl.split("?")[0];
                                            }

                                            var reg_address = /(\w+)\/(\w+)$/;
                                            var result_array = reg_address.exec(relUrl);
                                            var acc_database = {};
                                            acc_database["database"] = result_array[1];
                                            acc_database["acc"] = result_array[2];
                                            return acc_database;
                                        }

                                        (function() { // DON'T EDIT BELOW THIS LINE
                                            var d = document,
                                                s = d.createElement('script');

                                            s.src = '//omicsdi.disqus.com/embed.js';

                                            s.setAttribute('data-timestamp', +new Date());
                                            (d.head || d.body).appendChild(s);
                                        })();
                                    </script>
                                    <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript" rel="nofollow">comments powered by Disqus.</a></noscript>
                                    <!-- comment public JS code end -->
                                </div>

                            </div>
                            <!-- col-md-8 centerpanel-->


                            <div class="col-md-3 col-sm-6 col-xs-12 panel panel-default" id="rightpanel" ng-hide="related_datasets == null || related_datasets.length<1 || get_similar_dataset_fail.length > 0 || get_dataset_fail.length > 0">
                                <p>
                                    <h4>
                                        Similar Datasets
                                    </h4>
                                </p>

                                <!--<uib-tabset>-->
                                <!--<uib-tab heading="By MetaData">-->
                                <ul class="list-unstyled">
                                    <!-- ngRepeat: dataset in result.datasets -->
                                    <li class="result animate-repeat " ng-repeat="relatedDataset in related_datasets | limitTo:related_datasets_limit" style="">
                                        <div class="project-widget  list-group-item ddi-card-panel">
                                            <div class="project-widget-accession">

                                                <img src="/static/images/omics/Multipleomics2.png" ng-show="relatedDataset.omicsType.indexOf('Multi-Omics') != -1" />
                                                <img src="/static/images/omics/Proteomics2.png" ng-show="relatedDataset.omicsType.indexOf('Proteomics') == 0 && relatedDataset.omicsType.indexOf('Multi-Omics') == -1" />
                                                <img src="/static/images/omics/Metabolomics2.png" ng-show="relatedDataset.omicsType.indexOf('Metabolomics') == 0 && relatedDataset.omicsType.indexOf('Multi-Omics') == -1" />
                                                <img src="/static/images/omics/Genomics2.png" ng-show="relatedDataset.omicsType.indexOf('Genomics') == 0 && relatedDataset.omicsType.indexOf('Multi-Omics') == -1 " />
                                                <img src="/static/images/omics/Transcriptomics2.png" ng-show="(relatedDataset.omicsType.indexOf('Transcriptomics') == 0 || relatedDataset.omicsType.indexOf('transcriptomics') == 0) && relatedDataset.omicsType.indexOf('Multi-Omics') == -1" />
                                                <a target="" class="align-justify" ng-href="/dataset/{{relatedDataset.source}}/{{relatedDataset.id}}">{{relatedDataset.title}}</a>
                                            </div>
                                            <div class="project-widget-paragraph hidden">
                                                <b>Project description:</b> {{relatedDataset["description"]|limitTo:150}}{{relatedDataset["description"].length>450?'...':''}}
                                                <span ng-show="relatedDataset.description===null">Not available</span>
                                            </div>

                                            <div class="project-widget-paragraph" ng-show="relatedDataset['organisms']">
                                                <b>Organism: </b><span ng-repeat="organism in relatedDataset['organisms']">{{organism["name"]}}  </span>
                                                <span ng-show="relatedDataset.organisms.length===0">Not available</span>
                                            </div>
                                            <div class="project-widget-paragraph">
                                                <span ng-show="relatedDataset.publicationDate"> {{relatedDataset['publicationDate'].substr(0,4)+"-"+relatedDataset['publicationDate'].substr(4,2)+"-"+relatedDataset['publicationDate'].substr(6,2)}}| </span>
                                                <!--a href={{"dataset.html#/"+relatedDataset.id+"*"+relatedDataset.source}}-->{{relatedDataset.id}}</a> |
                                                <!--a href={{database_urls[repositories[relatedDataset.source]]}}-->{{repositories[relatedDataset.source]}} </a>
                                            </div>

                                        </div>
                                    </li>
                                    <!-- end ngRepeat: -->
                                </ul>
                                <div class="input-btn center" style="width:102px; margin-bottom:10px" ng-show="related_datasets.length > 5">
                                    <button type="submit" class="btn btn-default " ng-click="related_load_more()">
                    <i class="fa fa-search"></i> {{load_more_btn_show}}
                </button>
                                </div>
                                <!--</uib-tab>-->
                                <!--<uib-tab heading="By Experiment Data">-->
                                <!--<ul class="list-unstyled">-->
                                <!--&lt;!&ndash; ngRepeat: dataset in result.datasets &ndash;&gt;-->
                                <!--<li class="result animate-repeat "-->
                                <!--ng-repeat="relatedDataset in related_datasets_by_exp | limitTo:related_datasets_limit" style="">-->
                                <!--<div class="project-widget  list-group-item ddi-card-panel">-->

                                <!--<div class="project-widget-accession">-->
                                <!--<img src="/static/images/omics/Proteomics2.png"-->
                                <!--ng-show="proteomics_list.indexOf(relatedDataset.source)>-1"/>-->
                                <!--<img src="/static/images/omics/Metabolomics2.png"-->
                                <!--ng-show="metabolomics_list.indexOf(relatedDataset.source)>-1"/>-->
                                <!--<img src="/static/images/omics/Genomics2.png" ng-show="genomics_list.indexOf(relatedDataset.source)>-1"/>-->
                                <!--<a target="" class="align-justify"-->
                                <!--href={{"#/dataset/"+repositories[relatedDataset.source]+"/"+relatedDataset.id}}>{{relatedDataset.title}}</a>-->
                                <!--</div>-->
                                <!--<div class="project-widget-paragraph hidden">-->
                                <!--<b>Project description:</b>-->
                                <!--{{relatedDataset["description"]|limitTo:150}}{{relatedDataset["description"].length>450?'...':''}}-->
                                <!--<span ng-show="relatedDataset.description===null">Not available</span>-->
                                <!--</div>-->

                                <!--<div class="project-widget-paragraph" ng-show="relatedDataset['organisms']">-->
                                <!--<b>Organism: </b><span ng-repeat="organism in relatedDataset['organisms']">{{organism["name"]}}  </span>-->
                                <!--<span ng-show="relatedDataset.organisms.length===0">Not available</span>-->
                                <!--</div>-->
                                <!--<div class="project-widget-paragraph">-->
                                <!--<span ng-show="relatedDataset.publicationDate"> {{relatedDataset['publicationDate'].substr(0,4)+"-"+relatedDataset['publicationDate'].substr(4,2)+"-"+relatedDataset['publicationDate'].substr(6,2)}}| </span>-->
                                <!--&lt;!&ndash;a href={{"dataset.html#/"+relatedDataset.id+"*"+relatedDataset.source}}&ndash;&gt;{{relatedDataset.id}}</a> |-->
                                <!--&lt;!&ndash;a href={{database_urls[repositories[relatedDataset.source]]}}&ndash;&gt; {{repositories[relatedDataset.source]}} </a>-->
                                <!--</div>-->

                                <!--</div>-->
                                <!--</li>-->
                                <!--&lt;!&ndash; end ngRepeat: &ndash;&gt;-->
                                <!--</ul>-->
                                <!--<div class="input-btn center" style="width:102px; margin-bottom:10px">-->
                                <!--<button type="submit" class="btn btn-default " ng-click="related_load_more()">-->
                                <!--<i class="fa fa-search"></i> {{load_more_btn_show}}-->
                                <!--</button>-->
                                <!--</div>-->
                                <!--</uib-tab>-->
                                <!--</uib-tabset>-->


                                <!-- /input-group-btn -->
                            </div>
                            <!-- col-md-3 rightpanel-->
                        </div>
                        <!-- row-->


                    </div>
                    <!-- container-->

                    <!--Template for the synonym tooltips in dataset page -->
                    <script type="text/ng-template" id="myTooltipTemplate.html" style="color:red; width:800px">
                        <div ng-if="section.synonyms.length > 0 || section.synonyms == null">
                            <h5>Synonyms
                            </h5>
                            <p>
                                <span ng-repeat="synonym in section.synonyms" ng-class-odd="'synonym_odd'" ng-class-even="'synonym_even'">{{synonym}}<br></span>
                            </p>
                        </div>
                    </script>


                </div>



                <!--main container -->

                <!-- </div> ResultsListCtrl -->
                <footer>
                    <div class="row" id="global-footer">

                        <nav class="col-md-12" id="global-nav-expanded">

                            <div class="col-md-2 col-sm-12 col-xs-12">
                                <a title="European Bioinformatics Institute homepage" target="_blank" class="no-icon" href="http://www.ebi.ac.uk/">
                                    <img class="img_at_footer ebi-img" alt="EMBL-EBI logo" src="/static/images/logo/embl-ebi.jpg" style="width:150px; margin-top:9px">
                                </a>

                                <a title="BD2K" target="_blank" class="no-icon" href="http://www.heartbd2k.org/">
                                    <img class="img_at_footer img" alt="" src="/static/images/logo/bd2k.png" style="width:150px; margin-top:9px">
                                </a>
                                <a href="http://metabolomexchange.org/" target="_blank">
                                    <img src="/static/images/home/metabolome.png" class="img_at_footer" style="width:150px; margin-top:9px" /></a>
                                <a class="img_at_footer" href="http://www.proteomexchange.org/" target="_blank">
                                    <img src="/static/images/home/proteome.png" style="width:150px; margin-top:9px"></a>
                                <a class="img_at_footer" href="https://www.ebi.ac.uk/ega/" target="_blank">
                                    <img src="/static/images/db-logos/ega_phenome_logo.jpg" style="width:80px; margin-top:9px">
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





            </body>

            </html>