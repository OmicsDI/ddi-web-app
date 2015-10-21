/**
 * Dataset controller
 * Responsible for the Dataset fetching.
 */
angular.module('ddiApp').controller('DatasetCtrl', ['$scope', '$http', '$location', '$window', '$routeParams', '$timeout', '$q', function ($scope, $http, $location, $window, $routeParams, $timeout, $q) {


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
    var related_datasets_url = web_service_url + "dataset/getSimilar?acc=" + $scope.acc + "&database=" + $scope.domain;
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
            if ($scope.dataset.publicationIds === null) return;
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

            get_enrichment_info();    // For enriched synonyms tooltip
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
     * Get enrhciment info by type
     */
    function get_enrichment_info() {
        var enrichment_info_url= "http://localhost:3500" + "/test/enrichment.enrichedDataset?query={\"$and\":[{\"accession\":\"" + $scope.acc + "\"},{\"status\":\"new\"}]}";
        $http({
            url: enrichment_info_url,
            method: 'GET'
        }).success(function (data) {
            var enrichment_info = data[0];
            split_by_enrichment_info(enrichment_info);
        }).error(function () {
            console.log("GET error:" + enrichment_info_url);
        });
    }

    /**
     * Split the field in to multiple sentences, with synonyms or without
     */
    function split_by_enrichment_info(enrichment_info){
        var titleEnrichInfo = enrichment_info.title;
        var abstractEnrichInfo = enrichment_info.abstractDescription;
        var sampleProtocolEnrichInfo = enrichment_info.sampleProtocol;
        var dataProtocolEnrichInfo = enrichment_info.dataProtocol;

        var title_section_positions = get_section_position(titleEnrichInfo);
        var abstract_section_positions = get_section_position(abstractEnrichInfo);
        var sample_protocol_section_positions = get_section_position(sampleProtocolEnrichInfo);
        var data_protocol_section_positions = get_section_position(dataProtocolEnrichInfo);
        $scope.title_sections = get_section_content($scope.dataset.name, title_section_positions);
        $scope.abstract_sections = get_section_content($scope.dataset.description, abstract_section_positions);
        $scope.sample_protocol_sections = get_section_content($scope.sample_protocol_description, sample_protocol_section_positions);
        $scope.data_protocol_sections = get_section_content($scope.data_protocol_description, data_protocol_section_positions);

        console.log($scope.abstract_sections);
    }

    /**
     * Get the words who have synonyms or sections who do not have synonyms
     */
    function get_section_content(wholetext,section_positions){
        var sections = [];
        for(var i=0; i<section_positions.length; i++) {
            var start = section_positions[i].from;
            var end = section_positions[i].to;
            var hasSynonyms = section_positions[i].hasSynonyms;
            var sectionWord = wholetext.substring(start, end + 1);
            var synonyms = [];
            if(hasSynonyms == "true")  {synonyms = get_synonyms(sectionWord);}
            if(start>500) {tobeReduced = "true"}
                else{tobeReduced = "false"}
            var section = {"text":sectionWord,"hasSynonyms":hasSynonyms, "synonyms":synonyms, "tobeReduced":tobeReduced};
            sections.push(section);
        }
        var start = section_positions[section_positions.length-1].to + 1; //the last section
        var hasSynonyms = "false";
        var synonyms = [];
        var sectionWord = wholetext.substring(start, wholetext.length);
        var section = {"text":sectionWord,"hasSynonyms":hasSynonyms, "synonyms":synonyms};
        sections.push(section);
        console.log(sections);
        return sections;
    }

    /**
     * Get Synonyms from web service
     */
     function get_synonyms(word) {
        //var get_synonyms_url= word ;//"http://localhost:3500" + "/test/enrichment.enrichedDataset?query={\"accession\":\"" + $scope.acc + "\"}";
        //$http({
        //    url: get_synonyms_url,
        //    method: 'GET'
        //}).success(function (data) {
        //    var synonyms = data;
        //    return synonyms;
        //}).error(function () {
        //    console.log("GET error:" + enrichment_info_url);
        //    return null;
        //});
        var synonyms = ["synonym1", "synonym2", "synonym3", "synonym4"];
        return synonyms;
     }



    /**
     * Get the section positions in each field
     * @param enrichInfo
     * @returns {Array}
     */
    function get_section_position(enrichInfo){
        var sections = [];
        var sectionStart = 0;
        var sectionEnd = 0;
        for(var i=0; i<enrichInfo.length; i++) {
            var wordStart = enrichInfo[i].from - 1;
            var wordEnd = enrichInfo[i].to - 1;

            if(sectionStart < wordStart) {
                sectionEnd = wordStart - 1;
                var section = {"from": sectionStart, "to": sectionEnd, "hasSynonyms":"false"};
                sections.push(section);

                var section = {"from": wordStart, "to": wordEnd, "hasSynonyms":"true"};
                sections.push(section);

                sectionStart = wordEnd + 1;
                sectionEnd = wordEnd + 1;

            } else if(sectionStart == wordStart){
                var section = {"from": wordStart, "to": wordEnd, "hasSynonyms":"true"};
                sections.push(section);

                sectionStart = wordEnd + 1;
                sectionEnd = wordEnd + 1;
            } else if(sectionStart > wordStart){
                console.error("someThing wrong, sectionStart: " + sectionStart + "is bigger than wordStart: " + wordStart);
            }
        }
        return sections;
}



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

    /**
     * To control the enrichment info show
     */
    $scope.enrich_button_label = "Enrich it";
    $scope.enrich_click = function(){
        if ($scope.enrich_button_label == "Enrich it") {$scope.enrich_button_label = "Enriched"}
        else if($scope.enrich_button_label == "Enriched") {$scope.enrich_button_label = "Enrich it"}
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
        if (arr === null || arr.length === null) return null;
        for (var i = 0; i < arr.length; i++) {
            if (tmp.indexOf(arr[i]) == -1) {
                tmp.push(arr[i]);
            }
        }
        return tmp;
    }

    $scope.highlight_terms = [];
    $scope.highlight_terms[0] = " on ";
    $scope.highlight_terms[1] = " off ";


    /**
     * For similar datasets tabs control
     */
    $scope.tabs = [
        { title:'Dynamic Title 1', content:'Dynamic content 1' },
        { title:'Dynamic Title 2', content:'Dynamic content 2' }
    ];

    $scope.alertMe = function() {
        setTimeout(function() {
            $window.alert('You\'ve selected the alert tab!');
        });
    };

}])
    .filter('datasethighlight', function ($sce) {
        return function (str, termsToHighlight) {
            //Sort terms by length
            if (str === null || str === undefined || str.length < 1)return;
            if (termsToHighlight.length < 1) return;
            termsToHighlight.sort(function (a, b) {
                return b.length - a.length;
            });
            // Regex to simultaneously replace terms
            var regex = new RegExp('(' + termsToHighlight.join('|') + ')', 'gi');
            return $sce.trustAsHtml(str.replace(regex, '<span class="highlighted">$&</span>'));
        };

    })
;
