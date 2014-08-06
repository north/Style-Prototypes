(function (angular) {
  'use strict';

  var spFact = angular.module('spFactories', [
    'LocalStorageModule'
  ]);

  spFact.service('GlobalSearch', function () {
    return {
      term: ''
    };
  });

  spFact.factory('sections', ['$http', '$q', 'localStorageService', function ($http, $q, ls){
    var sections = ls.get('sections');
    var menu = ls.get('menu');

    return {
      import: function () {
        var promise = $q.defer();
        var gather = [];

        $http.get('config/sections.json')
          .success(function (data) {
            sections = data;
            ls.add('sections', data);
            promise.resolve(data);
          })

        return promise.promise;
      },
      menu: function () {
        var promise = $q.defer();

        $http.get('config/menu.json')
          .success(function (menu) {
            menu.unshift({
              title: 'All',
              href: '#/'
            });
            // menu.push({
            //   title: 'Ish',
            //   href: '#/ish'
            // });
            promise.resolve(menu);
          })
          .error(function (e) {
            var menu = [];
            menu.push({
              title: 'Style Tile',
              href: '#/style-tile'
            });
            // menu.push({
            //   title: 'Ish',
            //   href: '#/ish'
            // });
            promise.resolve(menu);
          });
        return promise.promise;
      }
    };
  }]);

  spFact.factory('pages', ['$http', '$q', function ($http, $q) {
    return {
      get: function (path) {
        var promise = $q.defer();

        $http.get(path)
          .success(function (data) {
            promise.resolve(data);
          });

        return promise.promise;
      }
    };
  }]);

  spFact.factory('data', ['$http', '$q', 'localStorageService', function ($http, $q, ls) {
    var components = ls.get('components');
    var scopes = ls.get('scopes');

    return {
      get: function (view) {
        var promise = $q.defer();
        var config = 'config/files.json';

        if (view === 'pages') {
          config = 'config/pages.json';
        }

        $http.get(config)
          .success(function (data) {
            ls.add('components', data);

            components = data;

            if (view) {
              promise.resolve(components[view]);
            }
            else {
              promise.resolve(components);
            }

          });
        return promise.promise;
      },
      scope: function (view) {
        var promise = $q.defer();
        $http.get('config/scopes.json')
          .success(function (data) {
            ls.add('scopes', data);
            scopes = data;

            if (view) {
              promise.resolve(scopes[view]);
            }
            else {
              promise.resolve(scopes);
            }
          });
        return promise.promise;
      },
      find: function (item) {
        for (var i in components.files) {
          if (components.files[i].name === item) {
            // console.log(data.files[i].path);
            return components.files[i].path;
          }
        }
        return false;
      }
    };
  }]);
})(window.angular);
