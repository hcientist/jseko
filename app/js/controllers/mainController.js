/*global angular */
'use strict';

angular.module('jsekoApp')
  .controller('MainController', [ '$scope', '$filter', 'JokeService', function MainController($scope, $filter, JokeService) {

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

    $scope.lowerBound = 1;
    $scope.upperBound = 6;
    $scope.jokeLow = 1;
    $scope.jokeHigh = 8;
    $scope.jokeAnswerRange = function(jokeAnswer) {
      return (parseInt(jokeAnswer.pC) >= $scope.lowerBound && parseInt(jokeAnswer.pC) <= $scope.upperBound);
    };
    $scope.jokeQuestionRange = function(singleJoke) {
      return (parseInt(singleJoke.parental) >= $scope.jokeLow && parseInt(singleJoke.parental) <= $scope.jokeHigh);
    };

    // $scope.JokeFilterOnController = $filter('JokeFilter')($scope);
    // $filter('JokeFilter');
    // $scope.pCFilter = $filter('JokeFilter');

  }]);