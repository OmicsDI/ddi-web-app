/**
 * Created by mingze on 21/09/15.
 */

//var app = angular.module('hackathonApp', []);
var app = angular.module('hackathonApp', ['nvd3ChartDirectives']);
app.controller('HackathonCtrl', function($scope, $http) {
    document.getElementById("selectform").selectedIndex = "1";
    $scope.accessions=[];
    var metabolomics_datasets_url = "http://localhost:3500/test/enrichment.expOutputDataset?query={}&fields=accession";
    $http({
        url: metabolomics_datasets_url ,
        method: 'GET'
    }).success(function (data) {
        $scope.datasets = data;
        for (var i=0; i<data.length; i++ ){
            $scope.accessions.push(data[i]["accession"]);
        }
        $scope.accessions = $scope.accessions.sort();
    }).error(function () {
        console.log("GET error:" + related_datasets_url);
        $scope.get_similar_dataset_fail = "can not get similar dataset";
    });

});

