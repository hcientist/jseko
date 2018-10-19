'use strict';
// can assign to a variable
// var jsekoApp = angular.module('jsekoApp', [ 'ui', 'ngRoute', 'ngResource'])
angular.module('jsekoApp', [ 'ui', 'ngRoute', 'rzModule', 'ngAnimate', 'wu.masonry', 'NgSwitchery'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      // http://localhost:9000/#/?srch=gator&jokeType=One%20Liner,Riddle&answerType=text&jokeFilter=1,10&answerFilter=1,9
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainController',
        reloadOnSearch: false
      })
      .otherwise({
        redirectTo: '/'
      });

    // $locationProvider.html5Mode(true);
  }]);