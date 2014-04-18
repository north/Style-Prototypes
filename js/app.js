(function (angular, yaml) {
  'use strict';

  var sp = angular.module('StylePrototype', [
    'ngRoute',
    'LocalStorageModule'
  ]);

  sp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        template: '<div data-sp-class=\"__style-tile\"><article data-sp-class=\"__style-tile--content\" class=\"{{base.class}}\"><h1>The Farnsworth Parabox</h1><p>Whoa a real live robot; or is that some kind of <a href=\"#\">cheesy New Year\'s costume</a>? Why would a robot need to drink? Hey, tell me something. You\'ve got all this money. How come you always dress like you\'re doing your laundry? Then throw her in the laundry room, which will hereafter be referred to as \"the brig\". Large bet on myself in round one.</p><h2>A Taste of Freedom</h2><p>When I was first asked to make a film about my nephew, Hubert Farnsworth, I thought \"Why should I?\" Then later, Leela made the film. But if I did make it, you can bet there would have been more topless women on motorcycles. Roll film! Bender, hurry! This fuel\'s expensive! Also, we\'re dying! Well, thanks to the Internet, I\'m now bored with sex. Is there a place on the web that panders to my lust for violence? But existing is basically all I do! What\'s with you kids? Every other day it\'s food, food, food. Alright, I\'ll get you some stupid food. Why, those are the Grunka-Lunkas! They work here in the Slurm factory.</p><ul><li>There\'s one way and only one way to determine if an animal is intelligent. Dissect its brain!</li><li>What\'s with you kids? Every other day it\'s food, food, food. Alright, I\'ll get you some stupid food.</li><li>Bender, I didn\'t know you liked cooking. That\'s so cute.</li></ul><h3>When Aliens Attack</h3><p>There\'s one way and only one way to determine if an animal is intelligent. Dissect its brain! I never loved you. Yeah. Give a little credit to our public schools.</p><h4>Bendin\' in the Wind</h4><p>Tell them I hate them. In our darkest hour, we can stand erect, with proud upthrust bosoms. When the lights go out, it\'s nobody\'s business what goes on between two consenting adults. Well, let\'s just dump it in the sewer and say we delivered it. I don\'t \'need\' to drink. I can quit anytime I want! Oh yeah, good luck with that.</p><ol><li>And until then, I can never die?</li><li>What\'s with you kids? Every other day it\'s food, food, food. Alright, I\'ll get you some stupid food.</li><li>And until then, I can never die?</li><li>Shinier than yours, meatbag.</li></ol><h5>The Mutants Are Revolting</h5><p>No, just a regular mistake. Fry, we have a crate to deliver. And until then, I can never die? And why did \'I\' have to take a cab? Oh, I always feared he might run off like this. Why, why, why didn\'t I break his legs?</p></article><aside ng-if="tile.colors" data-sp-class=\"__style-tile--abstracts\"><h2 data-sp-class=\"section--header\">Possible Colors</h2><ul data-sp-class=\"style-tile--COLORS\"><li data-sp-class=\"style-tile--item-{{$index}}\" ng-repeat=\"n in [] | range:tile.colors\"></li></ul></aside><aside ng-if="tile.images" data-sp-class=\"__style-tile--abstracts\"><h2 data-sp-class=\"section--header\">Possible Patterns</h2><ul data-sp-class=\"style-tile--IMAGES\"><li data-sp-class=\"style-tile--item-{{$index}}\" ng-repeat=\"image in tile.images\"><img src=\"{{src}}\" alt=\"{{alt}}\" ng-repeat=\"(src, alt) in image\"></li></ul></aside><aside ng-if="tile.descriptors" data-sp-class=\"__style-tile--abstracts\"><ul data-sp-class=\"style-tile--DESCRIPTORS\"><li data-sp-class=\"style-tile--item-{{$index}}\" ng-repeat=\"descriptor in tile.descriptors\">{{descriptor}}</li></ul></aside></div>',
        controller: 'StyleTileCtrl'
      })
      .when('/components', {
        template: '<input type="search" ng-model="search" placeholder="Search"><ul><li ng-repeat="cmpt in components.files | filter:search | orderBy:\'name\'" data-sp-class="section--group"><h2 data-sp-class=\"section--header\">{{cmpt.name}}</h2><span ng-include="cmpt.path"></span></li></ul>',
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

  sp.directive('menu', function() {
    return {
      restrict: 'A',
      scope: {
        menu: '=menu',
        cls: '=ngClass'
      },
      replace: true,
      template: '<ul><li ng-repeat="item in menu" menu-item="item"></li></ul>',
      link: function(scope, element, attrs) {
        element.addClass(attrs.class);
        element.addClass(scope.cls);
      }
    };
  });

  sp.directive('menuItem', function($compile) {
    return {
      restrict: 'A',
      replace: true,
      scope: {
        item: '=menuItem'
      },
      template: '<li active-link><a href={{item.href}}>{{item.title}}</a></li>',
      link: function (scope, element, attrs) {
        if (scope.item.header) {
          element.addClass('nav-header');
          element.text(scope.item.header);
        }
        if (scope.item.divider) {
          element.addClass('divider');
          element.empty();
        }
        if (scope.item.submenu) {
          element.addClass('dropdown');

          var text = element.children('a').text();
          element.empty();
          var $a = $('<a class="dropdown-toggle">'+text+'</a>');
          element.append($a);

          var $submenu = $('<div menu="item.submenu" class="dropdown-menu"></div>');
          element.append($submenu);
        }
        if (scope.item.click) {
          element.find('a').attr('ng-click', 'item.click()');
        }
        $compile(element.contents())(scope);
      }
    };
  });

  sp.controller('StyleTileCtrl', ['$scope', '$http', function ($scope, $http) {
    $http.get('pages/style-tile.yml')
      .success(function (styleTile) {
        $scope.tile = yaml.load(styleTile);
      });
  }]);

  sp.controller('ComponentsCtrl', ['$scope', 'data', function ($scope, data) {
    $scope.menu = [
      {
        "title": "Home",
        "href": "#"
      },
      {
        "title": "About",
        "href": "about"
      },
      {
        "title": "History",
        "href": "about/history"
      },
      {
        "title": "Contact",
        "href": "contact"
      },
      {
        "title": "Other things - in a list. (Click here)",
        "submenu": [
          {
            "header": "Sample Header"
          },
          {
            "title": "Some Link",
            "href": "some/place"
          },
          {
            "title": "Another Link",
            "href": "some/other/place"
          },
          {
            "divider": "true"
          },
          {
            "header": "Header 2"
          },
          {
            "title": "Again...a link.",
            "href": "errrr"
          },
          {
            "title": "Nest Parent",
            "submenu": [
              {
                "title": "nested again",
                "href": "nested/again"
              },
              {
                "title": "me too",
                "href": "sample/place"
              }
            ]
          }
        ]
      }
    ];
    data.get().then(function (components) {
      $scope.components = components;
      $scope.search = '';



      console.log($scope.components);
      console.log($scope);

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

  sp.factory('data', ['$http', '$q', 'localStorageService', function ($http, $q, ls) {
    var components = ls.get('components');

    return {
      get: function () {
        var promise = $q.defer();

        $http.get('.data/components.json')
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

  sp.directive('component',['data', function (data) {
    // console.log(data);

    // console.log(data.find('message--error'));
      return {
        scope: {
          name: '=',
          aspect: '='
        },
        restrict: 'E',
        replace: true,
        template: '<span ng-include="getComponentUrl()"></span>',
        link: function($scope, elem, attrs) {
          data.get().then(function (components) {
            $scope.components = components;

            $scope.getComponentUrl = function() {
              console.log(elem);
              var component = attrs.name;
              // console.log(component);
              return data.find(component);
            };
          });


        }

      };
    }]);

})(window.angular, window.jsyaml);