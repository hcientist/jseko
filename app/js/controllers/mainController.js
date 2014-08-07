/*global angular */
/*global Firebase */
'use strict';

angular.module('jsekoApp')
  .controller('MainController', [ '$scope', '$filter', '$firebase', '$routeParams', '$location', 'JokeService', 'TypeFilter', 'SpaceToHTMLFilter', 'ColorService', function MainController($scope, $filter, $firebase, $routeParams, $location, JokeService, Type, SpaceToHTML, ColorService) {

    $scope.message = 'ANSWER: ';

    var jokesRef = new Firebase('https://jseko.firebaseio.com/');
    $scope.fireJokes = $firebase(jokesRef);

    $scope.fireJokes.$on('loaded', function(val) {
      jokeTypeList(shuffleArray(val.jokes), filterRouteParams);
      $scope.allJokes = val.jokes;
    });

    $scope.arrayOfViewableJokeTypes = {};
    $scope.arrayOfViewableAnswerTypes = {};

    $scope.slider = {
      answerLowerBound : 1,
      answerUpperBound : 8,
      jokeLowerBound : 1,
      jokeUpperBound : 8,
      min: 1,
      max: 10
    };

    function filterRouteParams (rp){
      if(rp.s){
        $scope.searchAll = rp.s;
      }
      if(rp.jokeType){
        var jokeTypes = rp.jokeType.split(',');
        $scope.jokeTypes = jokeTypes;
        for (var i=0 ; i<jokeTypes.length ; i++) {
          if( $scope.arrayOfViewableJokeTypes[jokeTypes[i]] ){
            $scope.arrayOfViewableJokeTypes[jokeTypes[i]] = false;
          }
        }
      }
      if(rp.answerType){
        var answerTypes = rp.answerType.split(',');
        $scope.answerTypes = answerTypes;
        for (var j=0 ; j<answerTypes.length ; j++) {
          if( $scope.arrayOfViewableAnswerTypes[answerTypes[j]] ){
            $scope.arrayOfViewableAnswerTypes[answerTypes[j]] = false;
          }
        }
      }
      if(rp.jokeFilter){
        var boundaries = rp.jokeFilter.split(',');
        $scope.jokeFilter = boundaries;
        $scope.answerFilter = boundaries;
        $scope.slider.jokeLowerBound = boundaries[0];
        $scope.slider.jokeUpperBound = boundaries[1];
      }
      if(rp.answerFilter){
        var bounds = rp.answerFilter.split(',');
        $scope.answerFilter = bounds;
        $scope.slider.answerLowerBound = bounds[0];
        $scope.slider.answerUpperBound = bounds[1];
      }
      $scope.routeParams = rp;
    }

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

    $scope.$watch('searchAll', function (val) {
      $location.search('s', val);
    });
    $scope.$watch('slider.jokeLowerBound', function (val) {
      $location.search('jokeFilter', val + ',' + $scope.slider.jokeUpperBound);
    });
    $scope.$watch('slider.jokeUpperBound', function (val) {
      $location.search('jokeFilter', $scope.slider.jokeLowerBound + ',' + val);
    });
    $scope.$watch('slider.answerLowerBound', function (val) {
      $location.search('answerFilter', val + ',' + $scope.slider.answerUpperBound);
    });
    $scope.$watch('slider.answerUpperBound', function (val) {
      $location.search('answerFilter', $scope.slider.answerLowerBound + ',' + val);
    });

    var jokeTypeList = function(jokeArray, callback){
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
      if (callback && typeof(callback) === 'function') {
        callback($routeParams);
      }
    };

    $scope.jokeTypeClick = function(option){
      console.log('jokeTypeClick');
      var uniqJoke = option;
      $scope.arrayOfViewableJokeTypes[uniqJoke] = !$scope.arrayOfViewableJokeTypes[uniqJoke];
      var falseJokeTypes = '';
      for(var index in $scope.arrayOfViewableJokeTypes) {
        if($scope.arrayOfViewableJokeTypes[index] === false){
          if(falseJokeTypes === ''){
            falseJokeTypes = index;
          } else {
            falseJokeTypes = falseJokeTypes + ',' + index;
          }
        }
      }
      $location.search('jokeType', falseJokeTypes);
    };
    $scope.answerTypeClick = function(option){
      var uniqAnswer = option;
      $scope.arrayOfViewableAnswerTypes[uniqAnswer] = !$scope.arrayOfViewableAnswerTypes[uniqAnswer];
      var falseAnswerTypes = '';
      for(var index in $scope.arrayOfViewableAnswerTypes) {
        if($scope.arrayOfViewableAnswerTypes[index] === false){
          if(falseAnswerTypes === ''){
            falseAnswerTypes = index;
          } else {
            falseAnswerTypes = falseAnswerTypes + ',' + index;
          }
        }
      }
      $location.search('answerType', falseAnswerTypes);
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

    $scope.colors = ColorService;

    $scope.answerPCRange = function(jokeAnswer) {
      return (parseInt(jokeAnswer.pC) >= $scope.slider.answerLowerBound &&
              parseInt(jokeAnswer.pC) <= $scope.slider.answerUpperBound);
    };
    $scope.jokePCRange = function(singleJoke) {
      return (parseInt(singleJoke.parental) >= $scope.slider.jokeLowerBound &&
              parseInt(singleJoke.parental) <= $scope.slider.jokeUpperBound);
    };
  }]);