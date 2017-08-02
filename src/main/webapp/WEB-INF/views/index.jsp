<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
        <%@ page isELIgnored="false"%>
            <!DOCTYPE html>
            <html xmlns:ng="http://angularjs.org" xmlns:ng="http://angularjs.org" ng-app="ddiApp" id="ng-app" class="js flexbox canvas canvastext webgl no-touch geolocation postmessage no-websqldatabase indexeddb hashchange history draganddrop websockets rgba hsla multiplebgs backgroundsize borderimage borderradius boxshadow textshadow opacity cssanimations csscolumns cssgradients no-cssreflections csstransforms csstransforms3d csstransitions fontface generatedcontent video audio localstorage sessionstorage webworkers applicationcache svg inlinesvg smil svgclippaths ng-scope">

            <head ng-controller="MainContentCtrl">

                <meta charset="utf-8">
                <meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">
                <meta content="width=device-width" name="viewport">
                <meta content="OmicsDI is a integrate resource to multiple omics repositories, including Proteomics, Metabolomics and Genomics" name="description">
                <meta name="google-site-verification" content="rylKmRH17HeASfYu4pmNTaHi3eHYEopVnGERRiePpek" />
                <meta name="msvalidate.01" content="14CFC7A456C8506DAA18CE922378B13F" />

                <title>OmicsDI: Home</title>
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
                        "keywords":"Proteomics, Genomics, Transcriptomics, Metabolomics, Multi-Omics, MultiOmics, Bioinformatics, System Biology, Datasets",
                        "@type": "WebSite",
                        "name" : "Omics Discovery Index - Discovering and Linking Public Omics Datasets",
                        "alternateName" : "OmicsDI",
                        "description": "OmicsDI is an integrated and open source platform facilitating the access and dissemination of omics datasets. OmicsDI provides a unique infrastructure to integrate datasets coming
                        from multiple omics studies, including at present proteomics, genomics and metabolomics and Multi-Omics",
                        "url": "http://www.omicsdi.org/",
                        "image":"http://www.omicsdi.org/static/images/logo/OmicsDI-icon-3.png",
                        "potentialAction": {
                             "@type": "SearchAction",
                             "target": "http://www.omicsdi.org/search?q={search_term_string}",
                             "query-input": "required name=search_term_string"
                        }
                     }
                </script>

                <script type="application/ld+json">
                    {
                        "@context": "http://schema.org",
                        "@type": "Organization",
                        "name" : "OmicsDI Consortium",
                        "alternateName" : "OmicsDI Consortium",
                        "description": "OmicsDI is an integrated and open source platform facilitating the access and dissemination of omics datasets. OmicsDI provides a unique infrastructure to integrate datasets coming
                        from multiple omics studies, including at present proteomics, genomics and metabolomics and Multi-Omics",
                        "url": "http://www.omicsdi.org/",
                        "logo":"http://www.omicsdi.org/static/images/logo/OmicsDI-icon-3.png",
                        "email": "omicsdi-support@ebi.ac.uk",
                        "sameAs" : [ "https://github.com/BD2K-DDI",
                                     "https://twitter.com/OmicsDI",
                                     "https://plus.google.com/u/0/113645049761549550219"]
                                     }
                </script>

            </head>

            <body class="level2 ng-cloak">


            <%@include file="includes/header.jsp" %>


                <div id="wrapper" class="container ng-cloak" ng-show="true">
                    <div id="ngProgressOutContainer" ng-show="show_progress_bar"></div>
                    <!--main container of page -->
                    <!--div ng-show="web_service_fail==='true'" id="error-row" class="container ng-cloak">
    <div class="row">
        <p class="error-info" style="text-align:center;font-size:200%">
            Oops; a 500 error...
        </p>

        <p class="error-info" style="text-align:center;font-size:100%">
            We cannot ge to the web service now, and we are working on this issue too.
        </p>
    </div>
</div-->

                    <script>
                        document.title = "OmicsDI Home";
                    </script>


                    <div ng-show="web_service_fail==='false'" class="container ng-cloak">


                        <div id="" class="row" style="margin:10px">
                        </div>


                        <div class="row">

                            <div class="col-md-12">
                                <div ng-controller="QueryCtrl" class="ng-scope panel panel-default" style="">
                                    <!--      <div ng-controller="QueryCtrl" class=" ng-scope panel panel-default" style="background-color:lightcyan; ">   -->
                                    <h3 style="margin-top:10px">
                                    </h3>

                                    <form novalidate name="queryForm" class="global-search" ng-submit="submit_query()">
                                        <div class="form-group" ng-class="(query.submitted && queryForm.$invalid) ? 'has-error' : ''">
                                            <div class="input-group">
                                                <autocomplete ng-model="query.text" attr-placeholder="organism, repository, gene, tissue, accession" click-activation="true" data="words" on-type="get_suggestions" on-select="do_query"></autocomplete>

                                                <div class="input-group-btn">
                                                    <button type="button" class="btn btn-primary ddi-btn" ng-click="showOrHideAdv()">
                                                        <i class="fa fa-caret-down" aria-hidden="true" ng-if="facaret"></i>
                                                        <i class="fa fa-caret-up" aria-hidden="true" ng-if="!facaret"></i>
                                                            Advanced
                                                    </button>

                                                    <button type="submit" class="btn btn-primary ddi-btn">
                                                    <i class="fa fa-search"></i> Search
                                                    </button>
                                                </div>
                                                <!-- /input-group-btn -->
                                            </div>
                                            <!--input-group -->
                                            <span class="help-block example-searches">
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
                                            </span>
                                        </div>
                                    </form>
                                    <div class="query-bulider-box" ng-if="popup.open" style="margin-left: 9px;margin-right: 9px;margin-top: -13px;background-color: #FFFFFF;">
                                        <div ng-controller="QueryBuilderCtrl">
                                            <!--        <h1>Angular.js Query Builder</h1>  -->
                                            <form novalidate name="queryForm" class="local-search">
                                                <fieldset style="background-color:#FFFFFF">
                                                    <div class="alert alert-info">
                                                        <div style="position: relative;">
                                                            <strong>Query preview</strong>
                                                            <button type="submit" class="btn btn-primary" style="padding:3px 6px;float: right;" ng-click="submit_adv_query(query_output)">
                                                                <i class="fa fa-search" style="font-size: 30px"></i>
                                                            </button>
                                                        </div>
                                                        <span ng-bind-html="query_output"></span>
                                                    </div>

                                                    <query-builder group="filter.group"></query-builder>
                                                </fieldset>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-4">
                            </div>
                        </div>

                        <div class="row">

                            <div class="col-md-4">
                                <div id="hotwords" class="panel panel-default" style="height:360px">
                                </div>
                            </div>


                            <div class="col-md-4">
                                <div id="chart_tissues_organisms" class="panel panel-default" style="height:360px">
                                </div>
                            </div>

                            <div class="col-md-4">
                                <div id="chart_repos_omics" class="panel panel-default" style="height:360px">
                                </div>
                            </div>
                        </div>


                        <div class="row" ng-controller="DatasetListsCtrl">
                            <div class="col-md-4">
                                <div id="latestdatasetspanel" class="panel panel-default">

                                    <div class="">
                                        <h4 class="icon icon-functional " data-icon="z"> Latest Datasets</h4>
                                    </div>
                                    <div class="panel-body ">
                                        <ul class="nobullet">
                                            <li ng-show="get_latest_datasets_fail.length > 1" class="error-info">
                                                {{get_latest_datasets_fail}}
                                            </li>
                                            <li ng-repeat="dataset in latestList" class="title_one_line">
                                                <img src="static/images/omics/Proteomics2.png" ng-show="proteomics_list.indexOf(dataset.source)>-1" style="width:15px;height:15px" title="Proteomics" />
                                                <img src="static/images/omics/Metabolomics2.png" ng-show="metabolomics_list.indexOf(dataset.source)>-1" style="width:15px;height:15px" title="Metabolomics" />
                                                <img src="static/images/omics/Genomics2.png" ng-show="genomics_list.indexOf(dataset.source)>-1" style="width:15px;height:15px" title="Gemonics" />
                                                <img src="static/images/omics/Transcriptomics2.png" ng-show="transcriptomics_list.indexOf(dataset.source)>-1" style="width:15px;height:15px" title="Transcriptomics" /> {{getMonthDay(dataset.publicationDate)}}
                                                <a ng-href="/dataset/{{dataset.source}}/{{dataset.id}}" title={{dataset.title}}>
                                {{dataset.title}}
                                <!--{{dataset.title|limitTo:45}} {{dataset.title.length>45?'...':''}}-->
                                <span class="icon icon-functional"
                                      data-icon=""></span>
                            </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-4">
                                <div id="most_accessed_datasets" class="panel panel-default">

                                    <div class="">
                                        <h4 class="icon icon-functional " data-icon="z"> Most Accessed Datasets</h4>
                                    </div>
                                    <div class="panel-body ">
                                        <ul class="nobullet">
                                            <li ng-show="get_most_access_datasets_fail.length > 1" class="error-info">
                                                {{get_most_access_datasets_fail}}
                                            </li>
                                            <li ng-repeat="dataset in most_accessed_list" class="title_one_line">
                                                <img src="static/images/omics/Proteomics2.png" ng-show="proteomics_list.indexOf(dataset.source)>-1" style="width:15px;height:15px" title="Proteomics" />
                                                <img src="static/images/omics/Metabolomics2.png" ng-show="metabolomics_list.indexOf(dataset.source)>-1" style="width:15px;height:15px" title="Metabolomics" />
                                                <img src="static/images/omics/Genomics2.png" ng-show="genomics_list.indexOf(dataset.source)>-1" style="width:15px;height:15px" title="Genomics" />
                                                <img src="static/images/omics/Transcriptomics2.png" ng-show="transcriptomics_list.indexOf(dataset.source)>-1" style="width:15px;height:15px" title="Transcriptomics" />
                                                <span class="icon icon-functional" data-icon="4">{{dataset.visitCount|megaNumber}}</span>
                                                <a ng-href="/dataset/{{dataset.source}}/{{dataset.id}}" title={{dataset.title}}>
                                                    <!--{{dataset.title|limitTo:45}} {{dataset.title.length>45?'...':''}}-->
                                                    {{dataset.title}}
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>


                            <div class="col-md-4">
                                <div id="barchart_omicstype_annual" class="panel panel-default">

                                    <!--         <div class="" >
                           <h4  > act us</h4>
                        </div>
                        <div class="panel-body ">
                            <ul>
                            </ul>
                        </div> -->


                                </div>
                            </div>


                        </div>
                        <!--row -->

                        <hr>

                        <div class="row">
                            <div class="col-md-4">
                                <div class="panel panel-default" style="height:260px">
                                    <div id="tweets-of-the-month" class="">
                                        <h4 data-icon="N" class="icon icon-generic">
                                            News
                                        </h4>
                                    </div>

                                    <div>
                                        <a href="https://twitter.com/@DDIndex" data-icon="T" style="margin-left: 8px" class="justify-body-text icon icon-socialmedia">More tweets</a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">

                                <div id="statisticspanel" class="panel panel-default" ng-controller="DatasetListsCtrl" style="height:260px">

                                    <div class="">
                                        <h4 class="icon icon-functional " data-icon="z"> Statistics</h4>
                                    </div>
                                    <blockquote>
                                        <p ng-repeat="statisticdata in statistic_list " style="margin:8px">
                                            {{statisticdata.value|number}} {{statisticdata.name}}
                                        </p>
                                    </blockquote>
                                </div>
                            </div>


                            <div class="col-md-4">
                                <div class="panel panel-default" style="height:260px">
                                    <div id="About" class="">
                                        <h4 data-icon="N" class="icon icon-generic">
                                            About
                                        </h4>
                                        <blockquote class="small callout-info ddi-blockquote">The Omics Discovery Index (OmicsDI) provides a Knowleage Discovery framework across a heterogeneous data (genomics, proteomics and metabolomics).
                                            <a href="http://blog.omicsdi.org/">Read More</a>).
                                        </blockquote>
                                        <br>
                                        <blockquote class="small callout-info ddi-blockquote">OmicsDI project has been developed on <a href="https://github.com/BD2K-OmicsDI/" target="_blank">GitHub</a>, you can check or contribute to our development at (<a href="https://github.com/BD2K-OmicsDI/" target="_blank">here</a>)
                                        </blockquote>
                                        <br>
                                        <blockquote class="small callout-info ddi-blockquote">The frontend page is based on the
                                            <a href="https://angularjs.org/">Angular JS</a>;
                                            <a href="https://d3js.org/">D3.js</a>
                                        </blockquote>

                                    </div>
                                    <div>
                                    </div>
                                </div>
                            </div>


                        </div>
                        <!--row -->
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
                                        <li><a href="http://blog.omicsdi.org/">Help</a></li>
                                        <li><a href="http://www.omicsdi.org/ws">API</a></li>
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

                <%@include file="includes/shared_js.jsp" %>

                <script>
                    bub_charts_tissues_organisms();
                    pie_charts_repos_omics();
                    barcharts_years_omics_types();
                    drawHotwords();

                    /**
                     *  get tweets and write into the page
                     *
                     */
                    var tf = new TweetFetcher('599190509341515776');
                    tf.fetch(function(tweets) {
                        publishtweets(tweets);
                    }, 4);
                </script>

            </body>

            </html>