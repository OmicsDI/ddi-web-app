angular.module('ddiApp').controller('MainContentCtrl', ['$scope', '$routeParams', '$window', '$location', '$anchorScroll', 'results', 'search',
    function($scope, $routeParams, $window, $location, $anchorScroll, results, search) {
        /**
         *      * Enables scrolling to anchor tags.
         *           * <a ng-click="scrollTo('anchor')">Title</a>
         *                */
        $scope.scrollTo = function(id) {
            if (id !== "home" && id !== "about" && id !== "help" && id !== "api" && id !== "browse" && id !== "databases" && id !== "dataset" && id !== "api") {
                $location.hash(id);
                $anchorScroll.yOffset = 20;
                $anchorScroll();

            }
        };

        $scope.$root.meta_dataset_title = '';

        /**
         * Show search form in top banner or in main page
         */
        if (location.pathname === '/about' ||
            location.pathname === '/api' ||
            location.pathname === '/search' ||
            location.pathname === '/databases' ||
            location.pathname.match(/\/dataset/) ||
            location.pathname === '/help'
        ) {
            $scope.$root.show_top_search = true
        } else {
            $scope.$root.show_top_search = false
        }

        if (location.pathname.match('/search')) {
            $scope.$root.show_progress_bar = true;
        } else {
            $scope.$root.show_progress_bar = false;
        }
        ///**
        // * set title of each page
        // */
        //if (location.pathname === '/about'){
        //    $window.document.title = "OmicsDI About";
        //}
        //
        //if (location.pathname === '/appi'){
        //    $window.document.title = "OmicsDI API";
        //}
        //
        //if (location.pathname === '/search'){
        //    $window.document.title = "OmicsDI Browse";
        //}
        //
        //if (location.pathname === '/databases'){
        //    $window.document.title = "OmicsDI Databases";
        //}
        //
        //if (location.pathname === '/dataset'){
        //    $window.document.title = "OmicsDI Dataset";
        //}
        //
        //if (location.pathname === '/help'){
        //    $window.document.title = "OmicsDI Help";
        //}

        /**
         *      * Watch `display_search_interface` in order to hide non-search-related content
         *           * when a search is initiated.
         *                */
        // $scope.$watch(function () {
        //     return results.get_status();
        // }, function (newValue, oldValue) {
        //     if (newValue !== null) {
        //         $scope.display_search_interface = newValue;
        //     }
        // });

        /**
         *      * Launch a metadata search from a web page.
         *           */
        $scope.meta_search = function(query) {

            search.meta_search(query);
        };

    }
]);