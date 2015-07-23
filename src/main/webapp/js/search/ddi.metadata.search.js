/*
 Copyright [2009-2014] EMBL-European Bioinformatics Institute
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

/**
 * OmicsDI Angular.js app.
 */

; // concatenation safeguard

/**
 * Make it possible to include underscore as a dependency.
 */
var underscore = angular.module('underscore', []);
underscore.factory('_', function () {
    return window._;
});


/**
 * web_service_url for whole app
 */
var web_service_url = 'http://wwwdev.ebi.ac.uk/Tools/ddi/ws/';
var proteomics_list = "pride,peptideatlas,peptide_atlas,massive,PRIDE,PeptideAtlas,MassIVE";
var metabolomics_list = "MetaboLights,metabolights,metabolights_dataset,MetabolomicsWorkbench, Metabolomics Workbench, metabolome_workbench";
var genomics_list = "ega,EGA";
var repositories = {
    "pride": "PRIDE",
    "PRIDE": "PRIDE",
    "peptideatlas": "PeptideAtlas",
    "peptide_atlas": "PeptideAtlas",
    "PeptideAtlas": "PeptideAtlas",
    "massive": "MassIVE",
    "MassIVE": "MassIVE",
    "metabolights": "MetaboLights",
    "metabolights_dataset": "MetaboLights",
    "MetaboLights": "MetaboLights",
    "metabolome_workbench": "Metabolomics Workbench",
    "Metabolomics Workbench": "Metabolomics Workbench",
    "MetabolomicsWorkbench": "Metabolomics Workbench",
    "ega": "EGA",
    "EGA": "EGA",
};
var database_urls = {
    "PRIDE": "http://www.ebi.ac.uk/pride/archive/",
    "MetaboLights": "http://www.ebi.ac.uk/metabolights/",
    "Metabolomics Workbench": "www.metabolomicsworkbench.org/",
    "PeptideAtlas": "http://www.peptideatlas.org/",
    "MassIVE": "https://massive.ucsd.edu/ProteoSAFe/datasets.jsp",
    "Metabolomics Workbench": "http://www.metabolomicsworkbench.org/"
}

/**
 * Create OmicsDI app.
 */
var ddiApp = angular.module('ddiApp', ['chieffancypants.loadingBar', 'underscore', 'ngAnimate', 'autocomplete', 'ngCookies']);

// hide spinning wheel
angular.module('ddiApp').config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
}]);

/**
 * Turn on html5mode only in modern browsers because
 * in the older ones html5mode rewrites urls with Hangbangs
 * which break normal Django pages.
 * With html5mode off IE lt 10 will be able to navigate the site
 * but won't be able to open deep links to Angular pages
 * (for example, a link to a search result won't load in IE 9).
 */
angular.module('ddiApp').config(['$locationProvider', function ($locationProvider) {
    if (window.history && window.history.pushState) {
        $locationProvider.html5Mode(false);
    }
}]);


/**
 angular.module('ddiApp')
 .config(['$routeProvider',function($routeProvider){
  $routeProvider
    .when('/ddi/index',{
//      redirectTo: '/index.html'
      templateUrl:'/ddi/index.html'
    })
  .when('/ddi/dataset',{
    templateUrl:'/ddi/dataset.html'
  })
  .when('/browse',{
    redirectTo:'/browse.html'
  });

  //usetheHTML5HistoryAPI
  //$locationProvider.html5Mode(true);
  }]);
 */

/**
 * auto completion / suggestion words
 */
ddiApp.factory('WordRetriever', function ($http, $q, $timeout) {
    var WordRetriever = new Object();

    WordRetriever.getwords = function (i) {
        var worddata = $q.defer();
        $http.get(web_service_url + 'dataset/words?q=' + i + '&size=10')
            .success(function (data) {
                var words = [];
                for (var i = 0; i < data.items.length; i++) {
                    words.push(data.items[i].name);
                }
                worddata.resolve(words);
            })
            .error(worddata.reject);

        return worddata.promise;
    }

    return WordRetriever;
});


/**
 * Service for launching a metadata search.
 */
angular.module('ddiApp').service('search', ['$location', function ($location) {

    /**
     * To launch a new search, change browser url,
     * which will automatically trigger a new search
     * since the url changes are watched in the query controller.
     */
    this.meta_search = function (query) {
        query = query || '*:*';
        $location.url('/search' + '?q=' + query);
    };

}]);


/**
 * Service for passing data between controllers.
 */
angular.module('ddiApp').service('results', ['_', '$http', '$location', '$window', function (_, $http, $location, $window) {

    /**
     * Service initialization.
     */
    var result = {
        count: null,
        taxid: null,
        entries: [],
        facets: [],
        _query: null, // query after preprocessing
    };

    var status = {
        display_search_interface: false, // hide results section at first
        search_in_progress: false, // display spinning wheel while searching
        show_error: false, // display error message
    };

    var search_config = {
        ebeye_base_url: web_service_url + 'dataset/search',
        ddi_base_url: get_base_url(),
        // fields: ['name','description', 'keywords', 'pdataset.descriptionublication','species'],
        // facetfields: [
        // 'TAXONOMY',
        // 'experiment_type',
        // 'modification',
        // 'instrument',
        // ], // will be displayed in this order
        facetcount: 100,
        // page_size: 10,
        // sort_field: 'title',

    };

    var query_urls = {
        'ebeye_search': search_config.ebeye_base_url +
        '?query={QUERY}' +
            // '&format=json' +
            // '&fields=' + search_config.fields.join() +
        '&facetcount=' + search_config.facetcount +
            // '&facetfields=' + search_config.facetfields.join() +
//                        '&size=' + search_config.page_size +
        '&size={PAGESIZE}' +
        '&sortfield={SORTFIELD}' +
        '&order={ORDER}' +
        '&start={START}',

        'proxy': search_config.ddi_base_url +
        '/api/internal/ebeye?url={EBEYE_URL}',
    };


    /**
     * Calculate base url for production and development environments.
     */
    function get_base_url() {
        var base_url = $location.protocol() + '://' + $location.host();
        var port = $location.port();
        if (port !== '') {
            base_url += ':' + port;
        }
        return base_url;
    }

    /**
     * Launch EBeye search.
     * `start` determines the range of the results to be returned.
     */
    this.search = function (query, start, page_size, sort_field, sort_order) {
        start = start || 0;
        page_size = page_size || 10;
        sort_field = sort_field || 'id';
        sort_order = sort_order || 'descending';
        display_search_interface();
        display_spinner();
//        update_page_title();
        query = preprocess_query(query);
        query_url = get_query_url(query, start);
//        execute_ebeye_search(query_url, start === 0);
        execute_ebeye_search(query_url, true);
        console.log("get" + query_url);
        /**
         * Display search spinner if not a "load more" request.
         */
        function display_spinner() {
            if (start === 0) {
                result.count = null; // display spinner
            }
        }

        /**
         * Change page title, which is also used in browser tabs.
         */
        function update_page_title() {
            $window.document.title = 'Search: ' + query;
        }

        /**
         * Setting `display_search_interface` value to true hides all non-search page content
         * and begins displaying search results interface.
         */
        function display_search_interface() {
            status.display_search_interface = true;
        }

        /**
         * Create an proxy query url which includes EBeye query url.
         */
        function get_query_url() {
            var newSortField = sort_field;
            if (newSortField === "relevance") {
                newSortField = ""
            }
            ;

            var ebeye_url = query_urls.ebeye_search.replace('{QUERY}', query).replace('{START}', start).replace('{PAGESIZE}', page_size).replace('{SORTFIELD}', newSortField).replace('{ORDER}', sort_order);
//            console.log(ebeye_url);
            //    var url = query_urls.proxy.replace('{EBEYE_URL}', encodeURIComponent(ebeye_url));
            //    return url;
            return ebeye_url;
        }

        /**
         * Split query into words and then:
         *  - append wildcards to all terms without double quotes and not ending with wildcards
         *  - escape special symbols
         *  - capitalize logical operators
         *
         *  Splitting into words is based on this SO question:
         *  http://stackoverflow.com/questions/366202/regex-for-splitting-a-string-using-space-when-not-surrounded-by-single-or-double
         * Each "word" is a sequence of characters that aren't spaces or quotes,
         * or a sequence of characters that begin and end with a quote, with no quotes in between.
         */
        function preprocess_query(query) {

            apply_species_specific_filtering();


            var words = query.match(/[^\s"]+|"[^"]*"/g);
            var array_length = words.length;
            for (var i = 0; i < array_length; i++) {
                if (words[i].match(/^(and|or|not)$/gi)) {
                    // capitalize logical operators
                    words[i] = words[i].toUpperCase();
                } else if (words[i].match(/\:$/gi)) {
                    // faceted search term + a colon, e.g. expert_db:
                    var term = words[i].replace(':', '');
                    var xrefs = ['pubmed', 'doi', 'taxonomy'];
                    if (term.match(new RegExp('^(' + xrefs.join('|') + ')$', 'i'))) {
                        // xref fields must be capitalized
                        term = term.toUpperCase();
                    }
                    words[i] = term + ':';
                } else if (words[i].match(/\-/)) {
                    // do not add wildcards to words with hyphens
                } else if (words[i].match(/\//)) {
                    // do not add wildcards to DOIs
                    words[i] = escape_search_term(words[i]);
                } else if (words[i].match(/^".+?"$/)) {
                    // double quotes, do nothing
                } else if (words[i].match(/\*$/)) {
                    // wildcard, escape term
                    words[i] = escape_search_term(words[i]);
                } else if (words[i].match(/\)$/)) {
                    // right closing grouping parenthesis, don't add a wildcard
                } else if (words[i].length < 3) {
                    // the word is too short for wildcards, do nothing
                } else {
                    // all other words
                    // escape term, add wildcard
                    words[i] = escape_search_term(words[i]) + '*';
                }
            }
            query = words.join(' ');
            query = query.replace(/\: /g, ':'); // to avoid spaces after faceted search terms
            query = query.replace(/\*\\\:\*/g, '*:*'); // to  set the right wildcard
            result._query = query;
            return query;

            /**
             * If query contains URS/taxid or URS_taxid identifiers,
             * perform species-specific search and show species-specific links.
             */
            function apply_species_specific_filtering() {
                var urs_taxid_regexp = new RegExp('(URS[0-9A-F]{10})(\/|_)(\\d+)', 'i');
                match = query.match(urs_taxid_regexp);
                if (match) {
                    upi = match[1];
                    result.taxid = match[3];
                    query = upi + ' taxonomy:"' + result.taxid + '"';
                } else {
                    result.taxid = null;
                }
            }

            /**
             * Escape special symbols used by Lucene
             * Escaped: + - && || ! { } [ ] ^ ~ ? : \ /
             * Not escaped: * " ( ) because they may be used deliberately by the user
             */
            function escape_search_term(search_term) {
                return search_term.replace(/[\+\-&|!\{\}\[\]\^~\?\:\\\/]/g, "\\$&");
            }
        }

        /**
         * Execute remote request.
         */
        function execute_ebeye_search(url, overwrite_results) {
            status.search_in_progress = true;
            status.show_error = false;
            $http({
                url: url,
                method: 'GET'
            }).success(function (data) {
                // console.log("get success: "+url);
                data = preprocess_results(data);
                overwrite_results = overwrite_results || false;
                if (overwrite_results) {
                    data.taxid = result.taxid;
                    data._query = result._query;
                    result = data; // replace
                } else {
                    // append new entries
                    result.entries = result.entries.concat(data.entries);
                }
                status.search_in_progress = false;
            }).error(function () {
                console.log("GET error:" + url);
                status.search_in_progress = false;
                status.show_error = true;
            });

            /**
             * Preprocess data received from the server.
             */
            function preprocess_results(data) {

                merge_species_facets();
                order_facets();
                return data;

                /**
                 * Order facets the same way as in the config.
                 */
                function order_facets() {
                    data.facets = _.sortBy(data.facets, function (facet) {
                        return _.indexOf(search_config.facetfields, facet.id);
                    });
                }

                /**
                 * Merge the two species facets putting popular_species
                 * at the top of the list.
                 * Species facets:
                 * - TAXONOMY (all species)
                 * - popular_species (manually curated set of top organisms).
                 */
                function merge_species_facets() {

                    // find the popular species facet
                    var top_species_facet_id = find_facet_id('popular_species');

                    if (top_species_facet_id) {
                        // get top species names
                        var popular_species = _.pluck(data.facets[top_species_facet_id].facetValues, 'label');

                        // find the taxonomy facet
                        var taxonomy_facet_id = find_facet_id('TAXONOMY');

                        // extract other species from the taxonomy facet
                        var other_species = get_other_species();

                        // merge popular_species with other_species
                        data.facets[taxonomy_facet_id].facetValues = data.facets[top_species_facet_id].facetValues.concat(other_species);

                        // remove the Popular species facet
                        delete data.facets[top_species_facet_id];
                        data.facets = _.compact(data.facets);
                    }

                    /**
                     * Get Taxonomy facet values that are not also in popular_species.
                     */
                    function get_other_species() {
                        var taxonomy_facet = data.facets[taxonomy_facet_id].facetValues,
                            other_species = [];
                        for (var i = 0; i < taxonomy_facet.length; i++) {
                            if (_.indexOf(popular_species, taxonomy_facet[i].label) === -1) {
                                other_species.push(taxonomy_facet[i]);
                            }
                        }
                        return other_species;
                    }

                    /**
                     * Find objects in array by attribute value.
                     * Given an array like:
                     * [{'id': 'a'}, {'id': 'b'}, {'id': 'c'}]
                     * find_facet_id('b') -> 1
                     */
                    function find_facet_id(facet_label) {
                        var index;
                        _.find(data.facets, function (facet, i) {
                            if (facet.id === facet_label) {
                                index = i;
                                return true;
                            }
                        });
                        return index;
                    }
                }

            }
        }

    };

    /**
     * Load more results starting from the last loaded index.
     */
    this.load_more_results = function (start, page_size, sort_field, sort_order) {
        query = $location.search().q;
        this.search(query, start, page_size, sort_field, sort_order);
    };

    /**
     * Broadcast whether search interface should be displayed.
     */
    this.get_status = function () {
        return status.display_search_interface;
    };

    /**
     * Broadcast search results changes.
     */
    this.get_result = function () {
        return result;
    };

    /**
     * Broadcast whether search is in progress.
     */
    this.get_search_in_progress = function () {
        return status.search_in_progress;
    };

    /**
     * Broadcast whether an error has occurred.
     */
    this.get_show_error = function () {
        return status.show_error;
    };


    this.get_pages = function (current_page, page_size, hitcount) {
        var max_page_no = parseInt((hitcount - 1) / page_size) + 1;
        var startpage = 1;
        var pages = [0, 0, 0, 0];

        if (max_page_no - current_page < 5) {
            startpage = max_page_no - 4;
        }
        else {
            startpage = current_page - 2;
        }

        if (startpage < 1) {
            startpage = 1
        }
        ;

        for (var i = 0; i < 5; i++, startpage++) {

            pages[i] = startpage;
        }

        if (max_page_no === 1) pages = [1];
        if (max_page_no === 2) pages = [1, 2];
        if (max_page_no === 3) pages = [1, 2, 3];
        if (max_page_no === 4) pages = [1, 2, 3, 4];
        if (max_page_no === 5) pages = [1, 2, 3, 4, 5];
        if (max_page_no === 6) pages = [1, 2, 3, 4, 5];
        return pages;
    };

}]);

angular.module('ddiApp').controller('MainContent', ['$scope', '$anchorScroll', '$location', 'results', 'search', function ($scope, $anchorScroll, $location, results, search) {
    /**
     * Enables scrolling to anchor tags.
     * <a ng-click="scrollTo('anchor')">Title</a>
     */
    $scope.scrollTo = function (id) {
        $location.hash(id);
        console.log($location);
        $anchorScroll();
    };

    /**
     * Watch `display_search_interface` in order to hide non-search-related content
     * when a search is initiated.
     */
    $scope.$watch(function () {
        return results.get_status();
    }, function (newValue, oldValue) {
        if (newValue !== null) {
            $scope.display_search_interface = newValue;
        }
    });

    /**
     * Launch a metadata search from a web page.
     */
    $scope.meta_search = function (query) {

        search.meta_search(query);
    };

}]);

/**
 * Results display controller
 * Responsible for visualising search results.
 */
angular.module('ddiApp').controller('ResultsListCtrl', ['$scope', '$location', '$http', 'results', function ($scope, $location, $http, results) {

    $scope.result = {
        entries: [],
    };
    $scope.show_export_error = false;
    $scope.$root.page_size = 10;
    $scope.$root.sort_field = 'id';
    $scope.$root.sort_order = 'descending';
    $scope.pages = [0, 0];
    $scope.max_page_no = 1;

    $scope.proteomics_list = proteomics_list;
    $scope.metabolomics_list = metabolomics_list;
    $scope.genomics_list = genomics_list;
    $scope.repositories = repositories;
    $scope.search_in_progress = results.get_search_in_progress();
    $scope.show_error = results.get_show_error();
    $scope.highlight_terms = ["a", "b"];


    $scope.facetsNo = 8;
    $scope.omics_facets_no = {"Proteomics": "", "Metabolomics": "", "Genomics": ""};

    /**
     * Watch `result` changes.
     */
    $scope.$watch(function () {
        return results.get_result();
    }, function (newValue, oldValue) {
        if (newValue !== null) {
            $scope.result = newValue;
            $scope.pages = results.get_pages($scope.$root.current_page, $scope.$root.page_size, $scope.result.count);
            $scope.max_page_no = 1 + parseInt(($scope.result.count - 1) / $scope.$root.page_size);
            $scope.query = $location.search().q;
            $scope.query_for_show = $scope.query;
            prepare_query_for_show();
            prepare_highlight_show();
            get_new_indexes();
            check_omics_type_null();
        }
    });

    /**
     * Watch `display_search_interface` changes.
     */
    $scope.$watch(function () {
        return results.get_status();
    }, function (newValue, oldValue) {
        if (newValue !== null) {
            $scope.display_search_interface = newValue;
        }
    });

    /**
     * Watch `search_in_progress` changes.
     */
    $scope.$watch(function () {
        return results.get_search_in_progress();
    }, function (newValue, oldValue) {
        if (newValue != oldValue) {
            $scope.search_in_progress = newValue;
        }
    });

    /**
     * Watch `show_error` changes.
     */
    $scope.$watch(function () {
        return results.get_show_error();
    }, function (newValue, oldValue) {
        if (newValue != oldValue) {
            $scope.show_error = newValue;
        }
    });

    /**
     * Fired when "Load more" button is clicked.
     $scope.load_more_results = function (page, page_size, sort_field) {
        if (page_size !== 'default') {
            $scope.$root.page_size = page_size
        }
        if (page_size === 'default') {
            page_size = $scope.$root.page_size
        }

        if (sort_field !== 'default') {
            $scope.$root.sort_field = sort_field;
        }
        if (sort_field === 'default') {
            sort_field = $scope.$root.sort_field;
        }

        var start = (page - 1) * page_size;

        results.load_more_results(start, page_size, sort_field);
    };
     */

    $scope.pagination = function (current_page, page_size, sort_field, sort_order) {
        if (page_size !== 'default') {
            $scope.$root.page_size = page_size
        }
        if (page_size === 'default') {
            page_size = $scope.$root.page_size
        }

        if (sort_field !== 'default') {
            $scope.$root.sort_field = sort_field;
        }
        if (sort_field === 'default') {
            sort_field = $scope.$root.sort_field;
        }

        if (sort_order !== 'default') {
            $scope.$root.sort_order = sort_order;
        }
        if (sort_order === 'default') {
            sort_order = $scope.$root.sort_order;
        }

        $scope.$root.current_page = current_page;

        var start = (current_page - 1) * page_size;

        results.load_more_results(start, page_size, sort_field, sort_order);

    };


    $scope.get_current_page = function () {
        return $scope.$root.current_page;
    };
    /**
     * Determine if the facet has already been applied.
     */
    $scope.is_facet_applied = function (facet_id, facet_value) {
        var query = $location.search().q || '';
        var facet_query = new RegExp(facet_id + '\\:"' + facet_value + '"', 'i');
        if (query.match(facet_query)) {
            return true;
        } else {
            return false;
        }
    };

    /**
     * Run a search with a facet enabled.
     * The facet will be toggled on and off in the repeated calls with the same
     * parameters.
     */
    $scope.facet_search = function (facet_id, facet_value) {

        $scope.$root.current_page = 1;

        var query = $location.search().q || '',
            facet = facet_id + ':"' + facet_value + '"',
            new_query;

        if ($scope.is_facet_applied(facet_id, facet_value)) {
            new_query = query;
            // remove facet in different contexts
            new_query = new_query.replace(' AND ' + facet + ' AND ', ' AND ', 'i');
            new_query = new_query.replace(facet + ' AND ', '', 'i');
            new_query = new_query.replace(' AND ' + facet, '', 'i');
            new_query = new_query.replace(facet, '', 'i') || 'RNA';
        } else {
            new_query = query + ' AND ' + facet; // add new facet
        }
        $location.search('q', new_query);
    };

    /**
     * Show/hide search facets to save screen space.
     * Uses jQuery for simplicity.
     * Activated only on mobile devices.
     */
    $scope.toggle_facets = function () {
        var facets = $('.metasearch-facets');
        facets.toggleClass('hidden-xs', !facets.hasClass('hidden-xs'));
        $('#toggle-facets').text(function (i, text) {
            return text === "Show facets" ? "Hide facets" : "Show facets";
        });
    };

    /**
     * Launch results export.
     * - submit export job
     * - open the results page in a new window.
     */
    $scope.export_results = function (format) {
        var submit_query_url = '/export/submit-query',
            results_page_url = '/export/results';
        $scope.show_export_error = false;
        $http({
            url: submit_query_url +
            '?q=' + $scope.result._query +
            '&format=' + format,
            method: 'GET'
        }).success(function (data) {
            window.location.href = results_page_url + '?job=' + data.job_id;
        }).error(function () {
            $scope.show_export_error = true;
        });
    };

    /**
     * Watch the reload/refresh event
     *
     *
     */

    $scope.$watch(function () {
        return $location.url();
    }, function (newUrl, oldUrl) {
        $scope.$root.current_page = 1;
        $scope.pages = results.get_pages($scope.$root.current_page, $scope.$root.page_size, $scope.result.count);
        $scope.max_page_no = 1 + parseInt(($scope.result.count - 1) / $scope.$root.page_size);

    });

    /*
     * find out is the omic be clicked or not
     */
    $scope.is_omic_clicked = function (thisomic) {
        thisomic = thisomic.toLowerCase();
        if ($scope.query_for_show.toLowerCase().indexOf('omics_type:"' + thisomic + '"') > -1) return "true";
        return "false";
    }

    function get_new_indexes() {
        if ($scope.result.count == '0') return;
        if ($scope.result.count == null) return;
        $scope.index_of_facets = {
            "omics_type": "0",
            "repository": "0",
            "TAXONOMY": "0",
            "tissue": "0",
            "disease": "0",
            "modification": "0",
            "instrument_platform": "0",
            "publication_date": "0",
            "technology_type": "0",
            "test": "0"
        };
        for (facet in $scope.index_of_facets) {
            //           console.log("facet:"+facet);
            //           console.log("results.facet length:"+$scope.result.facets.length);
            for (i = 0; i < $scope.result.facets.length; i++) {
                //           console.log("check on:"+$scope.result.facets[i].id);
                if (facet === $scope.result.facets[i].id) {
                    $scope.index_of_facets[facet] = i;
                }
            }
        }
        ;

    };

    function check_omics_type_null() {
        if ($scope.result.count == '0') return;
        if ($scope.result.count == null) return;
        $scope.omics_facets_no = {"Proteomics": "0", "Metabolomics": "0", "Genomics": "0"};
        $scope.omicsfacetsindex = {"Proteomics": "", "Metabolomics": "", "Genomics": ""};
        var omicsfacet = $scope.result.facets[$scope.index_of_facets.omics_type].facetValues;
        for (omic in omicsfacet) {
            $scope.omics_facets_no[omicsfacet[omic].label] = omicsfacet[omic].count;
            $scope.omicsfacetsindex[omicsfacet[omic].label] = omic;
        }
    }

    function prepare_query_for_show() {
        get_new_indexes();
        var taxonomy_reg = /TAXONOMY:"(\d+)"/g;
        var taxonomy_matches = $scope.query_for_show.match(taxonomy_reg);
        $scope.query_for_show = $scope.query_for_show.replace(/pride/g, "PRIDE");
        if (taxonomy_matches === null) return;
        for (var i = 0; i < taxonomy_matches.length; i++) {
            var taxonomy_match = taxonomy_matches[i];
            var taxonomy_id = taxonomy_match.substr(10, taxonomy_match.length - 11);
            var taxonomy_label = get_label_by_taxid(taxonomy_id);
            $scope.query_for_show = $scope.query_for_show.replace(taxonomy_id, taxonomy_label);
        }
        console.log($scope.query_for_show);
    }


    function prepare_highlight_show() {
        $scope.highlight_terms = $scope.query_for_show.match(/".*?"/g);

        if ($scope.highlight_terms === null) $scope.highlight_terms = [""]
        if ($scope.query_for_show.indexOf("AND") > -1) {
            var search_term = $scope.query_for_show.match(/.*?AND/);
            search_term = search_term[0].replace(/AND/, "");
        }
        else {
            search_term = $scope.query_for_show;
        }
        search_term = search_term.replace(/\*:\*/, "");
        search_term = search_term.split(" ");
        $scope.highlight_terms.push.apply($scope.highlight_terms, search_term);

        for (var i = 0; i < $scope.highlight_terms.length; i++) {
            $scope.highlight_terms[i] = $scope.highlight_terms[i].replace(/"/g, '');
        }
    }


    function get_label_by_taxid(taxonomy_id) {
        if (taxonomy_id === undefined) return;
        if ($scope.result.facets[$scope.index_of_facets.TAXONOMY] === undefined) return;
        var taxonomy_array = $scope.result.facets[$scope.index_of_facets.TAXONOMY].facetValues;
        for (var i = 0; i < taxonomy_array.length; i++) {
            if (taxonomy_array[i].value === taxonomy_id) return taxonomy_array[i].label;
        }
        console.error("find no label for the taxid");
    }

}])
    .filter('browsehighlight', function ($sce) {
        return function (str, termsToHighlight) {
            //Sort terms by length
            if (str === null || str === undefined || str.length < 1)return;
            if (termsToHighlight.length < 1) return;
            termsToHighlight.sort(function (a, b) {
                return b.length - a.length;
            });
            // Regex to simultaneously replace terms
            var regex = new RegExp('(' + termsToHighlight.join('|') + ')', 'gi');
            return $sce.trustAsHtml(str.replace(regex, '<span class="highlighted">$&</span>'));
        };

    })
    .filter("megaNumber", function () {
        return function (number, fractionSize) {

            if (number === null) return null;
            if (number === 0) return "0";

            if (!fractionSize || fractionSize < 0)
                fractionSize = 1;

            var abs = Math.abs(number);
            var rounder = Math.pow(10, fractionSize);
            var isNegative = number < 0;
            var key = '';
            var powers = [
                {key: "Q", value: Math.pow(10, 15)},
                {key: "T", value: Math.pow(10, 12)},
                {key: "B", value: Math.pow(10, 9)},
                {key: "M", value: Math.pow(10, 6)},
                {key: "K", value: 1000}
            ];

            for (var i = 0; i < powers.length; i++) {

                var reduced = abs / powers[i].value;

                reduced = Math.round(reduced * rounder) / rounder;

                if (reduced >= 1) {
                    abs = reduced;
                    key = powers[i].key;
                    break;
                }
            }

            return (isNegative ? '-' : '') + abs + key;
        };
    })
;


/**
 * Query controller
 * Responsible for the search box in the header.
 */
ddiApp.controller('QueryCtrl', ['$scope', '$http', '$location', '$window', '$timeout', 'results', 'search', 'WordRetriever', '$q', function ($scope, $http, $location, $window, $timeout, results, search, WordRetriever, $q) {

    $scope.query = {
        text: '',
        submitted: false
    };


    /**
     * Launch a metadata search using the service.
     */
    $scope.meta_search = function (query) {
        $scope.$root.current_page = 1;
        search.meta_search(query);
        var current_abs_url = $location.absUrl();

        if (current_abs_url.match("index.html")) {
            $window.location = current_abs_url.replace("index.html", "browse.html");
        }
        if (current_abs_url.match("/#/")) {
            $window.location = current_abs_url.replace("/#/", "/browse.html#/");
        }
        if (current_abs_url.match("dataset.html")) {
            $window.location = current_abs_url.replace("dataset.html", "browse.html");
        }
        if (current_abs_url.match("api.html")) {
            $window.location = current_abs_url.replace("api.html", "browse.html");
        }
        if (current_abs_url.match("databases.html")) {
            $window.location = current_abs_url.replace("databases.html", "browse.html");
        }
        if (current_abs_url.match("help.html")) {
            $window.location = current_abs_url.replace("help.html", "browse.html");
        }
        if (current_abs_url.match("about.html")) {
            $window.location = current_abs_url.replace("about.html", "browse.html");
        }
    };


    /**
     * Control browser navigation buttons.
     */
    $scope.$watch(function () {
        return $location.url();
    }, function (newUrl, oldUrl) {
        // ignore url hash
        newUrl = newUrl.replace(/#.+$/, '');
        oldUrl = oldUrl.replace(/#.+$/, '');
        // url has changed
        if (newUrl !== oldUrl) {
            if (newUrl.indexOf('tab=') !== -1) {
                // redirect only if the main part of url has changed
                if (newUrl.split('?')[0] !== oldUrl.split('?')[0]) {
                    redirect(newUrl);
                } else {
                    // navigate page tabs using browser back button
                    matches = newUrl.match(/tab=(\w+)&?/);
                    $('#tabs a[data-target="#' + matches[1] + '"]').tab('show');
                }
            } else if (newUrl.indexOf('xref-filter') !== -1) {
                if (newUrl.split('?')[0] !== oldUrl.split('?')[0]) {
                    redirect(newUrl);
                }
            } else if (newUrl.indexOf('/search') == -1) {
                // a non-search url, load that page
                redirect(newUrl);
            } else {
                // the new url is a search result page, launch that search
                $scope.query.text = $location.search().q;
                results.search($location.search().q, 0, $scope.$root.page_size, $scope.$root.sort_field, $scope.$root.sort_order);
                $scope.query.submitted = false;
            }
        }

        function redirect(newUrl) {
            $timeout(function () {
                // wrapping in $timeout to avoid "digest in progress" errors
                $window.location = newUrl;
            });
        }

    });

    /**
     * Called when the form is submitted.
     */
    $scope.submit_query = function () {
        $scope.query.submitted = true;

        $scope.$root.current_page = 1;


//        if ($scope.queryForm.text.$invalid) {
//            return;
        // console.log("submitted invalid" + $scope.queryForm);
//        }
        $scope.meta_search($scope.query.text);
    };

    /**
     * Check if the url contains a query when the controller is first created
     * and initiate a search if necessary.
     */
    (function () {
        if ($location.url().indexOf("/search?q=") > -1) {
            // a search result page, launch a new search
            $scope.query.text = $location.search().q;
            results.search($location.search().q);
        }
    })();

    /**
     *
     * get suggestion words
     */

    $scope.getwords = function () {
        return $scope.words;
    }

    $scope.get_suggestions = function (typedthings) {
//    console.log("Do something like reload data with this: " + typedthings );
        $scope.newwords = WordRetriever.getwords(typedthings);
        $scope.newwords.then(function (data) {
            $scope.words = data;
        });
    }

    $scope.do_query = function (suggestion) {
        $scope.query.text = suggestion;
        $scope.meta_search($scope.query.text);
    }


}]);


/**
 * Dataset controller
 * Responsible for the Dataset fetching.
 */
angular.module('ddiApp').controller('DatasetCtrl', ['$scope', '$http', '$location', '$window', '$timeout', '$q', function ($scope, $http, $location, $window, $timeout, $q) {

    var input = $location.url().replace("/", "");
    var inputs = input.split("*");
    var acc = inputs[0];
    var domain = inputs[1];

    $scope.acc = acc;
    $scope.domain = domain;
    $scope.description_show_full = "false";
    $scope.pubmed_abstract_show_full = "false";
    $scope.data_protocol_show_full = "false";
    $scope.sample_protocol_show_full = "false";
    $scope.proteomics_list = proteomics_list;
    $scope.metabolomics_list = metabolomics_list;
    $scope.genomics_list = genomics_list;
    $scope.repositories = repositories;
    $scope.database_urls = database_urls;

    $scope.get_dataset_fail = "";
    $scope.get_similar_dataset_fail = "";
    $scope.instrument_pre_url = "browse.html#/search?q=*:* AND instrument_platform:";
    $scope.organism_pre_url = "browse.html#/search?q=*:* AND TAXONOMY:";
    $scope.tissue_pre_url = "browse.html#/search?q=*:* AND tissue:";
    $scope.disease_pre_url = "browse.html#/search?q=*:* AND disease:";
    $scope.related_datasets_limit = 5;
    $scope.load_more_btn_show = "Load More";
    $scope.month_names_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


    /*     $http({
     url: url,
     method: 'GET'
     }).success(function(data) {
     $scope.dataset = data;
     console.log(data);
     }).error(function(){
     });
     */
    var related_datasets_url = web_service_url + "dataset/moreLikeThis?acc=" + acc + "&database=" + domain;
    $http({
        url: related_datasets_url,
        method: 'GET'
    }).success(function (data) {
        $scope.related_datasets = data.datasets;
    }).error(function () {
        console.log("GET error:" + related_datasets_url);
        $scope.get_similar_dataset_fail = "can not get similar dataset";
    });

    $scope.altmetric_entities = [];
    $scope.publication_index = {};
    $scope.publication_index_info = {};
    $scope.publication_info = [];
    var altmetricUrls = [];
    var arr = [];
    var url = web_service_url + "dataset/get?acc=" + acc + "&database=" + domain;
    arr.push($http.get(url));

    $q.all(arr).then(function (ret) {
            // ret[0] contains the response of the first call
            // ret[1] contains the second response
            // etc.
            $scope.dataset = ret[0].data;
            if (ret[0].data === null || ret[0].data.id === null) {
                $scope.get_dataset_fail = "We can't access this dataset: " + acc + " at " + domain + " right now.";
                return;
            }
            if ($scope.dataset.protocols.length > 0) {
                $scope.sample_protocol_description = $scope.dataset.protocols[0].description;
                $scope.data_protocol_description = $scope.dataset.protocols[1].description;
            }
            $scope.dataset.instruments = squash($scope.dataset.instruments);
            if($scope.dataset.publicationIds === null) return;
            for (var i = 0; i < $scope.dataset.publicationIds.length; i++) {
                var pubmed_id = $scope.dataset.publicationIds[i];
                altmetricUrl = "http://api.altmetric.com/v1/pmid/" + pubmed_id;

                $http.get(altmetricUrl).success(function (data) {
                    var altmetric_entity = {};
                    var inside_id = data.pmid;
                    altmetric_entity = {
                        "pubmed_id": inside_id,
                        "detail_url": data.details_url,
                        "image_url": data.images.small
                    };
                    $scope.altmetric_entities.push(altmetric_entity);
                    $scope.publication_index[inside_id] = $scope.altmetric_entities.indexOf(altmetric_entity);
                }).error(function () {
                });

                var publication_url = web_service_url + "publication/list?acc=" + pubmed_id;
                $http.get(publication_url).success(function (publication_data) {
                    var publication = {};
                    if (publication_data.count > 1 || publication_data.count < 1) {
                        console.error("got wrong publication data from" + publication_url)
                    }
                    var entity = publication_data.publications[0];
                    var inside_id = entity.id;

                    var pub_year = entity.date.substr(0, 4);
                    var pub_month = parseInt(entity.date.substr(4, 2));
                    var pub_day = entity.date.substr(6, 2);
                    if (pub_month > 0 && pub_month < 13) {
                        pub_month = $scope.month_names_short[pub_month - 1]
                    }
                    else {
                        pub_month = '';
                    }
                    if (pub_day === '00') {
                        entity.date = pub_year + ' ' + pub_month + ';';
                    }
                    else {
                        entity.date = pub_year + ' ' + pub_month + ' ' + pub_day + ';';
                    }


                    entity.volume = entity.volume || "";
                    entity.issue = entity.issue || "";
                    entity.pagination = entity.pagination || "";

                    var authors = [];
                    for (var i = 0; i < entity.authors.length; i++) {
                        var surname = entity.authors[i].substr(entity.authors[i].length - 1, 1);
                        var reg = new RegExp(surname + "[a-z]{0,100} " + surname + "$", "")
                        var have_reg = entity.authors[i].search(reg) >= 0;
                        if (have_reg) {
                            author_for_searching = entity.authors[i].replace(reg, " " + surname);
                        }
                        else {
                            author_for_searching = entity.authors[i].replace(surname, "");
                        }
                        var author = {"fullname": entity.authors[i], "name_for_searching": author_for_searching};
                        authors.push(author);
                    }

                    publication_info_entity = {
                        "pmid": inside_id,
                        "citation": entity.journal + ". " + entity.date + " " + entity.volume + "(" + entity.issue + "): " + entity.pagination + ".",
                        "title": entity.title,
                        "authors": authors,
                        "pub_abstract": entity.pubAbstract
                    };
                    publication_info_entity.citation = publication_info_entity.citation.replace(/\(\): \./, "");

                    $scope.publication_info.push(publication_info_entity);
                    $scope.publication_index_info[inside_id] = $scope.publication_info.indexOf(publication_info_entity);
                }).error(function () {
                });
            }

        }, function (error) {
            $scope.get_dataset_fail = "We can't access this dataset: " + acc + " at " + domain + " right now.";
            console.log("GET error:" + url);
        }
    ); //outside $q


    $scope.file_links = [];
    var get_file_links_url = web_service_url + "dataset/getFileLinks?acc=" + acc + "&database=" + domain;
    $http({
        url: get_file_links_url,
        method: 'GET'
    }).success(function (data) {
        for (var i = 0; i < data.length; i++) {
            var name = data[i].replace(/.*\//, '');
            var link = data[i];
            $scope.file_links.push({'name': name, 'link': link});
        }
    }).error(function () {
        console.error("GET error: " + get_file_links_url);
    });


    $scope.share_methods = {
        email: ["mailto:?body=[&subject=]"],
        twitter: ["https://twitter.com/intent/tweet?url=[&text=]", 450],
        facebook: ["https://www.facebook.com/sharer.php?u=[", 330],
        google: ["https://plus.google.com/share?url=[", 460],
        tumblr: ["https://www.tumblr.com/share/link?url=[&name=]", 450],
        linkedin: ["https://www.linkedin.com/shareArticle?mini=true&url=[", 520]
    };

    $scope.click_share_this = function (label) {
        var value = $scope.share_methods[label];
        var c = value[0].replace("[", encodeURIComponent(location.href)).replace("]", encodeURIComponent(document.title));
        1 == value.length ? location.href = c : window.open(c, "_blank", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=500,height=" + value[1]);
        // "preventDefault"in a?a.preventDefault():event.returnValue=!1

    };


    /**
     * for tab control
     */
    $scope.tabs = [{
        title: 'Filelist',
        url: 'filelist.tpl.html'
    }, {
        title: 'Bioentities',
        url: 'bioentities.tpl.html'
    }, {
        title: 'Lab Details',
        url: 'labdetails.tpl.html'
    }];

    $scope.currentTab = 'filelist.tpl.html';

    $scope.onClickTab = function (tab) {
        $scope.currentTab = tab.url;
    }
    $scope.isActiveTab = function (tabUrl) {
        return tabUrl == $scope.currentTab;
    }


    /*
     * for the multiple publications click
     */

    $scope.current_publication = 0;

    $scope.onclick_publication_left = function () {
        $scope.current_publication--;
    }

    $scope.onclick_publication_right = function () {
        $scope.current_publication++;
    }

    /*
     * to load more related datasets
     */
    $scope.related_load_more = function () {
        if ($scope.related_datasets_limit == 100) {
            $scope.related_datasets_limit = 5
        }
        else {
            if ($scope.related_datasets_limit == 5)    $scope.related_datasets_limit = 100;
        }

        if ($scope.load_more_btn_show === "Go Back") {
            $scope.load_more_btn_show = "Load More"
        }
        else {
            if ($scope.load_more_btn_show === "Load More") $scope.load_more_btn_show = "Go Back";
        }
    }

    /*
     *for unique elements in array
     **/
    function squash(arr) {
        var tmp = [];
        for (var i = 0; i < arr.length; i++) {
            if (tmp.indexOf(arr[i]) == -1) {
                tmp.push(arr[i]);
            }
        }
        return tmp;
    }


}]);

/**
 * Datasets Statistics Lists controller
 * Responsible for the Datasets Stastistic Lists.
 */
angular.module('ddiApp').controller('DatasetListsCtrl', ['$scope', '$http', function ($scope, $http) {

    $scope.proteomics_list = proteomics_list;
    $scope.metabolomics_list = metabolomics_list;
    $scope.genomics_list = genomics_list;
    $scope.repositories = repositories;
    $scope.get_latest_datasets_fail = '';
    $scope.get_most_access_datasets_fail = '';
    $scope.$root.web_service_fail = 'false';


    $http({
        url: web_service_url,
        method: 'GET'
    }).success(function (data) {
        $scope.$root.web_service_fail = 'false';
    }).error(function () {
        $scope.$root.web_service_fail = 'true';
    });


    var url = web_service_url + "dataset/latest?size=10";
    $http({
        url: url,
        method: 'GET'
    }).success(function (data) {
        $scope.latestList = data["datasets"];
        if (data === null) {
            $scope.get_latest_datasets_fail = "Sorry, the accessing to  this datasets list was temporally failed.";
        }
    }).error(function () {
        console.log("GET error:" + url);
        $scope.get_latest_datasets_fail = "Sorry, the accessing to  this datasets list was temporally failed.";

    });
//
//
    var url = web_service_url + "dataset/mostAccessed?size=10";
    $http({
        url: url,
        method: 'GET'
    }).success(function (data) {
        $scope.most_accessed_list = data["datasets"];
        if (data === null) {
            $scope.get_most_access_datasets_fail = "Sorry, the accessing to  this datasets list was temporally failed.";
        }

        $scope.most_accessed_list.sort(function (a, b) {
            return parseInt(a.visitCount) < parseInt(b.visitCount);
        });
    }).error(function () {
        console.log("GET error:" + url);
        $scope.get_most_access_datasets_fail = "Sorry, the accessing to  this datasets list was temporally failed.";

    });

    //get general statistics
    url = web_service_url + "stats/general";

    $http({
        url: url,
        method: 'GET'
    }).success(function (data) {
        $scope.statistic_list = data;
        for (var i = 0; i < $scope.statistic_list.length; i++) {
            $scope.statistic_list[i].name = $scope.statistic_list[i].name.replace(/Different /g, '');
            $scope.statistic_list[i].name = $scope.statistic_list[i].name.replace(/Repositories\/Databases/g, 'repositories');
            $scope.statistic_list[i].name = $scope.statistic_list[i].name.replace(/Species\/Organisms/g, 'species');
            $scope.statistic_list[i].name = $scope.statistic_list[i].name.replace(/D/g, 'd');
            $scope.statistic_list[i].name = $scope.statistic_list[i].name.replace(/T/g, 't');
        }
        ;

    }).error(function () {
        console.log("GET error:" + url);
    });


    //get datasets No. of each repository
    url = web_service_url + "stats/domains";
    $scope.databases = {"test": "0"};
    $http({
        url: url,
        method: 'GET'
    }).success(function (data) {
        for (var i = 0; i < data.length; i++) {
            $scope.databases[data[i].domain.name] = data[i].domain.value;
        }
    }).error(function () {
        console.log("GET error:" + url);
    });


}]);


/**
 * set the login status in cookie.
 */
angular.module('ddiApp').controller('LoginController', ['$scope', '$http', '$location','$cookieStore', function ($scope, $http, $location, $cookieStore) {
    $scope.login = function (credentials) {
        if(credentials.username === 'ddi'
           && credentials.password === 'ebi'){
            $cookieStore.put('loggedin', 'true');
            $location.path('/Tools/ddi/');
        }
        else{
            alert("Not correct, please input again");
        }
    }
}]);

/**
 * get the login status in body.
 */
angular.module('ddiApp').controller('BodyController', ['$scope', '$cookieStore', function ($scope, $cookieStore) {
//    $scope.loggedin = $cookieStore.get('loggedin');
    $scope.loggedin = true;
}]);

/**
 * Create a keyboard shortcut for quickly accessing the search box.
 */
function keyboard_shortcuts(e) {
    if (e.keyCode == 191) { // forward slash, "/"
        $('#query-text').focus();
    }
}
document.addEventListener('keyup', keyboard_shortcuts);


