/*global angular */
'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the $firebase service
 * - exposes the model to the template and provides event handlers
 */
angular.module('jsekoApp')
  .controller('MainController', [ '$scope', '$q', 'JokeService', function MainController($scope, $q, JokeService) {

    JokeService.getJokes()
      .then(function(data) {
        //this will execute when the AJAX call completes.
        $scope.allJokes = data.jokes;
      })
      .then(function() {
        return jokeTypeList();
      });

    // JokeService.get(function(data){
    //   $scope.jokes = data.jokes;
    // });

    var jokeTypeList = function(){
      if ($scope.hasOwnProperty('jokes')){
        var uniqTypes = [];
        for (var i=0 ; i < $scope.jokes.length ; i++){
          if (uniqTypes.indexOf($scope.jokes[i].type) < 0){
            uniqTypes.push($scope.jokes[i].type);
          }
        }
        $scope.uniqTypes = uniqTypes;
        return $scope.uniqTypes;
      }
    };

    var getAnswers = function(){
    };

  }]);