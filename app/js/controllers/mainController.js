/*global angular */
'use strict';

angular.module('jsekoApp')
  .controller('MainController', [ '$scope', '$filter', 'JokeService', 'TypeFilter', function MainController($scope, $filter, JokeService, Type) {

    $scope.message = 'ANSWER: ';

    $scope.arrayOfViewableJokeTypes = {};
    $scope.arrayOfViewableAnswerTypes = {};

    var shuffleArray = function(array) {
      var m = array.length, t, i;

      // While there remain elements to shuffle
      while (m) {
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
      }
      return array;
    };

    var jokeTypeList = function(jokeArray){
      var uniqJokeTypes = [];
      var uniqAnswerTypes = [];
      for (var i=0 ; i < jokeArray.length ; i++){
        if (uniqJokeTypes.indexOf(jokeArray[i].type) < 0){
          uniqJokeTypes.push(jokeArray[i].type);
          $scope.arrayOfViewableJokeTypes[jokeArray[i].type] = true;
        }
        //Check if there is a joke answer type
        if(jokeArray[i].answers){
          for(var j=0 ; j < jokeArray[i].answers.length ; j++){
            if (uniqAnswerTypes.indexOf(jokeArray[i].answers[j].type) < 0){
              if(jokeArray[i].answers[j].type){
                uniqAnswerTypes.push(jokeArray[i].answers[j].type);
                $scope.arrayOfViewableAnswerTypes[jokeArray[i].answers[j].type] = true;
              }
            }
          }
        }
      }
      $scope.uniqJokeTypes = uniqJokeTypes;
      $scope.uniqAnswerTypes = uniqAnswerTypes;
      // return uniqJokeTypes;
    };

    $scope.jokeTypeClick = function(option){
      var uniqJoke = option;
      $scope.arrayOfViewableJokeTypes[uniqJoke] = !$scope.arrayOfViewableJokeTypes[uniqJoke];
    };
    $scope.answerTypeClick = function(option){
      var uniqAnswer = option;
      $scope.arrayOfViewableAnswerTypes[uniqAnswer] = !$scope.arrayOfViewableAnswerTypes[uniqAnswer];
    };

    $scope.jokeCssClasses = function(uniqJoke) {
      if ($scope.arrayOfViewableJokeTypes[uniqJoke] === true) {
        return uniqJoke.split(' ').join('-');
      } else {
        return uniqJoke.split(' ').join('-')+'-off';
      }
    };
    $scope.answerCssClasses = function(uniqAnswer) {
      if ($scope.arrayOfViewableAnswerTypes[uniqAnswer] === true) {
        return uniqAnswer.split(' ').join('-');
      } else {
        return uniqAnswer.split(' ').join('-')+'-off';
      }
    };

    JokeService.getJokes()
      .then(function(data) {
        //this will execute when the AJAX call completes.
        $scope.allJokes = data.jokes;
        shuffleArray($scope.allJokes);
      })
      .then(function() {
        jokeTypeList($scope.allJokes);
      });

    $scope.slider = {
      answerLowerBound : 1,
      answerUpperBound : 8,
      jokeLowerBound : 1,
      jokeUpperBound : 8,
      min: 1,
      max: 10
    };

    $scope.answerPCRange = function(jokeAnswer) {
      return (parseInt(jokeAnswer.pC) >= $scope.slider.answerLowerBound && parseInt(jokeAnswer.pC) <= $scope.slider.answerUpperBound);
    };
    $scope.jokePCRange = function(singleJoke) {
      return (parseInt(singleJoke.parental) >= $scope.slider.jokeLowerBound && parseInt(singleJoke.parental) <= $scope.slider.jokeUpperBound);
    };
// -> Fisher–Yates shuffle algorithm
    // $scope.JokeFilterOnController = $filter('JokeFilter')($scope);
    // $filter('JokeFilter');
    // $scope.pCFilter = $filter('JokeFilter');

  }]);