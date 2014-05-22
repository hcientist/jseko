'use strict';

angular
  .module('jsekoApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'firebase',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
