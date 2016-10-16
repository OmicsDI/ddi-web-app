/**
 * ANGLULAR APP
 **/

/**
 * web_service_url for whole app
 */

var web_service_url = 'http://www.omicsdi.org/ws/';
// var web_service_url = 'http://localhost:9091/';
var proteomics_list = "pride,peptideatlas,peptide_atlas,massive,PRIDE,PeptideAtlas,MassIVE, Massive, gpmdb, GPMDB, GPMdb";
var metabolomics_list = "MetaboLights Dataset, MetaboLights,metabolights,metabolights_dataset,MetabolomicsWorkbench, Metabolomics Workbench, metabolomics_workbench, metabolome_express, MetabolomeExpress, Metabolomics Workbench, GNPS, gnps";
var transcriptomics_list = "ArrayExpress, arrayexpress-repository, ExpressionAtlas, expression-atlas, atlas-experiments, Expression Atlas Experiments, atlas-experiments";
var genomics_list = "ega,EGA";
var repositories = {
    "pride": "PRIDE",
    "PRIDE": "PRIDE",
    "peptideatlas": "PeptideAtlas",
    "peptide_atlas": "PeptideAtlas",
    "PeptideAtlas": "PeptideAtlas",
    "massive": "MassIVE",
    "MassIVE": "MassIVE",
    "Massive": "MassIVE",
    "metabolights": "MetaboLights",
    "metabolights_dataset": "MetaboLights",
    "MetaboLights": "MetaboLights",
    "metabolome_workbench": "MetabolomicsWorkbench",
    "metabolomics_workbench": "MetabolomicsWorkbench",
    "Metabolomics Workbench": "MetabolomicsWorkbench",
    "MetabolomicsWorkbench": "MetabolomicsWorkbench",
    "ega": "EGA",
    "EGA": "EGA",
    "GPMDB": "GPMDB",
    "gpmdb": "GPMDB",
    "GNPS": "GNPS",
    "metabolome_express": "MetabolomeExpress MetaPhenDB",
    "MetabolomeExpress MetaPhenDB": "MetabolomeExpress MetaPhenDB",
    "MetabolomeExpress": "MetabolomeExpress MetaPhenDB",
    "ArrayExpress": "ArrayExpress",
    "arrayexpress": "ArrayExpress",
    "arrayexpress-repository": "ArrayExpress",
    "expression-atlas": "ExpressionAtlas",
    "ExpressionAtlas": "ExpressionAtlas",
    "atlas-experiments": "ExpressionAtlas",
    "Expression Atlas Experiments": "ExpressionAtlas"


};
var database_urls = {
    "PRIDE": "http://www.ebi.ac.uk/pride/archive/",
    "MetaboLights": "http://www.ebi.ac.uk/metabolights/",
    "MetabolomicsWorkbench": "http://www.metabolomicsworkbench.org/",
    "PeptideAtlas": "http://www.peptideatlas.org/",
    "MassIVE": "https://massive.ucsd.edu/ProteoSAFe/datasets.jsp",
    "GPMDB": "http://gpmdb.thegpm.org/",
    "GNPS": "http://gnps.ucsd.edu/ProteoSAFe/static/gnps-splash.jsp",
    "EGA": "https://www.ebi.ac.uk/ega/",
    "MetabolomeExpress": "https://www.metabolome-express.org/",
    "ArrayExpress": "https://www.ebi.ac.uk/arrayexpress/",
    "ExpressionAtlas": "http://www.ebi.ac.uk/gxa/home"
}


/**
 * Make it possible to include underscore as a dependency.
 */
var underscore = angular.module('underscore', []);
underscore.factory('_', function() {
    return window._;
});




var ddiApp = angular.module('ddiApp', ['underscore', 'ngRoute', 'ngAnimate', 'autocomplete', 'ngCookies', 'ngProgress', 'ui.bootstrap', 'slick']);

// $.getJSON('http://api.metabolomexchange.org/providers', function(data) {
//     for (var i in data) {
//         console.log(data[i].name);
//     }
// });

/**
 * Turn on html5mode only in modern browsers because
 * in the older ones html5mode rewrites urls with Hangbangs
 * which break normal pages.
 * With html5mode off IE lt 10 will be able to navigate the site
 * but won't be able to open deep links to Angular pages
 * (for example, a link to a search result won't load in IE 9).
 */
// angular.module('ddiApp').config(['$locationProvider', function ($locationProvider) {
//       $locationProvider.html5Mode(false);
// }]);

/**
 * ANGLULAR CONFIG
 **/
ddiApp.config(function($routeProvider, $locationProvider) {
    $routeProvider.
    when('/about', { templateUrl: '/static/views/about.html', controller: 'MainContentCtrl' }).
    when('/api', { templateUrl: '/static/views/api.html', controller: 'MainContentCtrl' }).
    when('/databases', { templateUrl: '/static/views/databases.html', controller: 'MainContentCtrl' }).
    when('/help', { templateUrl: '/static/views/help.html', controller: 'MainContentCtrl' }).
    when('/', { templateUrl: '/static/views/home.html', controller: 'MainContentCtrl' }).
    when('/home', { templateUrl: '/static/views/home.html', controller: 'MainContentCtrl' }).
        //    when('/search', { templateUrl: '/static/views/search.html', controller: 'MainContentCtrl' }).
    when('/search?:searchstring', { templateUrl: '/static/views/browse.html', controller: 'MainContentCtrl' }).
        //    when('/search/:search', { templateUrl: '/static/views/search.html', controller: 'MainContentCtrl' }).
    when('/dataset/:domain/:acc', { templateUrl: '/static/views/dataset.html', controller: 'MainContentCtrl' }).
        //    when('/check', {templateUrl: '/static/views/check.html', controller: 'MainContentCtrl'});
    when('/check', { templateUrl: '/static/views/check.html', controller: 'MainContentCtrl' }).
    otherwise({ templateUrl: '/static/views/home.html', controller: 'MainContentCtrl' });

    // $locationProvider.hashPrefix("!");
});
/* ----------------------------*/

/**
 * ANGLULAR CONTROLLERS
 **/
//ddiApp.controller('MainContentCtrl', ['$scope', '$routeParams', '$location', '$anchorScroll',
//    function ($scope, $routeParams, $location, $anchorScroll){
//        if ($location.path() === '/about'){
//            $scope.show_top_search = 'true'
//        }else{
//            $scope.show_top_search = 'false'
//
//        }
//
//        // set focus to search
////        if (document.getElementById("search")) { document.getElementById("search").focus(); }
//    }
//]);

/*
ddiApp.factory('ddiAppApi', function($http) {

    var useCache = true;

    return {
        getDatasets: function() { return $http.get('http://api.metabolomexchange.org/datasets', { cache: useCache }); },
        getDataset: function(provider, accession) { return $http.get('http://api.metabolomexchange.org/provider/' + provider + '/' + accession, { cache: useCache }); },
        getProviders: function() { return $http.get('http://api.metabolomexchange.org/providers', { cache: useCache }); },
        getProvider: function(provider) { return $http.get('http://api.metabolomexchange.org/provider/' + provider, { cache: useCache }); },
        findDatasets: function(search) {
            var andMatch = search.replace(new RegExp(' ', 'g'), '&');
            var searchUrl = 'http://api.metabolomexchange.org/datasets/' + andMatch;
            return $http.get(searchUrl, { cache: useCache });
        }
    };
});
*/
/* ----------------------------*/