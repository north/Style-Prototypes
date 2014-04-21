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

  spFact.factory('data', ['$http', '$q', 'localStorageService', function ($http, $q, ls) {
    var components = ls.get('components');

    return {
      get: function () {
        var promise = $q.defer();

        $http.get('data/components.json')
          .success(function (data) {
            components = data;
            ls.add('components', data);
            promise.resolve(data);
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