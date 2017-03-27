<div id="" class="container" style="margin:0px;background-color: #0099cc;">

    <!-- local-search -->
    <%--<div id="ddi-local-masthead" class="row">
        <!-- local-title -->
        <!-- NB: for additional title style patterns, see http://frontier.ebi.ac.uk/web/style/patterns -->
        <div class="grid_12 alpha logo-title col-md-6 col-sm-12 col-xs-12" id="local-title">
            <a href="/" title="OmicsDI Homepage"><img src="static/images/logo/OmicsDI-icon-3.png" alt="logo" width="64"
                                                      height="64"></a>
            <span><h1><a href="/" title="OmicsDI Homepage" alt="OmicsDI Homepage">Omics Discovery Index</a></h1></span>
        </div>
        <!-- /local-title -->

        <!-- NB: if you do not have a local-search, delete the following div, and drop the class="grid_12 alpha" class from local-title above -->
        <!-- /local-search -->
        <div class="col-md-4 col-sm-10 col-xs-12" ng-hide="show_top_search" style="height:120px; float:right; margin-top:0px; z-index:1; width:45%">
        </div>

        <div ng-controller="QueryCtrl" id="queryCtrl" class="col-md-6 col-sm-12 col-xs-12" ng-show="show_top_search"
             style="height:105px; float:right; margin-top:0px; z-index:1; ">
            <form novalidate name="queryForm" class="local-search" ng-submit="submit_query()">
                <fieldset>
                    <div class="form-group " ng-class="(query.submitted && queryForm.$invalid) ? 'has-error' : ''">
                        <div class="input-group ">
                            <autocomplete ng-model="query.text"
                                          attr-placeholder="organism, repository, gene, tissue, accession"
                                          click-activation="false" data="words" on-type="get_suggestions"
                                          on-select="do_query"></autocomplete>
                            <div class="input-group-btn">
                                <button type="button" class="btn btn-primary ddi-btn" ng-click="showOrHideAdv()">
                                    <i class="fa fa-caret-down" aria-hidden="true" ng-if="facaret"></i>
                                    <i class="fa fa-caret-up" aria-hidden="true" ng-if="!facaret"></i>
                                    Advanced
                                </button>
                                <button type="submit" ng-disab class="btn btn-primary ddi-btn">
                                    <i class="fa fa-search"></i> Search
                                </button>
                            </div>
                            <!-- /input-group-btn -->
                        </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         </span>
                    </div>
                    <!-- /form-group -->
                </fieldset>
            </form>

            <div class="query-bulider-box" ng-if="popup.open" style="margin-left: 9px;margin-right: 9px;margin-top: -13px;background-color: #FFFFFF; box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.07);">
                <div ng-controller="QueryBuilderCtrl">
                    <!--        <h1>Angular.js Query Builder</h1>  -->
                    <form novalidate name="queryForm" class="local-search">
                        <fieldset style="background-color:#FFFFFF">
                            <div class="alert alert-info">
                                <div style="position: relative;">
                                    <strong>Query preview</strong>
                                    <button id = "adv_search_button"  type="submit" class="btn btn-primary" style="padding:3px 6px;float: right;" ng-click="submit_adv_query()">
                                        <i class="fa fa-search" style="font-size: 30px"></i>
                                    </button>
                                </div>
                                <span ng-bind-html="query_output"></span>
                            </div>

                            <query-builder group="filter.group"></query-builder>
                        </fieldset>
                    </form>
                </div>
            </div>

        </div>
    </div>--%>

    <div id="local-masthead" class="masthead row" style="margin-left:-15px;margin-right:-15px;margin-top: 15px">
        <!-- local-nav -->
        <nav style="float:bottom" class="col-md-12 col-sm-12 col-xs-12">

            <ul class="" id="local-nav">
                <li class=" first" id="home-image">
                <div>
                    <a href="/" title="OmicsDI Homepage"><img src ="static/images/logo/imageedit_2_3220380406.png" alt="logo" style="padding-bottom: 8px;width: 41.848px;height: 28px;padding-right: 0px;padding-left: 20px;padding-right: 0px;padding-top: 1px;"></a>
                </div></li>
                <li class="" id="home-menu"><a title="Home" href="/" alt="Home">Home</a></li>
                <li class="" id="browse-menu"><a title="Browse" href="/search?q=*:*" alt="Browse">Browse</a></li>
                <li class="" id="api-menu">
                    <a title="OmicsDI API" href="http://www.omicsdi.org/ws" alt="API">API</a>
                </li>
                <li class="" id="about-prider-menu">
                    <a title="Databases" href="/databases" alt="Databases">Databases</a>
                </li>
                <li dropdown>
                    <a href="#" dropdown-toggle>Help <b class="caret"></b></a>
                    <ul class="dropdown-menu">
                        <li><a href="http://blog.omicsdi.org/" alt="Help">Omics Help</a></li>
                        <li><a href="/about" alt="About">About Omicsdi</a></li>
                        <li><a data-icon="\" class="icon icon-static" href="http://www.ebi.ac.uk/support/index.php?query=omicsdi" alt="Feedback">Feedback</a></li>
                    </ul>
                </li>
                <li class="col-md-6 col-sm-12 col-xs-12 functional">
                    <%--<div class="col-md-4 col-sm-10 col-xs-12" ng-hide="show_top_search" style="height:120px; float:right; margin-top:0px; z-index:1; width:45%">
                    </div>--%>

                    <div ng-controller="QueryCtrl" id="queryCtrl" ng-show="show_top_search"
                         style="height: 29px;float:right;margin-top:0px;z-index:1;">
                        <form novalidate name="queryForm" class="local-search" ng-submit="submit_query()">
                            <%--<fieldset>--%>
                                <div class="form-group " ng-class="(query.submitted && queryForm.$invalid) ? 'has-error' : ''">
                                    <div class="input-group ">
                                        <autocomplete ng-model="query.text"
                                                      attr-placeholder="organism, repository, gene, tissue, accession"
                                                      click-activation="false" data="words" on-type="get_suggestions"
                                                      on-select="do_query"></autocomplete>
                                        <div class="input-group-btn">
                                            <button type="button" class="btn btn-primary ddi-btn" ng-click="showOrHideAdv()">
                                                <i class="fa fa-caret-down" aria-hidden="true" ng-if="facaret"></i>
                                                <i class="fa fa-caret-up" aria-hidden="true" ng-if="!facaret"></i>
                                                Advanced
                                            </button>
                                            <button type="submit" ng-disab class="btn btn-primary ddi-btn">
                                                <i class="fa fa-search"></i> Search
                                            </button>
                                        </div>
                                        <!-- /input-group-btn -->
                                    </div>
                                    </span>
                                </div>
                                <!-- /form-group -->
                           <%-- </fieldset>--%>
                        </form>

                        <div class="query-bulider-box" ng-if="popup.open" style="margin-left: 9px;margin-right: 9px;margin-top: -13px;background-color: #FFFFFF; box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.07);">
                            <div ng-controller="QueryBuilderCtrl">
                                <!--        <h1>Angular.js Query Builder</h1>  -->
                                <form novalidate name="queryForm" class="local-search">
                                    <fieldset style="background-color:#FFFFFF;position: relative; z-index: 1">
                                        <div class="alert alert-info">
                                            <div style="position: relative;">
                                                <strong>Query preview</strong>
                                                <button id = "adv_search_button"  type="submit" class="btn btn-primary" style="padding:3px 6px;float: right;" ng-click="submit_adv_query()">
                                                    <i class="fa fa-search" style="font-size: 30px"></i>
                                                </button>
                                            </div>
                                            <span ng-bind-html="query_output"></span>
                                        </div>

                                        <query-builder group="filter.group"></query-builder>
                                    </fieldset>
                                </form>
                            </div>
                        </div>
                    </div>
                </li>


<%--                <li class="functional last">
                    <a data-icon="\" class="icon icon-static"
                       href="http://www.ebi.ac.uk/support/index.php?query=omicsdi" alt="Feedback">Feedback</a>
                </li>
                <li class="functional"><a class="" href="/about" alt="About">About</a></li>
                <li class="functional"><a class="" href="http://blog.omicsdi.org/" alt="Help">Help</a></li>--%>
                <%--<li class="">
                &lt;%&ndash;<div class="col-md-4 col-sm-10 col-xs-12" ng-hide="show_top_search" style="height:120px; float:right; margin-top:0px; z-index:1; width:45%">
                </div>&ndash;%&gt;

                <div ng-controller="QueryCtrl" id="queryCtrl" class="col-md-6 col-sm-12 col-xs-12" ng-show="show_top_search"
                     style="height:105px; float:right; margin-top:0px; z-index:1; ">
                    <form novalidate name="queryForm" class="local-search" ng-submit="submit_query()">
                        <fieldset>
                            <div class="form-group " ng-class="(query.submitted && queryForm.$invalid) ? 'has-error' : ''">
                                <div class="input-group ">
                                    <autocomplete ng-model="query.text"
                                                  attr-placeholder="organism, repository, gene, tissue, accession"
                                                  click-activation="false" data="words" on-type="get_suggestions"
                                                  on-select="do_query"></autocomplete>
                                    <div class="input-group-btn">
                                        <button type="button" class="btn btn-primary ddi-btn" ng-click="showOrHideAdv()">
                                            <i class="fa fa-caret-down" aria-hidden="true" ng-if="facaret"></i>
                                            <i class="fa fa-caret-up" aria-hidden="true" ng-if="!facaret"></i>
                                            Advanced
                                        </button>
                                        <button type="submit" ng-disab class="btn btn-primary ddi-btn">
                                            <i class="fa fa-search"></i> Search
                                        </button>
                                    </div>
                                    <!-- /input-group-btn -->
                                </div>
                                </span>
                            </div>
                            <!-- /form-group -->
                        </fieldset>
                    </form>

                    <div class="query-bulider-box" ng-if="popup.open" style="margin-left: 9px;margin-right: 9px;margin-top: -13px;background-color: #FFFFFF; box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.07);">
                        <div ng-controller="QueryBuilderCtrl">
                            <!--        <h1>Angular.js Query Builder</h1>  -->
                            <form novalidate name="queryForm" class="local-search">
                                <fieldset style="background-color:#FFFFFF">
                                    <div class="alert alert-info">
                                        <div style="position: relative;">
                                            <strong>Query preview</strong>
                                            <button id = "adv_search_button"  type="submit" class="btn btn-primary" style="padding:3px 6px;float: right;" ng-click="submit_adv_query()">
                                                <i class="fa fa-search" style="font-size: 30px"></i>
                                            </button>
                                        </div>
                                        <span ng-bind-html="query_output"></span>
                                    </div>

                                    <query-builder group="filter.group"></query-builder>
                                </fieldset>
                            </form>
                        </div>
                    </div>

                </div>
                </li>--%>

            </ul>
        </nav>
    </div>
    <!-- /local-nav -->


    <script type="text/ng-template" id="/queryBuilderDirective.html">
        <div class="alert alert-warning alert-group" ng-init="init()" style="position: relative; z-index: 1">
            <div class="form-inline" style="position: relative;">
                <select ng-options="o.name as o.name for o in operators" ng-model="group.operator" class="form-control input-sm"></select>
                <button style="margin-left: 5px" ng-click="addCondition()" class="btn btn-sm btn-success"><i class="fa fa-plus" aria-hidden="true"></i> Add Field</button>
                <button style="margin-left: 5px" ng-click="addGroup()" class="btn btn-sm btn-success"><i class="fa fa-plus" aria-hidden="true"></i> Add Group</button>
                <button style="margin-left: 5px" ng-click="removeGroup()" class="btn btn-sm btn-danger" ng-hide="isRootGroup()"><i class="fa fa-minus" aria-hidden="true"></i> Remove Group</button>
<%--                <button type="submit" class="btn btn-primary" style="margin-left: 5px; padding:3px 6px; width:85px" ng-click="submit_adv_search()">
                    <i class="fa fa-search" style="font-size: 20px"></i>
                </button>--%>
            </div>
            <div ng-if="hideBasicInfo">
                <label>"Sorry, can not perform the search either there is no field or data is empty."</label>
            </div>
            <div class="group-conditions">
                <div ng-repeat="rule in group.rules | orderBy:'index'" class="condition" ng-init="ruleIndex = $index">
                    <div ng-switch="rule.hasOwnProperty('group')">
                        <div ng-switch-when="true">
                            <query-builder group="rule.group"></query-builder>
                        </div>
                        <div ng-switch-default="ng-switch-default">
                            <div class="form-inline" style="margin-top:3px">
                                <select ng-options="field.name as field.label for field in fields" ng-model="rule.field" class="form-control input-sm" ng-click="selectField(rule)" ></select>
                                <select style="margin-left: 3px" ng-options="condition.name as condition.name for condition in conditions" ng-model="rule.condition" ng-click="placeValue2='--click to input--'; rule.data2='';rule.data=''; placeValue='--click to input--'" class="form-control input-sm"></select>
                                <div class="input-group" style="margin-left:3px;">
                                    <input ng-model="rule.data" type="text" class="form-control" placeholder={{placeValue}} ng-focus="adv_show=true" ng-blur="adv_show=false">
                                        <div ng-if="adv_show" class="adv-dropdown-menu" style="width:100%">
                                            <ul class="list-unstyled metasearch-facet-values">
                                                <li ng-mousedown="addRuleData(ruleIndex, facet.value,facet.label,rule)" class="metasearch-facet-link" ng-repeat="facet in fields_data[rule.field] | filter:rule.data">{{facet.label}}</li>
                                            </ul>
                                        </div>
                                </div>
                                <div ng-if="rule.condition=='range'" class="input-group" style="margin-left:3px;">
                                    <input ng-model="rule.data2" type="text" class="form-control" placeholder={{placeValue2}} ng-focus="adv_show_two=true" ng-blur="adv_show_two=false">
                                        <div ng-if="adv_show_two" class="adv-dropdown-menu" style="width:100%">
                                            <ul class="list-unstyled metasearch-facet-values">
                                                <li ng-mousedown="addRuleDataTwo(ruleIndex, facet.value,rule)" class="metasearch-facet-link" ng-repeat="facet in fields_data[rule.field] | filter:rule.data2">{{facet.label}}</li>
                                            </ul>
                                        </div>
                                </div>
                                <button style="margin-left: 5px" ng-click="removeCondition($index)" class="btn btn-sm btn-danger"><i class="fa fa-minus" aria-hidden="true"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </script>




</div>
