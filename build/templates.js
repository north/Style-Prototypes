(function (angular) {
  'use strict';

  var spTemplates = angular.module('spTemplates', [

  ]);

  spTemplates.factory('templates', function (){
    return {
      all: function () {
        return '<div ng-repeat="(StylePrototypeSection, StylePrototypeItem) in StylePrototypeComponents"><h1 data-sp-class="section--header"><a data-sp-class="deeplink" href="#/{{StylePrototypeSection}}">{{StylePrototypeSection}}</a></h1><ul><li ng-repeat="StylePrototypeCmpt in StylePrototypeItem  | filter:StylePrototypeSearch.term | orderBy:\'id\'" data-sp-class="section--group"><h2 id="{{StylePrototypeCmpt.id}}" data-sp-class=\"section--header\"><a href="#/?id={{StylePrototypeCmpt.id}}" data-sp-class="deeplink" data-sp-name="{{StylePrototypeCmpt.name}}">{{StylePrototypeCmpt.title}}</a><div data-source data-html="{{StylePrototypeCmpt.path}}"></div></h2><span ng-include="StylePrototypeCmpt.path"></span></li></ul></div>';
      },
      components: function () {
        return '<ul><li ng-repeat="StylePrototypeCmpt in StylePrototypeComponents | filter:StylePrototypeSearch.term | orderBy:\'id\'" data-sp-class="section--group"><h2 id="{{StylePrototypeCmpt.id}}" data-sp-class=\"section--header\"><a data-sp-class="deeplink" id="{{StylePrototypeCmpt.id}}" href="#/?id={{StylePrototypeCmpt.id}}" ng-click="updateId($event)" data-sp-name="{{StylePrototypeCmpt.name}}">{{StylePrototypeCmpt.title}}</a><div data-source data-html="{{StylePrototypeCmpt.path}}"></div></h2><span ng-include="StylePrototypeCmpt.path"></span></li></ul>';
      },
      pages: function () {
        return '<span ng-repeat="StylePrototypeInclude in StylePrototypeIncludes" ng-include="StylePrototypeInclude"></span>';
      },
      ish: function () {
        return '<div data-sp-id="viewport"><div data-sp-id="viewport--cover"></div><div data-sp-id="viewport--container"><iframe data-sp-id="viewport--window" src="{{url}}"></iframe><div data-sp-id="viewport--resize"><div data-sp-id="viewport--resize-handle"></div></div></div></div>';
      }
    };
  });
})(window.angular);
