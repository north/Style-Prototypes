(function (angular, yaml) {
  'use strict';

  var sp = angular.module('StylePrototype', []);

  sp.controller('spYamlRead', ['$http', '$scope', function($http, $scope) {
    $http.get('pages/page.yml')
      .success(function (data) {
        console.log(yaml.load(data));
        $scope.data = data;
        // $scope.component = {name: 'message', aspect: 'error'};
      });
  }]);

  sp.directive('component', function () {

      // Runs during compile
      return {
        scope: {
          name: '=',
          aspect: '='
        },
        restrict: 'E',
        replace: true,
        template: '<span ng-include="getComponentUrl()"></span>',
        link: function($scope, elem, attrs, controller) {
          $scope.getComponentUrl = function() {
            var component = 'components/' + attrs.name + '--' + attrs.aspect + '.html';
            return component;
          }
        }

      };
    });



})(window.angular, window.jsyaml);