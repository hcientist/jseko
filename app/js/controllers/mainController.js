/*global angular */
'use strict';

angular.module('jsekoApp')
  .controller('MainController', [ '$scope', '$filter', 'JokeService', function MainController($scope, $filter, JokeService) {

    $scope.message = 'ANSWER: ';

    $scope.JokeTypeFilter = {};
    $scope.AnswerTypeFilter = {};

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
          $scope.JokeTypeFilter[jokeArray[i].type] = true;
        }
        //Check if there is a joke answer type
        if(jokeArray[i].answers){
          for(var j=0 ; j < jokeArray[i].answers.length ; j++){
            if (uniqAnswerTypes.indexOf(jokeArray[i].answers[j].type) < 0){
              if(jokeArray[i].answers[j].type){
                uniqAnswerTypes.push(jokeArray[i].answers[j].type);
                $scope.AnswerTypeFilter[jokeArray[i].answers[j].type] = true;
              }
            }
          }
        }
      }
      $scope.uniqJokeTypes = uniqJokeTypes;
      $scope.uniqAnswerTypes = uniqAnswerTypes;
      return uniqJokeTypes;
    };

    $scope.jokeTypeClick = function($event){
      var uniqJoke = $event;
      $scope.JokeTypeFilter[uniqJoke] = !$scope.JokeTypeFilter[uniqJoke];
    };
    $scope.answerTypeClick = function($event){
      var uniqAnswer = $event;
      $scope.AnswerTypeFilter[uniqAnswer] = !$scope.AnswerTypeFilter[uniqAnswer];
    };

    $scope.jokeCssClasses = function(uniqJoke) {
      if ($scope.JokeTypeFilter[uniqJoke] === true) {
        return uniqJoke.split(' ').join('-');
      } else {
        return uniqJoke.split(' ').join('-')+'-off';
      }
    };
    $scope.answerCssClasses = function(uniqAnswer) {
      if ($scope.AnswerTypeFilter[uniqAnswer] === true) {
        return uniqAnswer.split(' ').join('-');
      } else {
        return uniqAnswer.split(' ').join('-')+'-off';
      }
    };

    JokeService.getJokes()
      .then(function(data) {
        //this will execute when the AJAX call completes.
        $scope.allJokes = data.jokes;
        $scope.shuffledJokes = shuffleArray($scope.allJokes);
      })
      .then(function() {
        return jokeTypeList($scope.shuffledJokes);
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