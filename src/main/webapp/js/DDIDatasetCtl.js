/**
 * Dataset controller
 * Responsible for the Dataset fetching.
 */
angular.module('ddiApp').controller('DatasetCtrl', ['$scope', '$http', '$location', '$window', '$routeParams', '$timeout', '$q', function ($scope, $http, $location, $window, $routeParams, $timeout, $q) {


    var long_text_length = 500;
    $scope.acc = $routeParams.acc;
    $scope.domain = $routeParams.domain;
    $scope.description_show_full = "false";
    $scope.pubmed_abstract_show_full = "false";
    $scope.data_protocol_show_full = "false";
    $scope.sample_protocol_show_full = "false";
    $scope.proteomics_list = proteomics_list;
    $scope.metabolomics_list = metabolomics_list;
    $scope.transcriptomics_list = transcriptomics_list;
    $scope.genomics_list = genomics_list;
    $scope.repositories = repositories;
    $scope.database_urls = database_urls;

    $scope.get_dataset_fail = "";
    $scope.get_similar_dataset_fail = "";
    $scope.biological_related_datasets = null;
    $scope.related_datasets_limit = 5;
    $scope.related_datasets_by_biological_limit = 0;
    $scope.biological_similarity_info = null;
    $scope.load_more_btn_show = "Load More";
    $scope.month_names_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


    $scope.instrument_pre_url = '#/search?q=*:* AND instrument_platform:';
    $scope.tissue_pre_url = '#/search?q=*:* AND tissue:';
    $scope.organism_pre_url = '#/search?q=*:* AND TAXONOMY:';
    $scope.disease_pre_url = '#/search?q=*:* AND disease:';

    $scope.threshold = 0.50;
    $scope.threshold = $scope.threshold.toPrecision(2);

    $scope.domain_enrichedDatabase_map = {
           'metabolomics_workbench' : 'MetabolomicsWorkbench',
            'gpmdb' : 'GPMDB',
            'ega' : 'EGA',
    };

    var related_datasets_url = web_service_url + "dataset/getSimilar?acc=" + $scope.acc + "&database=" + $scope.domain;
    $http({
        url: related_datasets_url,
        method: 'GET'
    }).success(function (data) {
        $scope.related_datasets = data.datasets;
        FilterRelatedDatasets();
    }).error(function () {
        console.error("GET error:" + related_datasets_url);
        //$scope.get_similar_dataset_fail = "can not get similar dataset";
    });

    //change the domain name to the real name in enrichment data in MongoDB
    var tempDomainName = $scope.domain;
    if ($scope.domain_enrichedDatabase_map[$scope.domain] == null){
        tempDomainName = $scope.domain;
    }
    else{
        tempDomainName = $scope.domain_enrichedDatabase_map[$scope.domain];
    }

    var related_datasets_by_biological_url = web_service_url + "enrichment/getSimilarDatasetsByBiologicalData?accession=" + $scope.acc + "&database=" + tempDomainName;
        $http({
        url: related_datasets_by_biological_url,
        method: 'GET'
    }).success(function (data) {
        $scope.related_datasets_by_biological = data.datasets;
    }).error(function () {
        console.error("GET error:" + related_datasets_by_biological_url);
    });

     /**
     * To get the similarity info
     */
    //var biological_similarity_info_url = "http://localhost:9091/" + "enrichment/getSimilarityInfo?accession=" + $scope.acc + "&database=" + tempDomainName;
    var biological_similarity_info_url = web_service_url + "enrichment/getSimilarityInfo?accession=" + $scope.acc + "&database=" + tempDomainName;
    $http({
        url: biological_similarity_info_url,
        method: 'GET'
    }).success(function (data) {
        $scope.biological_similarity_info = data;
        if($scope.biological_similarity_info != null){
            $scope.related_datasets_by_biological_limit = find_similarity_limit($scope.biological_similarity_info.scores, $scope.threshold);
        }
    }).error(function () {
        console.error("GET error:" + related_datasets_by_biological_url);
        //$scope.get_similar_dataset_fail = "can not get similar dataset";
    });

    $scope.altmetric_entities = [];
    $scope.publication_index = {};
    $scope.publication_index_info = {};
    $scope.publication_info = [];
    var altmetricUrls = [];
    var arr = [];
    var url = web_service_url + "dataset/get?acc=" + $scope.acc + "&database=" + $scope.domain;
    //var get_synonyms_url = web_service_url + "enrichment/getSynonymsForDataset?accession=" + $scope.acc + "&database=" + $scope.domain;
    var get_synonyms_url = web_service_url + "enrichment/getSynonymsForDataset?accession=" + $scope.acc + "&database=" + tempDomainName;
    arr.push($http.get(url));
    arr.push($http.get(get_synonyms_url));

    $q.all(arr).then(function (ret) {
            // ret[0] contains the response of the first call
            // ret[1] contains the second response
            // etc.
            $scope.dataset = ret[0].data;
            prepare_synonyms(ret[1].data);
            get_enrichment_info();    // For enriched synonyms tooltip

            if (ret[0].data === null || ret[0].data.id === null) {
                $scope.get_dataset_fail = "We can't access this dataset: " + $scope.acc + " at " + $scope.domain + " right now.";
                return;
            }
            for (var i = 0; i < $scope.dataset.protocols.length; i++) {
                if ($scope.dataset.protocols[i].name == "sample_protocol") {
                    $scope.sample_protocol_description = $scope.dataset.protocols[i].description;
                }

                if ($scope.dataset.protocols[i].name == "data_protocol") {
                    $scope.data_protocol_description = $scope.dataset.protocols[i].description;
                }
            }
            $scope.dataset.instruments = squash($scope.dataset.instruments);

            /**
             * Fill the meta info to SEO
             */
                $scope.$root.meta_dataset_title = $scope.dataset.name;
                $scope.$root.meta_dataset_abstract = $scope.dataset.description;
                $scope.$root.meta_dataset_identifier = $scope.acc;
                $scope.$root.meta_originalURL = $scope.dataset.full_dataset_link;
                $scope.$root.meta_ddiURL = "http://www.ebi.ac.uk/Tools/omicsdi/#/dataset/" + $scope.repositories[$scope.domain] + "/" + $scope.acc;
                $scope.$root.meta_entries = [];


            //get and prepare each publication's data
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
                    //get the name for searching
                    for (var i = 0; i < entity.authors.length; i++) {
                        var reg_surname = new RegExp(" [A-Z]{1,2}$", "")
                        var reg_result = reg_surname.exec(entity.authors[i]);
                        if(reg_result != null){
                            var surname = reg_result[0];
                        }

                        var reg_firstname = new RegExp("^.*? ", "")
                        var firstname = reg_firstname.exec(entity.authors[i])[0];

                        var author_for_searching = firstname + " " + surname;

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

                    $scope.$root.meta_entries.push(
                        {
                        name:"citation_title",
                        content:entity.title
                        }
                    );

                    for(var i=0; i<authors.length; i++){
                        $scope.$root.meta_entries.push(
                            {
                            name:"citation_author",
                            content:authors[i].fullname
                            }
                        );
                    }

                    $scope.$root.meta_entries.push(
                        {
                        name:"citation_pubdate",
                        content:entity.date
                        }
                    );
                    
                    meta_publication = {
                        "title":entity.title,
                         "authors":authors,
                         "pub_date": entity.date
                    }
                    publication_info_entity.citation = publication_info_entity.citation.replace(/\(\): \./, "");

                    $scope.publication_info.push(publication_info_entity);
                    $scope.publication_index_info[inside_id] = $scope.publication_info.indexOf(publication_info_entity);
                }).error(function () {
                });
            }
        }, function (error) {
            $scope.get_dataset_fail = "We can't access this dataset: " + $scope.acc + " at " + $scope.domain + " right now.";
            console.error("GET error:" + url);
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
        //var enrichment_info_url= "http://localhost:3500" + "/test/enrichment.enrichedDataset?query={\"$and\":[{\"accession\":\"" + $scope.acc + "\"},{\"status\":\"new\"}]}";

    //change the domain name to the real name in enrichment data in MongoDB
    var tempDomainName = $scope.domain;
    if ($scope.domain_enrichedDatabase_map[$scope.domain] == null){
        tempDomainName = $scope.domain;
    }
    else{
        tempDomainName = $scope.domain_enrichedDatabase_map[$scope.domain];
    }

        //var enrichment_info_url = web_service_url + "enrichment/getEnrichmentInfo?accession=" + $scope.acc + "&database=" + $scope.domain;
        var enrichment_info_url = web_service_url + "enrichment/getEnrichmentInfo?accession=" + $scope.acc + "&database=" + tempDomainName;
        $http({
            url: enrichment_info_url,
            method: 'GET'
        }).success(function (data) {
            var enrichment_info = data;
            if(enrichment_info != null && !(enrichment_info.toString() === ''))
                 $scope.dataset_enriched = "true";
            else
                $scope.dataset_enriched = "false";
            console.log($scope.dataset_enriched)
            prepare_synonyms();
            split_by_enrichment_info(enrichment_info);
        }).error(function () {
            $scope.dataset_enriched = "false";
            $scope.title_sections = get_section_content($scope.dataset.name);
            $scope.abstract_sections = get_section_content($scope.dataset.description);
            $scope.sample_protocol_sections = get_section_content($scope.sample_protocol_description);
            $scope.data_protocol_sections = get_section_content($scope.data_protocol_description);
            console.error("GET error:" + enrichment_info_url);
        });
    }

    /**
     * Split the field in to multiple sentences, with synonyms or without
     */
    function split_by_enrichment_info(enrichment_info) {
        console.log(enrichment_info)
        if(enrichment_info != null && enrichment_info.accession != null){
            var titleEnrichInfo = enrichment_info.synonyms.name;
            var abstractEnrichInfo = enrichment_info.synonyms.description;
            var sampleProtocolEnrichInfo = enrichment_info.synonyms.sample_protocol;
            var dataProtocolEnrichInfo = enrichment_info.synonyms.data_protocol;

            //use the enrichment version as finnal version
            if (enrichment_info.originalAttributes.name != undefined && enrichment_info.originalAttributes.name.length >= 1) {
                $scope.dataset.name = enrichment_info.originalAttributes.name;
            }
            
            if (enrichment_info.originalAttributes.description != undefined && enrichment_info.originalAttributes.description.length >= 1) {
                $scope.dataset.description = enrichment_info.originalAttributes.description;
            }

            if (enrichment_info.originalAttributes.sample_protocol!= undefined && enrichment_info.originalAttributes.sample_protocol.length >= 1) {
                $scope.sample_protocol_description = enrichment_info.originalAttributes.sample_protocol;
            }

            if (enrichment_info.originalAttributes.data_protocol!= undefined && enrichment_info.originalAttributes.data_protocol.length >= 1) {
                $scope.data_protocol_description = enrichment_info.originalAttributes.data_protocol;
            }

        }
        $scope.title_sections = get_section($scope.dataset.name, titleEnrichInfo);
        $scope.abstract_sections = get_section($scope.dataset.description, abstractEnrichInfo);
        $scope.sample_protocol_sections = get_section($scope.sample_protocol_description, sampleProtocolEnrichInfo);
        $scope.data_protocol_sections = get_section($scope.data_protocol_description, dataProtocolEnrichInfo);

    }

    /**
     * Get the words who have synonyms or sections who do not have synonyms
     */
    function get_section_content(wholetext, section_positions) {
        var sections = [];
        if (wholetext == null || wholetext.length < 1) {
            return null;
        }
        //For the fields which have no enrichment data
        else if (section_positions == null || section_positions.length < 1) {

            //Find a space to split the whole text
            while (wholetext.substr(long_text_length, 1) != ' ' && long_text_length < wholetext.length) {
                long_text_length++;
            }

            var section = {
                "text": wholetext.substring(0, long_text_length),
                "beAnnotated": "false",
                "synonyms": null,
                "tobeReduced": 'false'
            };
            sections.push(section);

            if (wholetext.length > long_text_length) {
                section = {
                    "text": wholetext.substring(long_text_length, wholetext.length - 1),
                    "beAnnotated": "false",
                    "synonyms": null,
                    "tobeReduced": 'true'
                };
                sections.push(section);
            }
            console.log(wholetext);
            return sections;
        }


        for (var i = 0; i < section_positions.length; i++) {
            var start = section_positions[i].from;
            var end = section_positions[i].to;
            var beAnnotated = section_positions[i].beAnnotated;
            var sectionWord = wholetext.substring(start, end + 1);
            var synonyms = [];
            if (beAnnotated == "true") {
                synonyms = get_synonyms(sectionWord);
            }
            if (start > long_text_length) {
                tobeReduced = "true"
            }
            else {
                tobeReduced = "false"
            }
            var section = {
                "text": sectionWord,
                "beAnnotated": beAnnotated,
                "synonyms": synonyms,
                "tobeReduced": tobeReduced
            };
            sections.push(section);
        }
        var start = section_positions[section_positions.length - 1].to + 1; //the last section
        var beAnnotated = "false";
        var tobeReduced = "false"
        if (wholetext.length > long_text_length) {
            tobeReduced = "true"
        }
        var synonyms = [];
        var sectionWord = wholetext.substring(start, wholetext.length);
        var section = {"text": sectionWord, "beAnnotated": beAnnotated, "synonyms": synonyms, "tobeReduced": tobeReduced};
        sections.push(section);
        return sections;
    }

    /**
     * Get and store synonyms from web service
     */
    function prepare_synonyms(data) {
        if (data == null) return;
        $scope.synonymsList = data['synonymsList'];
    }


    /**
     * Get Synonyms of a word from local storage
     */
    function get_synonyms(word) {
        if ($scope.synonymsList == null || word == null) {
            return null;
        }

        word = word.toLowerCase();
        var synonyms = null;
        for (var i = 0; i < $scope.synonymsList.length; i++) {
            if (word == $scope.synonymsList[i].wordLabel) {
                synonyms = $scope.synonymsList[i].synonyms;
                break;
            }
        }

        if (synonyms == null || synonyms.length < 1)
            return null;

        //to make synonyms unique
        var unique_synonyms = [];
        for (var i = 0; i < synonyms.length; i++) {
            var synonym = synonyms[i];
            if (unique_synonyms.indexOf(synonym) < 0) {
                unique_synonyms.push(synonym);
            }
        }
        return unique_synonyms;
    }

    /**
     * Get the section in each field
     * @param enrichInfo
     * @returns {Array}
     */
    function get_section(wholetext, enrichInfo) {

        if (enrichInfo == null || wholetext == null) {
            return null;
        }
        var modifiedWholeText = wholetext.toLowerCase();
        var modifyString = "________________________________________________________________________________________________________________________________________________";
        var sections = [];
        var prevRealWordEnd = -1;

        var prevWordStart = -1;
        var prevWordEnd = -1;
        for (var i = 0; i < enrichInfo.length; i++) {
            var wordStart = enrichInfo[i].from - 1;
            var wordEnd = enrichInfo[i].to - 1;
            if(wordStart < prevWordEnd) {continue;}
            var wordText = enrichInfo[i].text;
            var realWordStart = modifiedWholeText.indexOf(wordText);
            var realWordEnd = realWordStart + wordText.length;
            var synonyms = [];
            var tobeReduced;
            
            modifiedWholeText = modifiedWholeText.substring(0,realWordStart) + modifyString.substring(0, wordText.length) + modifiedWholeText.substring(realWordEnd, modifiedWholeText.length);
            
            if(prevRealWordEnd +1 < realWordStart){
                if (realWordStart > long_text_length) {
                    tobeReduced = "true"
                }
                else {
                    tobeReduced = "false"
                }
                var section = {
                    "text": wholetext.substring(prevRealWordEnd, realWordStart-1),
                    "beAnnotated": "false",
                    "synonyms": null,
                    "tobeReduced": tobeReduced
                };
                sections.push(section); 
            }

            synonyms = get_synonyms(wordText);
            if (realWordStart > long_text_length) {
                tobeReduced = "true"
            }
            else {
                tobeReduced = "false"
            }
            var section = {
                "text": wordText,
                "beAnnotated": "true",
                "synonyms": synonyms,
                "tobeReduced": tobeReduced
            };
            sections.push(section);
            
            prevRealWordEnd = realWordEnd;
            prevWordStart = wordStart;
            prevWordEnd = wordEnd;
        }
        if(prevRealWordEnd +1 < long_text_length){
                    tobeReduced = "false"
                var section = {
                    "text": wholetext.substring(prevRealWordEnd+1, long_text_length-1),
                    "beAnnotated": "false",
                    "synonyms": null,
                    "tobeReduced": tobeReduced
                };
                sections.push(section); 
                prevRealWordEnd = long_text_length; 
        }
         if(prevRealWordEnd +1 < wholetext.length){
                    tobeReduced = "true"
                var section = {
                    "text": wholetext.substring(prevRealWordEnd+1, wholetext.length-1),
                    "beAnnotated": "false",
                    "synonyms": null,
                    "tobeReduced": tobeReduced
                };
                sections.push(section); 
            }
        return sections;
    }


    ///**
    // * for tab control
    // */
    //$scope.tabs = [{
    //    title: 'Filelist',
    //    url: 'filelist.tpl.html'
    //}, {
    //    title: 'Bioentities',
    //    url: 'bioentities.tpl.html'
    //}, {
    //    title: 'Lab Details',
    //    url: 'labdetails.tpl.html'
    //}];
    //
    //$scope.currentTab = 'filelist.tpl.html';
    //
    //$scope.onClickTab = function (tab) {
    //    $scope.currentTab = tab.url;
    //}
    //$scope.isActiveTab = function (tabUrl) {
    //    return tabUrl == $scope.currentTab;
    //}


    /**
     * For the multiple publications click
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
    if($scope.$root.enrich_button_label == null){
        $scope.$root.enrich_button_label = "Enrich";
    }
    $scope.enrich_click = function () {
        if ($scope.$root.enrich_button_label == "Enrich") {
            $scope.$root.enrich_button_label = "Enriched"
        }
        else if ($scope.$root.enrich_button_label == "Enriched") {
            $scope.$root.enrich_button_label = "Enrich"
        }
    }

    /*
     * To load more related datasets
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

    /**
     * filter the related datasets by threshold in different omics type
     */

    function FilterRelatedDatasets(){
        if($scope.related_datasets.length < 1) return;
        var FilterThresholds = {
            'Proteomics':3.1,
            'Metabolomics':3.8,
            'Genomics':6.5,
            'Transcriptomics':10.0
        }

        var temp_datasets = $scope.related_datasets;
        var index = 0;
        $scope.related_datasets = [];
        for(var i = 0; i<temp_datasets.length; i++) {
            var omics_type = temp_datasets[i]['omicsType'];
            if(omics_type instanceof Array){
                if(omics_type.toString().toLowerCase().indexOf('Transcriptomics'.toLocaleLowerCase()) > -1)
                    omics_type_value = 'Trascriptomics';
                else if(omics_type.toString().toLowerCase().indexOf('Genomics'.toLocaleLowerCase()) > -1)
                    omics_type_value = 'Genomics';
                else if(omics_type.toString().toLowerCase().indexOf('Metabolomics'.toLocaleLowerCase()) > -1)
                    omics_type_value = 'Metabolomics';
                else if(omics_type.toString().toLowerCase().indexOf('Proteomics'.toLocaleLowerCase()) > -1)
                    omics_type_value = 'Proteomics';
            }
            var threshold = FilterThresholds[omics_type_value];
            if(threshold == null)
                threshold = 3.1;
            if(temp_datasets[i]['score'] >= threshold) {
                $scope.related_datasets[index++] = temp_datasets[i];
            }
        }
    }

    /**
     * To change the value in slider by botton
     */
   var main_key = $scope.acc + "@" + tempDomainName;
    $scope.threshold_change = function (step_value) {
        $scope.threshold = ($scope.threshold * 100 + step_value * 100) / 100 * 1.00;
        $scope.threshold = $scope.threshold.toPrecision(2);

        if ($scope.threshold >= 1) {
            $scope.threshold = 1.00
            $scope.threshold = $scope.threshold.toPrecision(3);
        }
        if ($scope.threshold < 0.5) {
            $scope.threshold = 0.50
            $scope.threshold = $scope.threshold.toPrecision(2);
        }
        if($scope.biological_similarity_info != null){
            $scope.related_datasets_by_biological_limit = find_similarity_limit($scope.biological_similarity_info.scores, $scope.threshold);
            // console.log($scope.biological_similarity_info);
        }
        //$scope.related_datasets_by_biological_limit ++;

    }
   function find_similarity_limit(scores, threshold) {
            var limit = 0;
       if(scores != null){
           for (var i = 0; i < scores.length; i++) {
               var score = scores[i];
               var key1 = score.key1;
               var key2 = score.key2;
               if (score.value < threshold) {
                   continue;
               }
               if(key1 == main_key || key2 == main_key) {
                   limit++;
               }

           }
       }
       return limit;
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
    //$scope.tabs = [
    //    { title:'Dynamic Title 1', content:'Dynamic content 1' },
    //    { title:'Dynamic Title 2', content:'Dynamic content 2' }
    //];
    //
    //$scope.alertMe = function() {
    //    setTimeout(function() {
    //        $window.alert('You\'ve selected the alert tab!');
    //    });
    //};

}])
/**
 * to highlight the searching terms
 */
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

//angular.module('ddiApp')
//    .directive('ngInitial', function () {
//    return {
//        restrict: 'A',
//        controller: [
//            '$scope', '$element', '$attrs', '$parse', function ($scope, $element, $attrs, $parse) {
//                var getter, setter, val;
//                val = $attrs.ngInitial || $attrs.value;
//                getter = $parse($attrs.ngModel);
//                setter = getter.assign;
//                setter($scope, val);
//            }
//        ]
//    };
//    })
//    .derective('slider', function() {
//    return {
//        require: '?ngModel',
//        link: function(scope, elem, attrs,ngModel) {
//            if (!ngModel) return;
//            //slider settings, .noUiSlider is the method to initialize the slider
//            elem.noUiSlider({
//                //range: [0.5,1.0],
//                //start: [0.5,1.0],
//                step: 0.01,
//                connect: true
//            }).change(function(){
//                scope.$apply(function () {
//                    // update the underlying model's property when slider changes
//                    ngModel.$setViewValue(elem.val());
//                });
//                $scope.threshold_change(0.0);
//            });
//            ngModel.$render = function() {
//                //update the slider when the underlying model changes.
//                elem.val(ngModel.$viewValue || []);
//            };
//        }
//    };
//    });

