ddiApp.controller('QueryBuilderCtrl', ['$scope','$cookies','$cookieStore', function ($scope,$cookies,$cookieStore) {

    var data = '{"group": {"operator": "AND","rules": []}}';
    function htmlEntities(str) {
        return String(str).replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function computed(group) {
        if (!group) return "";
        for (var str = "(", i = 0; i < group.rules.length; i++) {
//            i > 0 && (str += " <strong>" + group.operator + "</strong> ");
            i > 0 && (str += " " + group.operator + " ");
            // str += group.rules[i].group ?
            //     computed(group.rules[i].group) :
            //     group.rules[i].field + " " + htmlEntities(group.rules[i].condition) + " " + group.rules[i].data;
            if(group.rules[i].group) {
                str += computed(group.rules[i].group);
            }
            else{
                var strtemp = "";
                if(group.rules[i].condition == 'range') {strtemp = "[\"" + group.rules[i].data + "\" TO \"" +  (group.rules[i].data2||"") + "\"]" }
                if(group.rules[i].condition == 'equal') {strtemp =  "(\"" + group.rules[i].data +"\")" }
                
                if(group.rules[i].field == 'all_fields'){
                    str += strtemp;
                }
                else{
                    str += group.rules[i].field + ": " + strtemp;
                }
                
            }
        }
        str = str.replace(/"\*\:\*"/g, "*:*");
        return str + ")";
    }

    $scope.json = null;

    $scope.filter = JSON.parse(data);

    $scope.submit_adv_query = function(){
        debugger;
        query_string = $scope.query_output;
        datarules = $scope.group_data;
        $cookieStore.put('rules',datarules);
        if((query_string.match(/\(\"\"\)/) || query_string.match(/\(\)/))){
            $scope.$parent.hideBasicInfo = true;// not going to search with empty condition: ()  or ("")
            $scope.hideBasicInfo = true;
            //alert("Sorry, can not perform the search, some input box is empty, please fill them all");
            return;
        }
        angular.element(document.getElementById('queryCtrl')).scope().meta_search(query_string);
    };
    
    $scope.$watch('filter', function (newValue) {
        $scope.json = JSON.stringify(newValue, null, 2);
        $scope.query_output = computed(newValue.group);
        $scope.group_data = newValue.group.rules;
    }, true);
}]);

var queryBuilder = angular.module('queryBuilder', ['ngCookies']);
queryBuilder.directive('queryBuilder', ['$compile','$http','$cookies','$cookieStore', function ($compile, $http,$cookies,$cookieStore) {
    return {
        restrict: 'E',
        scope: {
            group: '='
        },
        templateUrl: '/queryBuilderDirective.html',
        compile: function (element, attrs) {
            var content, directive;
            content = element.contents().remove();
            return function (scope, element, attrs) {
                
                scope.adv_show = false;
                scope.adv_show_two = false;
                debugger;
                //scope.hideBasicInfo = true;
                scope.capitalize = function capitalize(string) {
                    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
                };

                scope.operators = [
                    { name: 'AND' },
                    { name: 'OR' },
                    { name: 'NOT' }
                ];

                scope.fields = [
                    { name: 'all_fields', label:'All Fields' }
                ];
                
                var xref_fields = [
                    /*{name: 'UNIPROT', label:'UNIPROT AC/ID'},
                    {name: 'PUBMED', label:'PUBMED'},
                    {name: 'ENSEMBL', label:'ENSEMBL'},
                    {name: 'WORMGENE', label:'WORMGENE'},
                    {name: 'PUBCHEM', label:'PUBCHEM'},
                    {name: 'CHEBI', label:'CHEBI'},
                    {name: 'HMDB', label:'HMDB'},
                    {name: 'KEGG', label:'KEGG'},
                    {name: 'NCBI', label:'NCBI'},
                    {name: 'PASS', label:'PASS'},
                    {name: 'SGD', label:'SGD'}*/
                ];

                scope.conditions = [
                    { name: 'equal' }
                    // { name: 'not' },

                ];
                
                scope.fields_data = {};

                scope.cookData = {fieldValue:'',txtValue:''};
                var fields_url = web_service_url + "dataset/search?query=cancer&size=0&faceCount=20";
                debugger;
                //var fields_url = "http://wwwdev.ebi.ac.uk/ebisearch/ws/rest/pride/?query=domain_source:pride&facetcount=20&facetfields=UNIPROT&format=JSON"
                if(scope.fields.length <= 1) {
                    $http({
                        url: fields_url,
                        method: 'GET'
                    }).success(function (http_data) {
                        debugger;
                        scope.getFacets(http_data);
                        // deal_fields();
                    }).error(function () {
                        console.error("GET error:" + fields_url);
                    });
                }

                scope.getFacets = function (http_data) {
                    debugger;
                    var raw_fields_data = http_data.facets;
                    for(var i =0; i<raw_fields_data.length; i++){
                        var field_name = raw_fields_data[i].id;
                        var field_label = raw_fields_data[i].label;
                        var new_field = {name:field_name, label:field_label};
                        scope.fields.push(new_field);
                        var facets= [];
                        var rawfacet = raw_fields_data[i]['facetValues'];
                        for(var j=0; j<rawfacet.length; j++){
                            var facet = {'value':rawfacet[j]['value'], 'label':rawfacet[j]['label']};
                            facets.push(facet);
                        }
                        scope.fields_data[field_name] = facets;
                    }
                    scope.fields = scope.fields.concat(xref_fields);
                };

                debugger;
                scope.init = function () {
                    debugger;
                    if(scope.$parent.rule == undefined && $cookieStore.get('rules') != undefined)
                    {
                        scope.group.rules = $cookieStore.get('rules');
                    }
                    if(scope.$parent.rule != undefined && scope.$parent.rule.group.rules.length != undefined && scope.$parent.rule.group.rules.length > 1 ){
                        if(scope.group.rules[scope.group.rules.length -1].field == "all_fields")
                        {
                            scope.group.rules.splice(scope.group.rules.length -1,1);
                        }
                    }

                };

                scope.addCondition = function () {
                    scope.hideBasicInfo = false;
                    scope.group.rules.push({
                        condition: 'equal',
                        field: 'all_fields',
                        data: ''
                    });
                    scope.adv_show = false;
                    scope.adv_show_two = false;
                };

                scope.addCondition();

                scope.removeCondition = function (index) {
                    scope.group.rules.splice(index, 1);
                };

                scope.addGroup = function () {
                    scope.hideBasicInfo = false;
                    debugger;
                    scope.group.rules.push({
                        group: {
                            operator: 'AND',
                            rules: []
                        }
                    });
                };

                scope.isRootGroup = function () {
                    if(typeof(scope.$parent.group) == "undefined") {
                        return true;
                    }
                    else{
                        return false;}
                };

                scope.selectField = function(rule) {
                    debugger;
                    if(rule != undefined) {
                        if(rule.field == "publication_date"){
                            scope.conditions.push({ name: 'range' });
                        }
                        else if(scope.conditions.length >1 ){
                            scope.conditions.pop();
                        }
                        scope.clearData(rule);
                    }
                };

                scope.clearData = function (rule) {
                    rule.data = '';
                    rule.data2 = '';
                    scope.placeValue = '--click to input--';
                    scope.placeValue2 = '--click to input--';
                };

                scope.removeGroup = function () {
                    console.log(scope.isRootGroup());
                    "group" in scope.$parent && scope.$parent.group.rules.splice(scope.$parent.$index, 1);
                };

                scope.addRuleData = function (index, value, name, rule) {
                    debugger;
                    scope.group.rules[index]['data'] = value;
                    scope.adv_show = !scope.adv_show;
                    console.log(scope.adv_show);
                };

                scope.matchIndex = function(arr,field_name){
                   var arrIndex = 0;
                   var arrMatch= _.find(arr, function(item, index) {
                        if (item.name == field_name) {
                            arrIndex = index;
                            return index;
                        }
                    });
                    return arrIndex;
                };

                scope.saveToCookies = function(){
                    if(scope.group.rules.length > 0) {
                        var rule = scope.group.rules[0];
                        var field_name = rule.field;
                        debugger;
                        $cookieStore.put('rules',scope.group.rules);
                    }
                };

                scope.addRuleDataTwo = function (index, value, rule) {
                    scope.group.rules[index]['data2'] = value;
                    scope.adv_show_two = !scope.adv_show_two;
                };
                
                scope.submit_adv_search = function (query_string,rule){
                    debugger;
                    if(scope.group.rules != undefined) {
                        var rulesLength = scope.group.rules.length;
                        var rules = scope.group.rules;
                        var lastRule = rules[rulesLength - 1];
                        if ((rulesLength == 0) || (lastRule.data != undefined && lastRule.data == "") || (lastRule.group != undefined && lastRule.group.rules[lastRule.group.rules.length-1].data == "" ) ) {     // not going to search with empty condition: ()  or ("")
                            scope.hideBasicInfo = true;
                            //alert("Sorry, can not perform the search, some input box is empty, please fill them all");
                            return;
                        }
                        scope.saveToCookies();
                        scope.$parent.submit_adv_query();
                    }
                };

                directive || (directive = $compile(content));

                element.append(directive(scope, function ($compile) {
                    return $compile;
                }));
            }
        }
    }
}]);
