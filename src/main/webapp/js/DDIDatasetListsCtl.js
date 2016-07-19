/**
 * Datasets Statistics Lists controller
 * Responsible for the Datasets Stastistic Lists.
 */
angular.module('ddiApp').controller('DatasetListsCtrl', ['$scope', '$http', function ($scope, $http) {

    $scope.proteomics_list = proteomics_list;
    $scope.metabolomics_list = metabolomics_list;
    $scope.transcriptomics_list = transcriptomics_list;
    $scope.genomics_list = genomics_list;
    $scope.repositories = repositories;
    $scope.get_latest_datasets_fail = '';
    $scope.get_most_access_datasets_fail = '';
    $scope.$root.web_service_fail = 'false';


    $http({
        url: web_service_url,
        method: 'GET'
    }).success(function (data) {
        if($scope.$root.web_service_fail) $scope.$root.web_service_fail = 'false';
    }).error(function () {
        if($scope.$root.web_service_fail) $scope.$root.web_service_fail = 'true';
        //$scope.$root.web_service_fail = 'true';
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
    var url = web_service_url + "dataset/mostAccessed?size=20";
    $http({
        url: url,
        method: 'GET'
    }).success(function (data) {
        $scope.most_accessed_list = data["datasets"];
        $scope.most_accessed_list.length = 10;
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
    url = web_service_url + "statistics/general";

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
    url = web_service_url + "statistics/domains";
    $scope.databases = {"test": "0"};
    $http({
        url: url,
        method: 'GET'
    }).success(function (data) {
        for (var i = 0; i < data.length; i++) {
            $scope.databases[data[i].domain.name] = data[i].domain.value;
        }
        // console.log($scope.databases)
    }).error(function () {
        console.log("GET error:" + url);
    });

    $scope.getMonthDay = function (dateString){
        var month_names_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']; 
        var month_int = dateString.substr(4,2);
        var day_int = dateString.substr(6,2);
        var month = month_names_short[month_int - 1]; 
        return month + " " + day_int;
    }

}])
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
