
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
 * DDI Angular.js app.
 */

; // concatenation safeguard

/**
 * Make it possible to include underscore as a dependency.
 */
var underscore = angular.module('underscore', []);
underscore.factory('_', function() {
    return window._;
});

/**
 * Create DDI app.
 */
angular.module('ddiApp', ['chieffancypants.loadingBar', 'underscore', 'ngAnimate','ngRoute']);

// hide spinning wheel
angular.module('ddiApp').config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
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
angular.module('ddiApp').config(['$locationProvider', function($locationProvider) {
    if (window.history && window.history.pushState) {
        $locationProvider.html5Mode(false);
    }
}]);






/**
angular.module('ddiApp')
.config(['$routeProvider',function($routeProvider){
  $routeProvider
    .when('/app/index',{
//      redirectTo: '/index.html'
      templateUrl:'/app/index.html'
    })
  .when('/app/dataset',{
    templateUrl:'/app/dataset.html'
  })
  .when('/browse',{
    redirectTo:'/browse.html'
  });

  //usetheHTML5HistoryAPI
  //$locationProvider.html5Mode(true);
  }]);
 */


/**
 * Service for launching a metadata search.
 */
angular.module('ddiApp').service('search', ['$location', function($location) {

    /**
     * To launch a new search, change browser url,
     * which will automatically trigger a new search
     * since the url changes are watched in the query controller.
     */
    this.meta_search = function(query) {
        $location.url('/search' + '?q=' + query);
    };

}]); 



/**
 * Service for passing data between controllers.
 */
angular.module('ddiApp').service('results', ['_', '$http', '$location', '$window', function(_, $http, $location, $window) {

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
        ebeye_base_url: 'http://localhost:9091/dataset/search',
        ddi_base_url: get_base_url(),
        // fields: ['name','description', 'keywords', 'publication','species'],
        // facetfields: [
            // 'TAXONOMY',
            // 'experiment_type',
            // 'modification',
            // 'instrument',
        // ], // will be displayed in this order
        facetcount: 100,
        // pagesize: 10,
        // sortfield: 'title',
  
    };

    var query_urls = {
        'ebeye_search': search_config.ebeye_base_url +
                        '?query={QUERY}' +
                        // '&format=json' +
                        // '&fields=' + search_config.fields.join() +
                        '&facetcount=' + search_config.facetcount +
                        // '&facetfields=' + search_config.facetfields.join() +
//                        '&size=' + search_config.pagesize +
                        '&size={PAGESIZE}' + 
                        '&sortfield={SORTFIELD}' + 
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
    this.search = function(query, start, pagesize,sortfield) {
        start = start || 0;
  pagesize = pagesize || 10;
  sortfield = sortfield || 'id';
        display_search_interface();
        display_spinner();
        update_page_title();
        query = preprocess_query(query);
        query_url = get_query_url(query, start);
        console.log("wget"+query_url);
//        execute_ebeye_search(query_url, start === 0);
        execute_ebeye_search(query_url, true);
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
            var newSortField = sortfield;
            if(newSortField === "relevance") {newSortField = ""};

            var ebeye_url = query_urls.ebeye_search.replace('{QUERY}', query).replace('{START}', start).replace('{PAGESIZE}',pagesize).replace('{SORTFIELD}',newSortField);
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
                if ( words[i].match(/^(and|or|not)$/gi) ) {
                    // capitalize logical operators
                    words[i] = words[i].toUpperCase();
                } else if ( words[i].match(/\:$/gi) ) {
                    // faceted search term + a colon, e.g. expert_db:
                    var term = words[i].replace(':','');
                    var xrefs = ['pubmed', 'doi', 'taxonomy'];
                    if ( term.match(new RegExp('^(' + xrefs.join('|') + ')$', 'i') ) ) {
                        // xref fields must be capitalized
                        term = term.toUpperCase();
                    }
                    words[i] = term + ':';
                } else if ( words[i].match(/\-/)) {
                    // do not add wildcards to words with hyphens
                } else if ( words[i].match(/\//)) {
                    // do not add wildcards to DOIs
                    words[i] = escape_search_term(words[i]);
                } else if ( words[i].match(/^".+?"$/) ) {
                    // double quotes, do nothing
                } else if ( words[i].match(/\*$/) ) {
                    // wildcard, escape term
                    words[i] = escape_search_term(words[i]);
                } else if ( words[i].match(/\)$/) ) {
                    // right closing grouping parenthesis, don't add a wildcard
                } else if ( words[i].length < 3 ) {
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
                }).success(function(data) {
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
                }).error(function(){
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
                        data.facets = _.sortBy(data.facets, function(facet){
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
                            for (var i=0; i<taxonomy_facet.length; i++) {
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
                            _.find(data.facets, function(facet, i){
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
        this.load_more_results = function(start,pagesize,sortfield) {
            query = $location.search().q;
            this.search(query,start, pagesize,sortfield);
        };

        /**
        * Broadcast whether search interface should be displayed.
        */
        this.get_status = function() {
            return status.display_search_interface;
        };

        /**
        * Broadcast search results changes.
        */
        this.get_result = function() {
            return result;
        };

        /**
        * Broadcast whether search is in progress.
        */
        this.get_search_in_progress = function() {
            return status.search_in_progress;
        };

        /**
        * Broadcast whether an error has occurred.
        */
        this.get_show_error = function() {
            return status.show_error;
        };



    this.get_pages = function(currentpage,pagesize,hitcount){
            var maxpageno = parseInt((hitcount-1)/pagesize)+1;
            var startpage = 1;
            var pages=[0,0,0,0];

            if(maxpageno-currentpage < 5) {
                startpage = maxpageno - 4;
            }
            else{
            startpage = currentpage - 2;
            }

    if(startpage <1) {startpage = 1};

            for(var i=0; i<5; i++,startpage++){

            pages[i] = startpage;
            }

            if(maxpageno === 1) pages=[1];
            if(maxpageno === 2) pages=[1,2];
            if(maxpageno === 3) pages=[1,2,3];
            if(maxpageno === 4) pages=[1,2,3,4];
            if(maxpageno === 5) pages=[1,2,3,4,5];
            if(maxpageno === 6) pages=[1,2,3,4,5];
            return pages;
        };

    }]);

    angular.module('ddiApp').controller('MainContent', ['$scope', '$anchorScroll', '$location', 'results', 'search', function($scope, $anchorScroll, $location, results, search) {
        /**
        * Enables scrolling to anchor tags.
        * <a ng-click="scrollTo('anchor')">Title</a>
        */
        $scope.scrollTo = function(id) {
            $location.hash(id);
            console.log($location);
            $anchorScroll();
        };

        /**
        * Watch `display_search_interface` in order to hide non-search-related content
        * when a search is initiated.
        */
        $scope.$watch(function () { return results.get_status(); }, function (newValue, oldValue) {
            if (newValue !== null) {
                $scope.display_search_interface = newValue;
            }
        });

        /**
        * Launch a metadata search from a web page.
        */
        $scope.meta_search = function(query) {

            search.meta_search(query);
        };

    }]);

    /**
    * Results display controller
    * Responsible for visualising search results.
    */
    angular.module('ddiApp').controller('ResultsListCtrl', ['$scope', '$location', '$http', 'results', function($scope, $location, $http, results) {

        $scope.result = {
            entries: [],
        };
        $scope.show_export_error = false;
        $scope.$root.pagesize = 10;
        $scope.$root.sortfield = 'id';
        $scope.pages=[0,0];
        $scope.maxpageno= 1;

        $scope.proteomics_list="pride,peptideatlas,peptide_atlas,massive,PRIDE,PeptideAtlas,MassIVE";
        $scope.metabolomics_list="metabolights,metabolights_dataset,metabolome_workbench,MetaboLights";
        $scope.genomics_list="ega,EGA";
        $scope.repositories={"pride":"PRIDE","PRIDE":"PRIDE", 
                            "peptideatlas":"PeptideAtlas","peptide_atlas":"PeptideAtlas", "PeptideAtlas":"PeptideAtlas",
                            "massive":"MassIVE", "MassIVE":"MassIVE",
                            "metabolights":"MetaboLights","metabolights_dataset":"MetaboLights","MetaboLights":"MetaboLights",
                            "metabolome_workbench":"Metabolomics Workbench", "Metabolomics Workbench":"Metabolomics Workbench","MetabolomicsWorkbench":"Metabolomics Workbench",
                            "ega":"EGA", "EGA":"EGA",  };
        $scope.search_in_progress = results.get_search_in_progress();
        $scope.show_error = results.get_show_error();


        $scope.facetsNo = 8;
        $scope.indexoffacets={"omics_type":"0", "repository":"0", "TAXONOMY":"0","tissue":"0", "disease":"0", "modifications":"0", "instruments":"0", "publicatedate":"0", "technology":"0", "test":"0" }

        $scope.omicsfacetsno={"Proteomics":"","Metabolomics":"","Genomics":""};

        /**
        * Watch `result` changes.
        */
        $scope.$watch(function () { return results.get_result(); }, function (newValue, oldValue) {
            if (newValue !== null) {
                $scope.result = newValue;
        $scope.pages= results.get_pages($scope.$root.currentpage, $scope.$root.pagesize, $scope.result.count);
        $scope.maxpageno = 1+parseInt(($scope.result.count-1)/$scope.$root.pagesize);
                $scope.query = $location.search().q;
                $scope.queryForShow = $scope.query;
                prepareQueryForShow();
        getnewindexes(); 
        checkomicstypenull();
            }
        });

        /**
        * Watch `display_search_interface` changes.
        */
        $scope.$watch(function () { return results.get_status(); }, function (newValue, oldValue) {
            if (newValue !== null) {
                $scope.display_search_interface = newValue;
            }
        });

        /**
        * Watch `search_in_progress` changes.
        */
        $scope.$watch(function () { return results.get_search_in_progress(); }, function (newValue, oldValue) {
            if (newValue != oldValue) {
                $scope.search_in_progress = newValue;
            }
        });

        /**
        * Watch `show_error` changes.
        */
        $scope.$watch(function () { return results.get_show_error(); }, function (newValue, oldValue) {
            if (newValue != oldValue) {
                $scope.show_error = newValue;
            }
        });

        /**
        * Fired when "Load more" button is clicked.
        */
        $scope.load_more_results = function(page,pagesize,sortfield) {
                if(pagesize!=='default'){$scope.$root.pagesize=pagesize}
        if(pagesize==='default'){pagesize=$scope.$root.pagesize}
        
        if(sortfield!=='default'){$scope.$root.sortfield=sortfield; }
        if(sortfield==='default'){sortfield=$scope.$root.sortfield; }
        
        var start = (page-1)*pagesize;
        
    results.load_more_results(start,pagesize,sortfield);
        };

        $scope.pagination= function(currentpage,pagesize,sortfield) {
                if(pagesize!=='default'){$scope.$root.pagesize=pagesize}
        if(pagesize==='default'){pagesize=$scope.$root.pagesize}
        
        if(sortfield!=='default'){$scope.$root.sortfield=sortfield; }
        if(sortfield==='default'){sortfield=$scope.$root.sortfield; }
        
        $scope.$root.currentpage = currentpage;

        var start = (currentpage-1)*pagesize;

        results.load_more_results(start,pagesize,sortfield);
        
        };


        $scope.getcurrentpage = function(){
        return $scope.$root.currentpage;
        };
        /**
        * Determine if the facet has already been applied.
        */
        $scope.is_facet_applied = function(facet_id, facet_value) {
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
        $scope.facet_search = function(facet_id, facet_value) {

    $scope.$root.currentpage = 1;

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
        $scope.toggle_facets = function() {
            var facets = $('.metasearch-facets');
            facets.toggleClass('hidden-xs', !facets.hasClass('hidden-xs'));
            $('#toggle-facets').text(function(i, text){
            return text === "Show facets" ? "Hide facets" : "Show facets";
            });
        };

        /**
        * Launch results export.
        * - submit export job
        * - open the results page in a new window.
        */
        $scope.export_results = function(format) {
            var submit_query_url = '/export/submit-query',
                results_page_url = '/export/results';
            $scope.show_export_error = false;
            $http({
                url: submit_query_url +
                    '?q=' + $scope.result._query +
                    '&format=' + format,
                method: 'GET'
            }).success(function(data) {
                window.location.href = results_page_url + '?job=' + data.job_id;
            }).error(function(){
                $scope.show_export_error = true;
            });
        };

        /**
        * Watch the reload/refresh event 
        *
        *
        */

        $scope.$watch(function () { return $location.url(); }, function (newUrl, oldUrl) {
        $scope.$root.currentpage = 1;
        $scope.pages= results.get_pages($scope.$root.currentpage, $scope.$root.pagesize, $scope.result.count);
        $scope.maxpageno = 1+parseInt(($scope.result.count-1)/$scope.$root.pagesize);

        });



        function getnewindexes(){
        if($scope.result.count == '0'  ) return; 
        if($scope.result.count == null  ) return; 
        $scope.indexoffacets={"omics_type":"0", "repository":"0", "TAXONOMY":"0","tissue":"0", "disease":"0", "modification":"0", "instrument_platform":"0", "publication_date":"0", "technology_type":"0", "test":"0" };
            for(facet in $scope.indexoffacets){
    //           console.log("facet:"+facet);
    //           console.log("results.facet length:"+$scope.result.facets.length);
            for( i = 0; i<$scope.result.facets.length; i++){
    //           console.log("check on:"+$scope.result.facets[i].id);
                if(facet===$scope.result.facets[i].id) {
                    $scope.indexoffacets[facet] = i; 
                }
            }
            };

        };

        function checkomicstypenull(){
        if($scope.result.count == '0'  ) return; 
        if($scope.result.count == null  ) return; 
        $scope.omicsfacetsno={"Proteomics":"0","Metabolomics":"0","Genomics":"0"};
        $scope.omicsfacetsindex={"Proteomics":"","Metabolomics":"","Genomics":""};
    //         console.log($scope.result.facets);
        var omicsfacet = $scope.result.facets[$scope.indexoffacets.omics_type].facetValues; 
        for(omic in omicsfacet){
        $scope.omicsfacetsno[omicsfacet[omic].label]=omicsfacet[omic].count; 
        $scope.omicsfacetsindex[omicsfacet[omic].label]=omic; 
        }
    //      console.log($scope.omicsfacetsindex);
        }

        function prepareQueryForShow(){
    //        console.log($scope.result.facets);
            getnewindexes();        
            var taxonomyRe = /TAXONOMY:"(\d+)"/g;
            var taxonomymatches=$scope.queryForShow.match(taxonomyRe);
            if(taxonomymatches === null) return;
            for(var i=0; i<taxonomymatches.length; i++){
                var taxonomymatch = taxonomymatches[i];
                var taxonomyid = taxonomymatch.substr(10,taxonomymatch.length-11);
                var taxlabel = getLabelByTaxid(taxonomyid);
                $scope.queryForShow = $scope.queryForShow.replace(taxonomyid, taxlabel);
            }
        }

        function getLabelByTaxid(taxonomyid){
            if(taxonomyid === undefined) return;
            if($scope.result.facets[$scope.indexoffacets.TAXONOMY] === undefined) return;
            var taxonomyarray = $scope.result.facets[$scope.indexoffacets.TAXONOMY].facetValues;
            for(var i=0; i<taxonomyarray.length;i++){
                if(taxonomyarray[i].value === taxonomyid) return taxonomyarray[i].label;
            }
            console.error("find no label for the taxid");
        }
    
    }]);

    /**
    * Query controller
    * Responsible for the search box in the header.
    */
    angular.module('ddiApp').controller('QueryCtrl', ['$scope', '$location', '$window', '$timeout', 'results', 'search', function($scope, $location, $window, $timeout, results, search) {

        $scope.query = {
            text: '',
            submitted: false
        };


        /**
        * Launch a metadata search using the service.
        */
        $scope.meta_search = function(query) {
    $scope.$root.currentpage = 1;
            search.meta_search(query);
            var current_abs_url = $location.absUrl();
    
            if(current_abs_url.match("index.html")) {$window.location = current_abs_url.replace("index.html","browse.html");}
            if(current_abs_url.match("/#/")) {$window.location = current_abs_url.replace("/#/","/browse.html#/");}
            if(current_abs_url.match("dataset.html")){$window.location = current_abs_url.replace("dataset.html","browse.html");}
            if(current_abs_url.match("api.html")){$window.location = current_abs_url.replace("api.html","browse.html");}
            if(current_abs_url.match("databases.html")){$window.location = current_abs_url.replace("databases.html","browse.html");}
        };


        /**
        * Control browser navigation buttons.
        */
        $scope.$watch(function () { return $location.url(); }, function (newUrl, oldUrl) {
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
                    results.search($location.search().q,0,$scope.$root.pagesize, $scope.$root.sortfield);
                    $scope.query.submitted = false;
                }
            }

            function redirect(newUrl) {
                $timeout(function() {
                    // wrapping in $timeout to avoid "digest in progress" errors
                    $window.location = newUrl;
                });
            }

        });

        /**
        * Called when the form is submitted.
        */
        $scope.submit_query = function() {
            $scope.query.submitted = true;

    $scope.$root.currentpage = 1;


            if ($scope.queryForm.text.$invalid) {
                return;
            // console.log("submitted invalid" + $scope.queryForm);
            }
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

    }]);





    /**
    * Dataset controller
    * Responsible for the Dataset fetching.
    */
    angular.module('ddiApp').controller('DatasetCtrl', ['$scope', '$location', '$window', '$timeout', '$http','$q',function($scope, $location, $window, $timeout, $http, $q) {

        var input= $location.url().replace("/",""); 
        var inputs = input.split("*");
        var acc = inputs[0];
        var domain = inputs[1];

        $scope.acc = acc;
        $scope.domain= domain;
        $scope.descriptionshowfull = "false";
     $scope.pubmedabstractshowfull = "false";
     $scope.dataprotocolshowfull = "false";
     $scope.sampleprotocolshowfull = "false";
     $scope.proteomics_list="pride,peptideatlas,peptide_atlas,massive,PRIDE,PeptideAtlas,MassIVE";
     $scope.metabolomics_list="MetaboLights,metabolights,metabolights_dataset,MetabolomicsWorkbench, Metabolomics Workbench";
     $scope.genomics_list="ega,EGA";
     $scope.repositories={"pride":"PRIDE","PRIDE":"PRIDE", 
                        "peptideatlas":"PeptideAtlas","peptide_atlas":"PeptideAtlas", "PeptideAtlas":"PeptideAtlas",
                        "massive":"MassIVE", "MassIVE":"MassIVE",
                         "metabolights":"MetaboLights","metabolights_dataset":"MetaboLights","MetaboLights":"MetaboLights",
                         "metabolome_workbench":"Metabolomics Workbench", "Metabolomics Workbench":"Metabolomics Workbench","MetabolomicsWorkbench":"Metabolomics Workbench",
                         "ega":"EGA", "EGA":"EGA",  };
     $scope.databaseUrls={
         "PRIDE":"http://www.ebi.ac.uk/pride/archive/",
         "MetaboLights":"http://www.ebi.ac.uk/metabolights/",
         "Metabolomics Workbench":"www.metabolomicsworkbench.org/",
         "PeptideAtlas":"http://www.peptideatlas.org/",
         "MassIVE":"https://massive.ucsd.edu/ProteoSAFe/datasets.jsp",
         "Metabolomics Workbench":"http://www.metabolomicsworkbench.org/"
     
     }

     $scope.getdatasetfail = "";
     $scope.instrumentPreUrl = "browse.html#/search?q=*:* AND instrument_platform:"
     $scope.relatedDatasetsLimit = 5;
     $scope.loadMoreBtnShow = "Load More";


     var url = "http://localhost:9091/dataset/get?acc="+acc+"&database="+domain;
     $http({
                url: url,
                method: 'GET'
            }).success(function(data) {
      $scope.dataset = data;
      console.log(data);
      $scope.sampleProtocolDescription = $scope.dataset.protocols[0].description;
      $scope.dataProtocolDescription = $scope.dataset.protocols[1].description;
      $scope.dataset.instruments = squash($scope.dataset.instruments);
      if(data===null){$scope.getdatasetfail =  "We can't access this dataset: " + acc + " at " + domain + " right now."; }
            }).error(function(){
      $scope.getdatasetfail = "We can't access this dataset: " + acc + " at " + domain + " right now.";
      console.log("GET error:" + url);
            });
     var relateDataUrl = "http://localhost:9091/dataset/moreLikeThis?acc="+acc+"&database="+domain;
     $http({
                url: relateDataUrl,
                method: 'GET'
            }).success(function(data) {
      $scope.relatedDatasets = data.datasets;
            }).error(function(){
      console.log("GET error:" + relateDataUrl);
            });                                                                                                                        


     $scope.altmetricEntities = [];
     $scope.publicationIndex = {};
     var arr = [];
     var altmetricUrls = [];
//     for (var a = 0; a < subs.length; ++a) {
     arr.push($http.get(url));
//     }

     $q.all(arr).then(function (ret) {
             // ret[0] contains the response of the first call
             // ret[1] contains the second response
             // etc.
     var dataset2 = ret[0].data;
     for(var i=0; i<dataset2.publications.length; i++){
        var pubmedid = dataset2.publications[i].id;
        altmetricUrl = "http://api.altmetric.com/v1/pmid/" + pubmedid;

        $http.get(altmetricUrl).success(function(data){
            var altmetricEntity = {};
            var insideId = data.pmid;
            altmetricEntity ={"pubmedid":insideId,"detailUrl":data.details_url,"imageUrl":data.images.small};
            $scope.altmetricEntities.push(altmetricEntity);
            $scope.publicationIndex[insideId] = $scope.altmetricEntities.indexOf(altmetricEntity);
            console.log(insideId+":"+$scope.altmetricEntities.indexOf(altmetricEntity));
            console.log($scope.publicationIndex);
            console.log($scope.publicationIndex["12665801"]);
        }).error(function(){
        });

     }


     }); //outside $q



     $scope.sharemethod = {email:["mailto:?body=[&subject=]"],
                        twitter:["https://twitter.com/intent/tweet?url=[&text=]",450],
                        facebook:["https://www.facebook.com/sharer.php?u=[",330], 
                        google:["https://plus.google.com/share?url=[",460],
                        tumblr:["https://www.tumblr.com/share/link?url=[&name=]",450],
                        linkedin:["https://www.linkedin.com/shareArticle?mini=true&url=[",520]
                    };

    $scope.clicksharethis = function(label){
     var value = $scope.sharemethod[label];
                var c=value[0].replace("[",encodeURIComponent(location.href)).replace("]",encodeURIComponent(document.title));
                1==value.length?location.href=c:window.open(c,"_blank","menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=500,height="+value[1]);
                // "preventDefault"in a?a.preventDefault():event.returnValue=!1

    };

    $scope.currentProtocol= "sample_protocol";
    $scope.protocols = {"sample_protocol":"Sample Protocol", "data_protocol":"Data Protocol"};

    /**
     * for tab control
     */
    $scope.tabs = [{
    /*
        title: 'Protocols',
        url: 'protocols.tpl.html'
    }, {
    */
        title: 'Bioentities',
        url: 'bioentities.tpl.html'
    }, {
        title: 'Lab Details',
        url: 'labdetails.tpl.html'
    }]; 

    $scope.currentTab = 'bioentities.tpl.html';

    $scope.onClickTab = function (tab) {
    $scope.currentTab = tab.url;
    }
    $scope.isActiveTab = function(tabUrl) {
    return tabUrl == $scope.currentTab;
    }

    /* onclick for change protocol type
     */
    $scope.onClickProtocol = function (){
        if($scope.currentProtocol== "sample_protocol") {
            $scope.currentProtocol = "data_protocol";
        }
        else{
            $scope.currentProtocol = "sample_protocol";
        }
    }

    /*
     * for the multiple publications click
     */

    $scope.currentPublication = 0;

    $scope.onClickPublicationLeft = function(){
        $scope.currentPublication--;
    }

    $scope.onClickPublicationRight = function(){
        $scope.currentPublication++;
    }

    /*
     * to load more related datasets
     */
    $scope.relatedLoadMore = function(){
        if($scope.relatedDatasetsLimit == 100)  {$scope.relatedDatasetsLimit = 5} 
        else {
            if($scope.relatedDatasetsLimit == 5)    $scope.relatedDatasetsLimit = 100; 
        }

        if($scope.loadMoreBtnShow === "Go Back") {$scope.loadMoreBtnShow = "Load More"}
        else {
            if($scope.loadMoreBtnShow === "Load More") $scope.loadMoreBtnShow = "Go Back";
        }
    }

    /*
     *for unique elements in array
     **/
    function squash(arr){
       var tmp = [];
       for(var i = 0; i < arr.length; i++){
           if(tmp.indexOf(arr[i]) == -1){
               tmp.push(arr[i]);
           }
       }
       return tmp;
    }

    $scope.redirectToNewDataset = function(){
     $window.location = "http://localhost:8000/app/dataset.html#/";
    }

}]);

/**
 * Datasets Statistics Lists controller
 * Responsible for the Datasets Stastistic Lists.
 */
angular.module('ddiApp').controller('DatasetListsCtrl', ['$scope', '$http', function($scope, $http ) {
    $scope.proteomics_list="pride,peptideatlas,peptide_atlas,massive,PRIDE,PeptideAtlas,MassIVE";
    $scope.metabolomics_list="metabolights,metabolights_dataset,MetabolomicsWorkbench,MetaboLights";
    $scope.genomics_list="ega,EGA";
    $scope.repositories={"pride":"PRIDE","PRIDE":"PRIDE", 
                        "peptideatlas":"PeptideAtlas","peptide_atlas":"PeptideAtlas", "PeptideAtlas":"PeptideAtlas",
                        "massive":"MassIVE", "MassIVE":"MassIVE",
                         "metabolights":"MetaboLights","metabolights_dataset":"MetaboLights","MetaboLights":"MetaboLights",
                         "metabolome_workbench":"Metabolomics Workbench", "Metabolomics Workbench":"Metabolomics Workbench","MetabolomicsWorkbench":"Metabolomics Workbench",
                         "ega":"EGA", "EGA":"EGA",  };
     var url = "http://localhost:9091/dataset/latest?size=10";
     $http({
                url: url,
                method: 'GET'
            }).success(function(data) {
      $scope.latestList = data["datasets"];
            }).error(function(){
    console.log("GET error:" + url);

            });
//
//
     var url = "http://localhost:9091/dataset/mostAccessed?size=10";
     $http({
                url: url,
                method: 'GET'
            }).success(function(data) {
      $scope.mostAccessedList = data["datasets"];
            }).error(function(){
    console.log("GET error:" + url);

            });

     //get general statistics
    url = "http://localhost:9091/stats/general";

    $http({
                url: url,
                method: 'GET'
            }).success(function(data) {
      $scope.statisticList = data;
            }).error(function(){
    console.log("GET error:" + url);
            });

    //get datasets No. of each repository 
    url = "http://localhost:9091/stats/domains";
    $scope.databases = {"test":"0"};
    $http({
                url: url,
                method: 'GET'
            }).success(function(data) {
        for(var i=0; i<data.length; i++){
           $scope.databases[data[i].domain.name]= data[i].domain.value;
        }
            }).error(function(){
    console.log("GET error:" + url);
            });


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
