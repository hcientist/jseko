/*global angular */
'use strict';

angular.module('jsekoApp')
  .controller('MainController', [ '$scope', 'JokeService', function MainController($scope, JokeService) {

    $scope.Filter = {};

    var jokeTypeList = function(){
      if ($scope.hasOwnProperty('allJokes')){
        var uniqTypes = [];
        for (var i=0 ; i < $scope.allJokes.length ; i++){
          if (uniqTypes.indexOf($scope.allJokes[i].type) < 0){
            uniqTypes.push($scope.allJokes[i].type);
            $scope.Filter[$scope.allJokes[i].type] = true;
          }
        }
        $scope.uniqTypes = uniqTypes;
        return uniqTypes;
      }
    };

    JokeService.getJokes()
      .then(function(data) {
        //this will execute when the AJAX call completes.
        $scope.allJokes = data.jokes;
      })
      .then(function() {
        return jokeTypeList();
      });

  }]);