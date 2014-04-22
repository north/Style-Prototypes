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
    var items = ls.get('items');
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
      data: function (name) {
        var promise = $q.defer();
        $http.get('data/' + k + '.json')
          .success(function (i) {
            promise.resolve(i);
          })
          .error(function (e) {
            promise.resolve(null);
          });
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
            menu.push({
              title: 'Style Tile',
              href: '#/style-tile'
            });
            menu.push({
              title: 'Ish',
              href: '#/ish'
            });
            promise.resolve(menu);
          })
          .error(function (e) {
            var menu = [];
            menu.push({
              title: 'Style Tile',
              href: '#/style-tile'
            });
            menu.push({
              title: 'Ish',
              href: '#/ish'
            });
            promise.resolve(menu);
          });
        return promise.promise;
      }
    };
  }]);

  spFact.factory('data', ['$http', '$q', 'localStorageService', function ($http, $q, ls) {
    var components = ls.get('components');

    return {
      get: function (view) {
        var promise = $q.defer();

        $http.get('data/' + view + '.json')
          .success(function (data) {
            components = data.files;
            ls.add('components', data.files);
            promise.resolve(data.files);
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