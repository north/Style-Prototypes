(function (angular, yaml) {
  'use strict';

  var sp = angular.module('StylePrototype', [
    'ngRoute',
    'spTemplates',
    'spFactories',
    'spDirectives',
    'LocalStorageModule'
  ]);

  //////////////////////////////
  // Route Configuration
  //////////////////////////////
  sp.config(['$routeProvider', function ($routeProvider) {

    var $injector = angular.injector(['spTemplates']);
    var templates = $injector.get('templates');

    $routeProvider
      .when('/', {
        template: templates.all(),
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


  //////////////////////////////
  // Global Header Controller
  //////////////////////////////
  sp.controller('GlobalHeader', ['$scope', '$rootScope', 'sections', 'GlobalSearch', '$location', function ($scope, $rootScope, sections, GlobalSearch, $location) {

    $scope.show = $location.$$search.menu || true;
    $scope.ish = $location.$$url === '/ish';

    // console.log($scope);

    sections.menu().then(function (menu) {
      $scope.menu = menu;
      $scope.StylePrototypeSearch = GlobalSearch;
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

  //////////////////////////////
  // All View Controller
  //////////////////////////////
  sp.controller('AllCtrl', ['$scope', '$routeParams', 'data', 'GlobalSearch', function ($scope, $routeParams, data, GlobalSearch) {
    $scope.StylePrototypeSearch = GlobalSearch;

    //////////////////////////////
    // Set Scope
    //////////////////////////////
    data.scope().then(function (scope) {
      if (scope) {
        for (var i in scope) {
          $scope[i] = scope[i];
        }
      }
      console.log($scope);
    });

    //////////////////////////////
    // Set Components
    //////////////////////////////
    data.get().then(function (components) {
      var comps = {};

      angular.forEach(components, function (v, k) {
        v.forEach(function (c) {
          if (c.id === $routeParams.id) {
            if (typeof(comps[k]) !== 'array') {
              comps[k] = [];
            }
            comps[k].push(c);
          }
        });
      });

      if (Object.keys(comps).length === 0) {
        comps = components;
      }

      $scope.StylePrototypeComponents = comps;
    });
  }]);

  //////////////////////////////
  // Individual Component Controller
  //////////////////////////////
  sp.controller('ComponentsCtrl', ['$scope', 'data', '$routeParams', '$location', 'GlobalSearch', function ($scope, data, $routeParams, $location, GlobalSearch) {

    $scope.StylePrototypeSearch = GlobalSearch;

    //////////////////////////////
    // Set Scope
    //////////////////////////////
    data.scope($routeParams.view).then(function (scope) {
      if (scope) {
        $scope[$routeParams.view] = scope;
      }
    });

    //////////////////////////////
    // Set Components
    //////////////////////////////
    data.get($routeParams.view).then(function (components) {
      var display = [];

      if ($routeParams.id) {
        for (var j in components) {
          if (components[j].id === $routeParams.id) {
            display.push(components[j]);
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

      $scope.StylePrototypeComponents = display;

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
          $scope.StylePrototypeSearch = event.data;
        });
      }, false);
    });
  }]);

  //////////////////////////////
  // Style Tile Controller
  //////////////////////////////
  sp.controller('StyleTileCtrl', ['$scope', '$http', function ($scope, $http) {
    $http.get('pages/style-tile.json')
      .success(function (styleTile) {
        $scope.StylePrototypeStyleTile = styleTile;
      });
  }]);

  //////////////////////////////
  // Ish Controller
  //////////////////////////////
  sp.controller('IshCtrl', ['$scope', function ($scope) {
    $scope.url = window.location.protocol + '//' + window.location.host + '/#/?menu=false';
  }]);

})(window.angular);