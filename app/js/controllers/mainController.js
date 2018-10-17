/*global angular */
/*global Firebase */
'use strict';

angular.module('jsekoApp')
  .controller('MainController', [ '$scope', '$filter', '$routeParams', '$location', 'JokeService', 'TypeFilter', 'SpaceToHTMLFilter', 'ColorService', function MainController($scope, $filter, $routeParams, $location, JokeService, Type, SpaceToHTML, ColorService) {

    $scope.message = 'ANSWER: ';

    // var jokesRef = new Firebase('https://jseko.firebaseio.com/');
    // $scope.fireJokes = $firebase(jokesRef);
    // $scope.fireJokes = {jokes:[
    //   {
    //     joke: "hi there",
    //     parental: 1
    //   },
    //   {
    //     joke: "ho there",
    //     parental: 10
    //   }
    // ]};
    $scope.arrayOfViewableJokeTypes = {};
    $scope.arrayOfViewableAnswerTypes = {};
    $scope.answerPCRange = function (jokeAnswer) {
      // console.log(jokeAnswer.pC)
      // console.log($scope.slider.answerLowerBound)
      // console.log(jokeAnswer.pC)
      // console.log($scope.slider.answerUpperBound)
      // console.log("answerPCRange", parseInt(jokeAnswer.pC) >= $scope.slider.answerLowerBound &&
      //   parseInt(jokeAnswer.pC) <= $scope.slider.answerUpperBound)
      return (parseInt(jokeAnswer.pC) >= $scope.slider.answerLowerBound &&
        parseInt(jokeAnswer.pC) <= $scope.slider.answerUpperBound);
    };
    $scope.jokePCRange = function (singleJoke) {
      return (parseInt(singleJoke.parental) >= $scope.slider.jokeLowerBound &&
        parseInt(singleJoke.parental) <= $scope.slider.jokeUpperBound);
    };
    $scope.slider = {
      answerLowerBound: 1,
      answerUpperBound: 8,
      jokeLowerBound: 1,
      jokeUpperBound: 8,
      min: 1,
      max: 10
    };
    $scope.fireJokes = {jokes: [
      {
        "joke": "What do you call an Alligator in a vest?",
        "type": "CaR",
        answers: [
          {
            ans: "An investigator!",
            pC: 1,
            type: "Text"
          },
          {
            ans: "A snappy dresser!",
            pC: 1,
            type: "Text"
          },
          {
            "ans": "text",
            "pC": 1,
            type: "Image",
            image: "img/investogator.png"
          }
        ],
        "cadence": false,
        "parental": 1,
      },
      // {
      //   "joke": "What is a pirate's favorite letter?",
      //   "type": "CaR",
      //   "answer1": "Rrrrrrr!",
      //   "answer2": "Oh you think it's the Rrrrrr, but their first love be the Ceeeeeea!",
      //   "answer3": {
      //     "ans": "Their first love be the Ceeeeea because they are being modest.  Their true love is the X because that is what mark's their booty!",
      //     "pC": true
      //   },
      //   "cadence": true,
      //   "parental": 10,
      //   "pic": null
      // },
      // {
      //   "joke": "Roses are red, Violets are blue. Oh wait, no they’re not, They’re violet.",
      //   "type": "1l",
      //   "cadence": false
      // }
    ]};
    $scope.allJokes = $scope.fireJokes.jokes;

    // $scope.fireJokes.$on('loaded', function(val) {
    //   jokeTypeList(shuffleArray(val.jokes), filterRouteParams);
    //   $scope.allJokes = val.jokes;
    // });

    var jokeTypeList = function (jokeArray, callback) {
      var uniqJokeTypes = [];
      var uniqAnswerTypes = [];
      for (var i = 0; i < jokeArray.length; i++) {
        if (uniqJokeTypes.indexOf(jokeArray[i].type) < 0) {
          uniqJokeTypes.push(jokeArray[i].type);
          console.log($scope.arrayOfViewableJokeTypes)
          console.log(jokeArray)
          $scope.arrayOfViewableJokeTypes[jokeArray[i].type] = true;
        }
        //Check if there is a joke answer type
        if (jokeArray[i].answers) {
          for (var j = 0; j < jokeArray[i].answers.length; j++) {
            if (uniqAnswerTypes.indexOf(jokeArray[i].answers[j].type) < 0) {
              if (jokeArray[i].answers[j].type) {
                uniqAnswerTypes.push(jokeArray[i].answers[j].type);
                $scope.arrayOfViewableAnswerTypes[jokeArray[i].answers[j].type] = true;
              }
            }
          }
          console.log("$scope.arrayOfViewableAnswerTypes)", $scope.arrayOfViewableAnswerTypes)
        }
      }
      $scope.uniqJokeTypes = uniqJokeTypes;
      $scope.uniqAnswerTypes = uniqAnswerTypes;
      if (callback && typeof (callback) === 'function') {
        callback($routeParams);
      }
    };

    var shuffleArray = function (array) {
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

    jokeTypeList(shuffleArray($scope.allJokes), filterRouteParams);
    

    // filteredAllJokes = (
    //   allJokes |
    //   filter: jokePCRange |
    //     orderBy: randomOrder |
    //       filter: searchAll |
    //         Type: arrayOfViewableJokeTypes)
    console.log($scope.allJokes)
    console.log($scope.jokePCRange($scope.allJokes))

    function filterRouteParams (rp){
      if(rp.s){
        console.log("rp.s){")
        $scope.searchAll = rp.s;
      }
      if(rp.jokeType){
        console.log("rp.jokeType){")
        var jokeTypes = rp.jokeType.split(',');
        $scope.jokeTypes = jokeTypes;
        for (var i=0 ; i<jokeTypes.length ; i++) {
          if( $scope.arrayOfViewableJokeTypes[jokeTypes[i]] ){
            // console.log("( $scope.arrayOfViewableJokeTypes[jokeTypes[i]] ){")
            $scope.arrayOfViewableJokeTypes[jokeTypes[i]] = false;
          }
        }
      }
      if(rp.answerType){
        console.log("rp.answerType){")
        var answerTypes = rp.answerType.split(',');
        $scope.answerTypes = answerTypes;
        for (var j=0 ; j<answerTypes.length ; j++) {
          if( $scope.arrayOfViewableAnswerTypes[answerTypes[j]] ){
            // console.log("( $scope.arrayOfViewableAnswerTypes[answerTypes[j]] ){")
            $scope.arrayOfViewableAnswerTypes[answerTypes[j]] = false;
          }
        }
      }
      if(rp.jokeFilter){
        console.log("rp.jokeFilter){")
        var boundaries = rp.jokeFilter.split(',');
        $scope.jokeFilter = boundaries;
        $scope.answerFilter = boundaries;
        $scope.slider.jokeLowerBound = boundaries[0];
        $scope.slider.jokeUpperBound = boundaries[1];
      }
      if(rp.answerFilter){
        console.log("rp.answerFilter){")
        var bounds = rp.answerFilter.split(',');
        $scope.answerFilter = bounds;
        $scope.slider.answerLowerBound = bounds[0];
        $scope.slider.answerUpperBound = bounds[1];
      }
      $scope.routeParams = rp;
    }

    

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

    // ng-repeat="answer in individualJoke.answers | filter:answerPCRange | Type:arrayOfViewableAnswerTypes"
    console.log($scope.allJokes[0])
    console.log($scope.answerPCRange($scope.allJokes[0].answers[0]))

    
  }]);