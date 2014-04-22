(function (angular, yaml) {
  'use strict';

  var sp = angular.module('StylePrototype', [
    'ngRoute',
    'spTemplates',
    'spFactories',
    'spDirectives',
    'LocalStorageModule'
  ]);

  sp.config(['$routeProvider', function ($routeProvider) {

    var $injector = angular.injector(['spTemplates']);
    var templates = $injector.get('templates');

    $routeProvider
      .when('/', {
        template: '<h1 ng-if=\"components\" data-sp-class=\"section--header\">Components</h1><ul><li ng-repeat="cmpt in components | filter:search.term | orderBy:\'id\'" data-sp-class="section--group"><h2 id="{{cmpt.id}}" data-sp-class=\"section--header\"><a href="#/?id={{cmpt.id}}">{{cmpt.name}}</a></h2><span ng-include="cmpt.path"></span></li></ul>',
        controller: 'AllCtrl'
      })
      .when('/style-tile', {
        template: templates.styletile(),
        controller: 'StyleTileCtrl'
      })
      .when('/ish', {
        template: templates.ish(),
        controller: 'IshCtrl'
      })
      .when('/:view', {
        template: templates.components(),
        controller: 'ComponentsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);

  sp.filter('range', function () {
    return function (input, total) {
      total = parseInt(total);
      for (var i = 0; i < total; i++) {
        input.push(i);
      }
      return input;
    };
  });

  sp.controller('IshCtrl', ['$scope', function ($scope) {
    $scope.url = window.location.protocol + '//' + window.location.host + '/#/?menu=false';
  }]);

  sp.controller('AllCtrl', ['$scope', '$routeParams', 'data', 'sections', 'GlobalSearch', function ($scope, $routeParams, data, GlobalSearch) {
    $scope.search = GlobalSearch;

    data.get().then(function (components) {
      var comps = [];

      if ($routeParams.id) {
        angular.forEach(components.files, function (v, k) {
          if (v.id === $routeParams.id) {
            comps.push(components.files[k]);
          }
        });
      }
      else {
        comps = components.files;
      }


      $scope.components = comps;
    });
  }]);

  sp.controller('RootCtrl', ['$scope', function ($scope) {
    $scope.menu = {};
  }]);

  sp.controller('GlobalHeader', ['$scope', '$rootScope', 'sections', 'GlobalSearch', '$location', function ($scope, $rootScope, sections, GlobalSearch, $location) {


    $scope.show = $location.$$search.menu || true;
    $scope.ish = $location.$$url === '/ish';

    // console.log($scope);

    sections.menu().then(function (menu) {
      $scope.menu = menu;
      $scope.search = GlobalSearch;
    });

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
      var location = next.split('/'),
          index = location.indexOf('#');
      if (location.length === index) {
        $scope.ish = false;
      }
      else if (location[index + 1] === 'ish') {
        $scope.ish = true;
      }
      else {
        $scope.ish = false;
      }
    });
  }]);

  sp.controller('StyleTileCtrl', ['$scope', '$http', function ($scope, $http) {
    $http.get('pages/style-tile.json')
      .success(function (styleTile) {
        $scope.tile = styleTile;
      });
  }]);

  sp.controller('ComponentsCtrl', ['$scope', 'data', '$routeParams', '$location', 'GlobalSearch', function ($scope, data, $routeParams, $location, GlobalSearch) {

    $scope.search = GlobalSearch;

    data.get($routeParams.view).then(function (components) {
      var display = [];

      if ($routeParams.id) {
        for (var j in components) {
          if (components[j].id === $routeParams.id) {
            display.push(components.files[j]);
          }
        }
      }
      else if ($routeParams.group) {
        for (var i in components) {
          if (components[i].group.indexOf($routeParams.group) === 0) {
            display.push(components[i]);
          }
        }
      }
      else {
        display = components;
      }

      $scope.components = display;

      $scope.updateId = function ($event) {
        $event.preventDefault();
        var id = $event.srcElement.getAttribute('id');
        $location.search('group', null);
        $location.search('id', id);
      };

      window.addEventListener('message',function(event) {
        if (event.origin !== window.location.protocol + '//' + window.location.host) {
          return;
        }
        console.log(event.data);
        $scope.$apply(function () {
          $scope.search = event.data;
        });
      }, false);


    });
  }]);

})(window.angular, window.jsyaml);