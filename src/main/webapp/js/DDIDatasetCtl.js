/**
 * Dataset controller
 * Responsible for the Dataset fetching.
 */
angular.module('ddiApp').controller('DatasetCtrl', ['$scope', '$http', '$location', '$window', '$routeParams','$timeout', '$q', function ($scope, $http, $location, $window, $routeParams, $timeout, $q) {


    $scope.acc = $routeParams.acc;
    $scope.domain = $routeParams.domain;
    $scope.description_show_full = "false";
    $scope.pubmed_abstract_show_full = "false";
    $scope.data_protocol_show_full = "false";
    $scope.sample_protocol_show_full = "false";
    $scope.proteomics_list = proteomics_list;
    $scope.metabolomics_list = metabolomics_list;
    $scope.genomics_list = genomics_list;
    $scope.repositories = repositories;
    $scope.database_urls = database_urls;

    $scope.get_dataset_fail = "";
    $scope.get_similar_dataset_fail = "";
    $scope.related_datasets_limit = 5;
    $scope.load_more_btn_show = "Load More";
    $scope.month_names_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    /*     $http({
     url: url,
     method: 'GET'
     }).success(function(data) {
     $scope.dataset = data;
//     console.log(data);
     }).error(function(){
     });
     */
    var related_datasets_url = web_service_url + "dataset/moreLikeThis?acc=" + $scope.acc + "&database=" + $scope.domain;
    $http({
        url: related_datasets_url,
        method: 'GET'
    }).success(function (data) {
        $scope.related_datasets = data.datasets;
    }).error(function () {
        console.log("GET error:" + related_datasets_url);
        $scope.get_similar_dataset_fail = "can not get similar dataset";
    });

    $scope.altmetric_entities = [];
    $scope.publication_index = {};
    $scope.publication_index_info = {};
    $scope.publication_info = [];
    var altmetricUrls = [];
    var arr = [];
    var url = web_service_url + "dataset/get?acc=" + $scope.acc + "&database=" + $scope.domain;
    arr.push($http.get(url));

    $q.all(arr).then(function (ret) {
            // ret[0] contains the response of the first call
            // ret[1] contains the second response
            // etc.
            $scope.dataset = ret[0].data;
            if (ret[0].data === null || ret[0].data.id === null) {
                $scope.get_dataset_fail = "We can't access this dataset: " + $scope.acc + " at " + $scope.domain + " right now.";
                return;
            }
            if ($scope.dataset.protocols.length > 0) {
                $scope.sample_protocol_description = $scope.dataset.protocols[0].description;
            }
            if ($scope.dataset.protocols.length > 1) {
                $scope.data_protocol_description = $scope.dataset.protocols[1].description;
            }
            $scope.dataset.instruments = squash($scope.dataset.instruments);
            if($scope.dataset.publicationIds === null) return;
            for (var i = 0; i < $scope.dataset.publicationIds.length; i++) {
                var pubmed_id = $scope.dataset.publicationIds[i];
                altmetricUrl = "http://api.altmetric.com/v1/pmid/" + pubmed_id;

                $http.get(altmetricUrl).success(function (data) {
                    var altmetric_entity = {};
                    var inside_id = data.pmid;
                    altmetric_entity = {
                        "pubmed_id": inside_id,
                        "detail_url": data.details_url,
                        "image_url": data.images.small
                    };
                    $scope.altmetric_entities.push(altmetric_entity);
                    $scope.publication_index[inside_id] = $scope.altmetric_entities.indexOf(altmetric_entity);
                }).error(function () {
                });

                var publication_url = web_service_url + "publication/list?acc=" + pubmed_id;
                $http.get(publication_url).success(function (publication_data) {
                    var publication = {};
                    if (publication_data.count > 1 || publication_data.count < 1) {
                        console.error("got wrong publication data from" + publication_url)
                    }
                    var entity = publication_data.publications[0];
                    var inside_id = entity.id;

                    var pub_year = entity.date.substr(0, 4);
                    var pub_month = parseInt(entity.date.substr(4, 2));
                    var pub_day = entity.date.substr(6, 2);
                    if (pub_month > 0 && pub_month < 13) {
                        pub_month = $scope.month_names_short[pub_month - 1]
                    }
                    else {
                        pub_month = '';
                    }
                    if (pub_day === '00') {
                        entity.date = pub_year + ' ' + pub_month + ';';
                    }
                    else {
                        entity.date = pub_year + ' ' + pub_month + ' ' + pub_day + ';';
                    }


                    entity.volume = entity.volume || "";
                    entity.issue = entity.issue || "";
                    entity.pagination = entity.pagination || "";

                    var authors = [];
                    for (var i = 0; i < entity.authors.length; i++) {
                        var surname = entity.authors[i].substr(entity.authors[i].length - 1, 1);
                        var reg = new RegExp(surname + "[a-z]{0,100} " + surname + "$", "")
                        var have_reg = entity.authors[i].search(reg) >= 0;
                        if (have_reg) {
                            author_for_searching = entity.authors[i].replace(reg, " " + surname);
                        }
                        else {
                            author_for_searching = entity.authors[i].replace(surname, "");
                        }
                        var author = {"fullname": entity.authors[i], "name_for_searching": author_for_searching};
                        authors.push(author);
                    }

                    publication_info_entity = {
                        "pmid": inside_id,
                        "citation": entity.journal + ". " + entity.date + " " + entity.volume + "(" + entity.issue + "): " + entity.pagination + ".",
                        "title": entity.title,
                        "authors": authors,
                        "pub_abstract": entity.pubAbstract
                    };
                    publication_info_entity.citation = publication_info_entity.citation.replace(/\(\): \./, "");

                    $scope.publication_info.push(publication_info_entity);
                    $scope.publication_index_info[inside_id] = $scope.publication_info.indexOf(publication_info_entity);
                }).error(function () {
                });
            }

        }, function (error) {
            $scope.get_dataset_fail = "We can't access this dataset: " + $scope.acc + " at " + $scope.domain + " right now.";
            console.log("GET error:" + url);
        }
    ); //outside $q


    $scope.file_links = [];
    var get_file_links_url = web_service_url + "dataset/getFileLinks?acc=" + $scope.acc + "&database=" + $scope.domain;
    $http({
        url: get_file_links_url,
        method: 'GET'
    }).success(function (data) {
        for (var i = 0; i < data.length; i++) {
            var name = data[i].replace(/.*\//, '');
            var link = data[i];
            $scope.file_links.push({'name': name, 'link': link});
        }
    }).error(function () {
        console.error("GET error: " + get_file_links_url);
    });


    $scope.share_methods = {
        email: ["mailto:?body=[&subject=]"],
        twitter: ["https://twitter.com/intent/tweet?url=[&text=]", 450],
        facebook: ["https://www.facebook.com/sharer.php?u=[", 330],
        google: ["https://plus.google.com/share?url=[", 460],
        tumblr: ["https://www.tumblr.com/share/link?url=[&name=]", 450],
        linkedin: ["https://www.linkedin.com/shareArticle?mini=true&url=[", 520]
    };

    $scope.click_share_this = function (label) {
        var value = $scope.share_methods[label];
        var c = value[0].replace("[", encodeURIComponent(location.href)).replace("]", encodeURIComponent(document.title));
        1 == value.length ? location.href = c : window.open(c, "_blank", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=500,height=" + value[1]);
        // "preventDefault"in a?a.preventDefault():event.returnValue=!1

    };


    /**
     * for tab control
     */
    $scope.tabs = [{
        title: 'Filelist',
        url: 'filelist.tpl.html'
    }, {
        title: 'Bioentities',
        url: 'bioentities.tpl.html'
    }, {
        title: 'Lab Details',
        url: 'labdetails.tpl.html'
    }];

    $scope.currentTab = 'filelist.tpl.html';

    $scope.onClickTab = function (tab) {
        $scope.currentTab = tab.url;
    }
    $scope.isActiveTab = function (tabUrl) {
        return tabUrl == $scope.currentTab;
    }


    /*
     * for the multiple publications click
     */

    $scope.current_publication = 0;

    $scope.onclick_publication_left = function () {
        $scope.current_publication--;
    }

    $scope.onclick_publication_right = function () {
        $scope.current_publication++;
    }

    /*
     * to load more related datasets
     */
    $scope.related_load_more = function () {
        if ($scope.related_datasets_limit == 100) {
            $scope.related_datasets_limit = 5
        }
        else {
            if ($scope.related_datasets_limit == 5)    $scope.related_datasets_limit = 100;
        }

        if ($scope.load_more_btn_show === "Go Back") {
            $scope.load_more_btn_show = "Load More"
        }
        else {
            if ($scope.load_more_btn_show === "Load More") $scope.load_more_btn_show = "Go Back";
        }
    }

    /*
     *for unique elements in array
     **/
    function squash(arr) {
        var tmp = [];
        if (arr===null || arr.length === null) return null;
        for (var i = 0; i < arr.length; i++) {
            if (tmp.indexOf(arr[i]) == -1) {
                tmp.push(arr[i]);
            }
        }
        return tmp;
    }


}]);
