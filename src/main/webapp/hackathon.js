/**
 * Created by mingze on 21/09/15.
 */

//var app = angular.module('hackathonApp', []);
var app = angular.module('hackathonApp', ['nvd3ChartDirectives']);
app.controller('HackathonCtrl', function($scope, $http) {
    $scope.scoreDistribution = [];
    $scope.intersectionInfosArray = {};
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

    var metabolomics_all_scores_url = "http://localhost:3500/test/enrichment.expOutputDataset?query={%22expDataType%22:%22ProteomicsData%22}&fields=accession,intersectionInfos";

    $http({
        url: metabolomics_all_scores_url,
        method: 'GET'
    }).success(function (data) {
        intersectionInfosArray = data;
        maxScore = 0;
        console.log(intersectionInfosArray.length);
        for (var i=0; i<intersectionInfosArray.length; i++ ){
            accessionI = intersectionInfosArray[i]["accession"];
            for(var j=0; j<intersectionInfosArray[i]["intersectionInfos"].length; j++){
                var cosineScore = intersectionInfosArray[i]["intersectionInfos"][j]["cosineScore"];
                var accessionJ = intersectionInfosArray[i]["intersectionInfos"][j]["relatedDatasetAcc"];
                //if(maxScore < cosineScore) {maxScore = cosineScore}
                //scoreSection = Math.floor(cosineScore * 10);
                //if(scoreSection == 10) {scoreSection--;}
                //scoreDistribution[scoreSection]++;
                if(cosineScore > 0.8) {
                    console.log(accessionI + "-" + accessionJ + ":" + cosineScore);
                }
            }
        }
        console.log("maxScore: " + maxScore);
        //console.log(scoreDistribution);

    }).error(function () {
        console.log("GET error:" + related_datasets_url);
        $scope.get_similar_dataset_fail = "can not get similar dataset";
    });
});

