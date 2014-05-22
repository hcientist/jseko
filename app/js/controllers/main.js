/*global todomvc, angular, Firebase */
'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the $firebase service
 * - exposes the model to the template and provides event handlers
 */
// angular.module('jsekoApp', ['firebase', 'ngRoute'])
angular.module('jsekoApp')
  .controller('MainCtrl', function MainCtrl($scope, $firebase) {
    var url = 'https://jseko.firebaseio.com/';
    var fireRef = new Firebase(url);

    $scope.jokes = $firebase(fireRef);
  
    $scope.addJoke = function() {
      // AngularFire $add method
      $scope.jokes.$add($scope.newJoke);
      //or add   a new person manually
      // fireRef.update({name: 'Alex', age: 35});
      // $scope.newPerson = "";
    };
  })
  // .config(function($routeProvider, $locationProvider) {
  // $routeProvider
  //   .when('/Book/:bookId', {
  //     templateUrl: 'book.html',
  //     controller: 'BookController',
  //     resolve: {
  //       // I will cause a 1 second delay
  //       delay: function($q, $timeout) {
  //         var delay = $q.defer();
  //         $timeout(delay.resolve, 1000);
  //         return delay.promise;
  //       }
  //     }
  //   })
  // });
