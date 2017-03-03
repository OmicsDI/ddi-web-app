angular.module('ddiApp').controller('ProfileCtrl', ['$http','$scope', '$routeParams', '$window','$location', '$anchorScroll', 'results', 'search',
    function ($http, $scope,  $routeParams, $window, $location, $anchorScroll, results, search) {
        $scope.userProfile = {};

        $http({
            url: "/user/profile",
            method: 'GET'
        }).success(function (data) {
            $scope.userProfile = data;
        }).error(function () {
            console.log("user profile GET error");
        });

        $scope.$root.meta_dataset_title = '';
        /**
         *      * Launch a metadata search from a web page.
         *           */
        $scope.meta_search = function (query) {

            search.meta_search(query);
        };
    }]);
