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
 * auto completion / suggestion words
 */
angular.module('ddiApp').factory('WordRetriever', function ($http, $q, $timeout) {
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
 * Service for passing data between controllers.
 angular.module('ddiApp').service('results', ['_', '$http', '$location', '$window', function (_, $http, $location, $window) {
 */
angular.module('ddiApp').service('results', ['_','$http', '$location', '$window', function (_, $http, $location, $window) {

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
//        var base_url = $location.protocol() + '://' + $location.host();
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
            console.log(ebeye_url);
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
