'use strict';
// can assign to a variable
// var jsekoApp = angular.module('jsekoApp', [ 'ui', 'ngRoute', 'ngResource'])
angular.module('jsekoApp', [ 'ui', 'ngRoute', 'rzModule', 'ngAnimate', 'wu.masonry'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainController'
        // resolve: {
        //   jsekoApp: mainController.getJokes
        // }
      })
      .otherwise({
        redirectTo: '/'
      });
  });