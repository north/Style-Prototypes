(function (angular) {
  'use strict';

  function dcl () {
    var dcl = document.createEvent('Event');
    dcl.initEvent('DOMContentLoaded', true, true);
    window.document.dispatchEvent(dcl);
  }

  function extend (target, source) {
    target = target || {};
    for (var prop in source) {
      if (typeof source[prop] === 'object') {
        target[prop] = extend(target[prop], source[prop]);
      } else {
        target[prop] = source[prop];
      }
    }
    return target;
  }

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
      .when('/pages', {
        template: templates.pages(),
        controller: 'PagesCtrl'
      })
      .when('/:view', {
        template: templates.components(),
        controller: 'ComponentsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);

  //////////////////////////////
  // Range filter for doing for loops
  // From http://stackoverflow.com/questions/11873570/angularjs-for-loop-with-numbers-ranges
  //////////////////////////////
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
  sp.controller('GlobalHeader', ['$scope', '$rootScope', '$timeout', 'sections', 'GlobalSearch', '$location', function ($scope, $rootScope, $timeout, sections, GlobalSearch, $location) {

    $scope.show = $location.$$search.menu || true;
    $scope.ish = $location.$$url === '/ish';

    // console.log($scope);

    sections.menu().then(function (menu) {
      $scope.menu = menu;
      $scope.StylePrototypeSearch = GlobalSearch;
    });

    $timeout(function () {
      if ('complete' === document.readyState) {
        dcl();
      }
    }, 1000);

    $scope.$watch('StylePrototypeSearch.term', function () {
      $timeout(function () {
        if ('complete' === document.readyState) {
          dcl();
        }
      }, 10);
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

    $rootScope.$on('$routeChangeSuccess', function () {
      $timeout(function () {
        if ('complete' === document.readyState) {
          dcl();
        }
      }, 1000);
    })
  }]);

  //////////////////////////////
  // All View Controller
  //////////////////////////////
  sp.controller('AllCtrl', ['$scope', '$routeParams', 'data', 'GlobalSearch', function ($scope, $routeParams, data, GlobalSearch) {
    $scope.StylePrototypeSearch = GlobalSearch;

    //////////////////////////////
    // Set Components
    //////////////////////////////
    data.get().then(function (components) {
      var comps = {};

      angular.forEach(components, function (v, k) {
        if (k !== 'pages') {
          v.forEach(function (c) {
            if (c.id === $routeParams.id) {
              if (typeof(comps[k]) !== 'array') {
                comps[k] = [];
              }
              comps[k].push(c);
            }
          });
        }
      });

      if (Object.keys(comps).length === 0) {
        comps = components;
        delete comps.pages;
      }

      //////////////////////////////
      // Set Scope
      //////////////////////////////
      data.scope().then(function (scope) {
        console.log(scope);
        if (scope) {
          for (var i in scope) {
            $scope[i] = scope[i];
          }
        }

        $scope.StylePrototypeComponents = comps;
      });
    });
  }]);

  //////////////////////////////
  // Pages Controller
  //////////////////////////////
  sp.controller('PagesCtrl', ['$scope', 'data', 'pages',  '$routeParams', '$location', 'GlobalSearch', function ($scope, data, pages, $routeParams, $location, GlobalSearch) {

    $scope.StylePrototypeSearch = GlobalSearch;

    //////////////////////////////
    // Set Page
    //////////////////////////////
    data.get('pages').then(function (allPages) {
      var display = [];

      if ($routeParams.id) {
        for (var j in allPages) {
          if (allPages[j].id === $routeParams.id) {
            display.push(allPages[j]);
          }
        }
      }
      else {
        display = allPages;
      }

      //////////////////////////////
      // Load the Page
      //////////////////////////////
      pages.get(display[0].path).then(function (page) {
        console.log(page);
        //////////////////////////////
        // Set Scope
        //////////////////////////////
        data.scope().then(function (scope) {
          angular.forEach(scope, function (v, k) {
            $scope[k] = v;
          });

          angular.forEach(page.overrides, function (v, k) {
            $scope[k] = v;
          });
        });

        //////////////////////////////
        // Set Includes
        //////////////////////////////
        data.get().then(function (components) {
          var includes = [];

          page.includes.forEach(function (v) {
            if (v.include) {
              includes.push('demos/pages/' + v.include);
            }
            else {
              var component = null;
              if (components[v.source]) {
                components[v.source].forEach(function (c) {
                  if (c.name === v.name) {
                    includes.push(c.path);
                  }
                });
              }
            }
          });

          $scope.StylePrototypeIncludes = includes;
        });

      });
    });
  }]);

  //////////////////////////////
  // Individual Component Controller
  //////////////////////////////
  sp.controller('ComponentsCtrl', ['$scope', 'data', '$routeParams', '$location', 'GlobalSearch', function ($scope, data, $routeParams, $location, GlobalSearch) {

    $scope.StylePrototypeSearch = GlobalSearch;

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

      //////////////////////////////
      // Set Scope
      //////////////////////////////
      data.scope().then(function (scope) {
        if (scope) {
          for (var i in scope) {
            $scope[i] = scope[i];
          }
        }

        $scope.updateId = function ($event) {
          $event.preventDefault();
          var id = $event.srcElement.getAttribute('id');
          $location.search('group', null);
          $location.search('id', id);
        };
      })
      .then(function () {
        $scope.StylePrototypeComponents = display;
      });
    });
  }]);

  //////////////////////////////
  // Style Tile Controller
  //////////////////////////////
  sp.controller('StyleTileCtrl', ['$scope', '$http', function ($scope, $http) {
    $http.get('config/style-tile.json')
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
