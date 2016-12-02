ddiApp.controller('QueryBuilderCtrl', ['$scope', function ($scope ) {
    
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
                if(group.rules[i].condition == 'range') {strtemp = "[" + group.rules[i].data + " TO " +  (group.rules[i].data2||"") + "]" }
                if(group.rules[i].condition == 'equal') {strtemp =  "(" + group.rules[i].data +")" }
                
                if(group.rules[i].field == 'all_fields'){
                    str += strtemp;
                }
                else{
                    str += group.rules[i].field + ": " + strtemp;
                }
                
            }
        }

        return str + ")";
    }

    $scope.json = null;

    $scope.filter = JSON.parse(data);

    $scope.$watch('filter', function (newValue) {
        $scope.json = JSON.stringify(newValue, null, 2);
        $scope.query_output = computed(newValue.group);
    }, true);
}]);

var queryBuilder = angular.module('queryBuilder', []);
queryBuilder.directive('queryBuilder', ['$compile','$http', function ($compile, $http) {

    
    
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
                
                scope.operators = [
                    { name: 'AND' },
                    { name: 'OR' },
                    { name: 'NOT' }
                ];

                scope.fields = [
                    { name: 'all_fields', label:'All Fields' }
                ];

                scope.conditions = [
                    { name: 'equal' },
                    { name: 'not' },
                    { name: 'range' }
                ];
                
                scope.fields_data = {};
                var fields_url = "http://www.omicsdi.org/ws/dataset/search?query=cancer&size=0&faceCount=20";
                if(scope.fields.length <= 1) {
                    $http({
                        url: fields_url,
                        method: 'GET'
                    }).success(function (http_data) {
                        
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
                        // deal_fields();
                    }).error(function () {
                        console.error("GET error:" + fields_url);
                    });
                }
                console.log(scope.fields_data);

                scope.addCondition = function () {
                    scope.group.rules.push({
                        condition: 'equal',
                        field: 'all_fields',
                        data: ''
                    });
                    scope.adv_show = false;
                    scope.adv_show_two = false;
                };

                scope.removeCondition = function (index) {
                    scope.group.rules.splice(index, 1);
                };

                scope.addGroup = function () {
                    scope.group.rules.push({
                        group: {
                            operator: 'AND',
                            rules: []
                        }
                    });
                };

                scope.removeGroup = function () {
                    "group" in scope.$parent && scope.$parent.group.rules.splice(scope.$parent.$index, 1);
                };

                scope.addRuleData = function (index, value) {
                    scope.group.rules[index]['data'] = value;
                    scope.adv_show = !scope.adv_show;
                    console.log(scope.adv_show);
                }

                scope.addRuleDataTwo = function (index, value) {
                    scope.group.rules[index]['data2'] = value;
                    scope.adv_show_two = !scope.adv_show_two;
                }

                directive || (directive = $compile(content));

                element.append(directive(scope, function ($compile) {
                    return $compile;
                }));
            }
        }
    }
}]);
