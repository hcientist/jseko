'use strict';
// can assign to a variable
// var jsekoApp = angular.module('jsekoApp', [ 'ui', 'ngRoute', 'ngResource'])
angular.module('jsekoApp', [ 'ui', 'ngRoute', 'rzModule', 'ngAnimate', 'wu.masonry', 'NgSwitchery', 'firebase'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/search/:srch/jokeType/:jokeType*\/answerType/:answerType*\/jokeFilter/:jokeFilter*\/answerFilter/:answerFilter*', {
        templateUrl: 'views/main.html',
        controller: 'MainController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });