/*global angular */
'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the $firebase service
 * - exposes the model to the template and provides event handlers
 */
angular.module('jsekoApp')
  .controller('MainController', [ '$scope', '$q', 'JokeService', function MainController($scope, $q, JokeService) {

    JokeService.get(function(data){
      $scope.jokes = data.jokes;
    });

    $scope.jokeTypeList = function(){
      if ($scope.hasOwnProperty('jokes')){
        var uniqTypes = [];
        for (var i=0 ; i < $scope.jokes.length ; i++){
          console.log('C');
          if (uniqTypes.indexOf($scope.jokes[i].type) < 0){
            uniqTypes.push($scope.jokes[i].type);
          }
        }
        return uniqTypes;
      }
    };
    $scope.jokeTypeList();
  }]);
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
