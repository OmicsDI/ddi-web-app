/**
 * Results display controller
 * Responsible for visualising search results.
 */
angular.module('ddiApp').controller('ResultsListCtrl', ['$scope', '$location', '$http', 'results', 'ngProgressFactory', function ($scope, $location, $http, results, ngProgressFactory) {

    $scope.result = {
        entries: []
    };
    $scope.show_export_error = false;
    $scope.$root.page_size = 15;
    $scope.$root.sort_field = 'id';
    $scope.$root.sort_order = 'descending';
    $scope.pages = [0, 0];
    $scope.max_page_no = 1;

    $scope.proteomics_list = proteomics_list;
    $scope.metabolomics_list = metabolomics_list;
    $scope.genomics_list = genomics_list;
    $scope.repositories = repositories;
    $scope.database_urls = database_urls;
    $scope.search_in_progress = results.get_search_in_progress();
    $scope.show_error = results.get_show_error();
    $scope.highlight_terms = ["a", "b"];


    $scope.facetsNo = 8;
    $scope.omics_facets_no = {"Proteomics": "", "Metabolomics": "", "Genomics": ""};
    $scope.index_of_facets = {
        "omics_type": "-1",
        "repository": "-1",
        "TAXONOMY": "-1",
        "tissue": "-1",
        "disease": "-1",
        "modification": "-1",
        "instrument_platform": "-1",
        "publication_date": "-1",
        "technology_type": "-1",
        "test": "0"
    };

    /**
     * Watch `result` changes.
     */
    $scope.$watch(function () {
        return results.get_result();
    }, function (newValue, oldValue) {
        if (newValue !== null) {
            $scope.$root.completing = false;
            $scope.result = newValue;
            jump_if_has_one();
            $scope.pages = results.get_pages($scope.$root.current_page, $scope.$root.page_size, $scope.result.count);
            $scope.max_page_no = 1 + parseInt(($scope.result.count - 1) / $scope.$root.page_size);
            $scope.query = $location.search().q;
            $scope.query_for_show = $scope.query;
            prepare_query_for_show();
            prepare_highlight_show();
            get_new_indexes();
            check_omics_type_null();
            change_GNPS_domainName();
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
     * progress bar
     */
    $scope.progressStyle = {'width': '10%'};
    /**
     * Watch `search_in_progress` changes.
     */
    $scope.$watch(function () {
        return results.get_search_in_progress();
    }, function (newValue, oldValue) {
        if (true || newValue != oldValue) {
            $scope.search_in_progress = newValue;
        }
    });


    $scope.$watch('search_in_progress', function (newValue, oldValue) {
        if ($scope.search_in_progress) {
            elem = document.getElementById("ngProgress-container");
            if (elem) {
                elem.parentNode.removeChild(elem);
            }
            $scope.progressbar = ngProgressFactory.createInstance();
            $scope.progressbar.set(35);
        }
        else {
            if ($scope.progressbar !== undefined)$scope.progressbar.complete();
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

    ///**
    // * Launch results export.
    // * - submit export job
    // * - open the results page in a new window.
    // */
    //$scope.export_results = function (format) {
    //    var submit_query_url = '/export/submit-query',
    //        results_page_url = '/export/results';
    //    $scope.show_export_error = false;
    //    $http({
    //        url: submit_query_url +
    //        '?q=' + $scope.result._query +
    //        '&format=' + format,
    //        method: 'GET'
    //    }).success(function (data) {
    //        window.location.href = results_page_url + '?job=' + data.job_id;
    //    }).error(function () {
    //        $scope.show_export_error = true;
    //    });
    //};


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
        for (facet in $scope.index_of_facets) {
            for (i = 0; i < $scope.result.facets.length; i++) {
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
        $scope.omics_facets_no = {"Proteomics": "0", "Metabolomics": "0", "Genomics": "0", "Transcriptomics":"0"};
        $scope.omicsfacetsindex = {"Proteomics": "", "Metabolomics": "", "Genomics": "", "Transcriptomics":""};
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
    }

    /**
     * Change the domainname/source of metablomics dataset in Massive to "GNPS"
     */
    function change_GNPS_domainName() {

        if($scope.result.datasets == null) return;

        for(var i = 0; i < $scope.result.datasets.length; i++){
            if($scope.result.datasets[i].title.substr(0,4) == "GNPS"){
                $scope.result.datasets[i].source_title = "GNPS";
            }
            else{
                $scope.result.datasets[i].source_title = $scope.result.datasets[i].source;
            }
        }

    }

    /**
     * Prepare the terms which is highlighted in the result's contents
     *
     */
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

    /**
    * if the result only has one dataset, jump to the dataset web page
    */
    function jump_if_has_one(){
        if($scope.result.datasets != null) {

        if($scope.result.datasets.length == 1){
            dataset1 = $scope.result.datasets[0];
            location.href = "#/dataset/"+dataset1.source+"/"+dataset1.id;
        }
        }
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

            //remove the asterisk symbols from the Regexp
            for (var i = 0; i < termsToHighlight.length; i++) {
                termsToHighlight[i] = termsToHighlight[i].replace(/\*/g, "");
            }

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
