angular.module('ddiApp').controller('MainContentCtrl', ['$scope', '$routeParams', '$window','$location', '$anchorScroll', 'results', 'search',
    function ($scope,  $routeParams, $window, $location, $anchorScroll, results, search) {
        /**
         *      * Enables scrolling to anchor tags.
         *           * <a ng-click="scrollTo('anchor')">Title</a>
         *                */
        $scope.scrollTo = function (id) {
            if(id!=="home" && id!=="about" && id!=="help" && id!=="api"  && id!=="browse"  && id!=="databases"  && id!=="dataset"  && id!=="api" ){
                $location.hash(id);
                $anchorScroll.yOffset = 20;
                $anchorScroll();

            }
        };

        $scope.$root.meta_dataset_title = '';

        /**
         * Show search form in top banner or in main page
         */
        if ($location.path() === '/about'
            ||$location.path() === '/api'
            ||$location.path() === '/search'
            ||$location.path() === '/databases'
            ||$location.path().match(/\/dataset/)
            ||$location.path() === '/help'
        ) {
            $scope.$root.show_top_search = true
        } else {
            $scope.$root.show_top_search = false
        }

        if ($location.path().match('/dataset')){
        }
        ///**
        // * set title of each page
        // */
        //if ($location.path() === '/about'){
        //    $window.document.title = "OmicsDI About";
        //}
        //
        //if ($location.path() === '/appi'){
        //    $window.document.title = "OmicsDI API";
        //}
        //
        //if ($location.path() === '/search'){
        //    $window.document.title = "OmicsDI Browse";
        //}
        //
        //if ($location.path() === '/databases'){
        //    $window.document.title = "OmicsDI Databases";
        //}
        //
        //if ($location.path() === '/dataset'){
        //    $window.document.title = "OmicsDI Dataset";
        //}
        //
        //if ($location.path() === '/help'){
        //    $window.document.title = "OmicsDI Help";
        //}

        /**
         *      * Watch `display_search_interface` in order to hide non-search-related content
         *           * when a search is initiated.
         *                */
        $scope.$watch(function () {
            return results.get_status();
        }, function (newValue, oldValue) {
            if (newValue !== null) {
                $scope.display_search_interface = newValue;
            }
        });

        /**
         *      * Launch a metadata search from a web page.
         *           */
        $scope.meta_search = function (query) {

            search.meta_search(query);
        };

    }]);
