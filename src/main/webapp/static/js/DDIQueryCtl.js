/**
 * Query controller
 * Responsible for the search box in the header.
 */
angular.module('ddiApp').controller('QueryCtrl', ['$scope', '$http', '$location', '$window', '$timeout',
    'results', 'search', 'WordRetriever', '$q','$cookies','$cookieStore', function($scope, $http, $location, $window, $timeout,
                                                                                   results, search, WordRetriever, $q,$cookies,$cookieStore) {

    var searchQ,
            searchQIndex = location.href.indexOf("?q=");
    if(searchQIndex !== -1) {
        searchQ = location.href.substring(searchQIndex + 3);
        searchQ = decodeURI(searchQ);
    }

    $scope.popup = {
        open: false
    };

    $scope.facaret = true;
    
    $scope.query = {
        text: '',
        submitted: false
    };
    $scope.$is_example = false;

    $scope.showOrHideAdv = function () {
        $scope.popup.open = !$scope.popup.open;
        $scope.facaret = !$scope.facaret;
    };

    /**
     * Launch a metadata search using the service.
     */
    $scope.meta_search = function(query) {
        debugger;
        var regQuery = new RegExp('\\(.*\\)');

        if(query == "" || query == '*:*' || !regQuery.test(query))
        {
            $cookieStore.put("rules",null);
        }
        $scope.$root.current_page = 1;
        search.meta_search(query);
        // var current_abs_url = $location.absUrl();
        // redirect($window.location.href);
        //
        // function redirect(newUrl) {
        //     $timeout(function() {
        //         // wrapping in $timeout to avoid "digest in progress" errors
        //         $window.location.href = newUrl;
        //     });
        // }


        //if (current_abs_url.match("/#/home")) {
        //    $window.location = current_abs_url.replace("/#/home", "/#");
        //}
        //if (current_abs_url.match("/#/search")) {
        //    current_abs_url = current_abs_url.replace("/#/search", "/#/search");
        //    $window.location = current_abs_url;
        //}
        //if (current_abs_url.match("/#/dataset")) {
        //    $window.location = current_abs_url.replace("/#/dataset", "/#");
        //}
        //if (current_abs_url.match("/#/api")) {
        //    $window.location = current_abs_url.replace("/#/api", "/#");
        //}
        //if (current_abs_url.match("/#/databases")) {
        //    $window.location = current_abs_url.replace("/#/databases", "/#");
        //}
        //if (current_abs_url.match("/#/help")) {
        //    $window.location = current_abs_url.replace("/#/help", "/#");
        //}
        //if (current_abs_url.match("/#/about")) {
        //    $window.location = current_abs_url.replace("/#/about", "/#");
        //}
    };


    /**
     * Control browser navigation buttons.
     */
    $scope.$watch(function() {
        return $window.location.href;
    }, function(newUrl, oldUrl) {
        // ignore url hash
        // newUrl = newUrl.replace(/#.+$/, '');
        // oldUrl = oldUrl.replace(/#.+$/, '');
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
                $scope.query.text = searchQ;
                results.search(searchQ, 0, $scope.$root.page_size, $scope.$root.sort_field, $scope.$root.sort_order);
                $scope.query.submitted = false;
            }
        }

        function redirect(newUrl) {
            $timeout(function() {
                // wrapping in $timeout to avoid "digest in progress" errors
                $window.location.href = newUrl;
            });
        }

    });

    /**
     * Called when the form is submitted.
     */
    $scope.submit_query = function() {
        $scope.query.submitted = true;

        $scope.$root.current_page = 1;


        //        if ($scope.queryForm.text.$invalid) {
        //            return;
        // console.log("submitted invalid" + $scope.queryForm);
        //        }
        $scope.meta_search($scope.query.text);
    };

    /**
     * Called when the example link is clicked.
     */
    $scope.example_query = function(example_input) {
        $scope.$is_example = true;
        $scope.meta_search(example_input);
    };



    /**
     * Check if the url contains a query when the controller is first created
     * and initiate a search if necessary.
     */
    (function() {
        //        if ($location.url().indexOf("/search?q=") > -1) {
        if (location.href.indexOf("?q=") > -1) {
            // a search result page, launch a new search
            $scope.query.text = searchQ;
            results.search(searchQ);
        }
    })();

    /**
     *
     * get suggestion words
     */

    $scope.getwords = function() {
        return $scope.words;
    };

    $scope.get_suggestions = function(typedthings) {
        //    console.log("Do something like reload data with this: " + typedthings );
        if ($scope.$is_example) {
            $scope.$is_example = false;
            return;
        }
        $scope.newwords = WordRetriever.getwords(typedthings);
        $scope.newwords.then(function(data) {
            $scope.words = data;
        });
    };

    $scope.do_query = function(suggestion) {
        $scope.query.text = suggestion;
        $scope.meta_search($scope.query.text);
    }
}]);