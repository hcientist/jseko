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
    $scope.fireJokes =
      {
        "jokes" : [ 
          {
            "answers" : [ {
              "ans" : "An Investigator!",
              "id" : 1,
              "pC" : 1,
              "type" : "Text"
            }, {
              "ans" : "A Snappy Dresser",
              "id" : 2,
              "pC" : 1,
              "type" : "Text"
            }, {
              "ans" : "Overdressed",
              "id" : 3,
              "pC" : 1,
              "type" : "Text"
            }, {
              "ans" : "Fancy as Fuck!",
              "id" : 4,
              "pC" : 10,
              "type" : "Text"
            }, {
              "id" : 5,
              "image" : "img/investigator.png",
              "pC" : 1,
              "type" : "Image"
            } ],
            "cadence" : false,
            "id:" : 1,
            "joke" : "What do you call an Alligator in a vest?",
            "parental" : 1,
            "type" : "Call and Response"
          }, {
            "answers" : [ {
              "ans" : "Rrrrrrr!",
              "id" : 6,
              "pC" : 1,
              "type" : "Text"
            }, {
              "ans" : "Oh you think it's the Rrrrrr, but their first love be the Ceeeeeea!",
              "id" : 7,
              "pC" : 1,
              "type" : "Text"
            }, {
              "ans" : "Their first love be the Ceeeeea because they are being modest.  Their true love is the X because that is what mark's their booty!",
              "id" : 8,
              "pC" : 4,
              "type" : "Text"
            } ],
            "cadence" : true,
            "id:" : 2,
            "joke" : "What is a pirate's favorite letter?",
            "parental" : 1,
            "type" : "Call and Response"
          }, {
            "answers" : [ {
              "ans" : "Im-pasta!",
              "id" : 9,
              "pC" : 1,
              "type" : "Text"
            } ],
            "cadence" : false,
            "followupWith" : 5,
            "id:" : 3,
            "joke" : "What do you call fake pasta?",
            "parental" : 1,
            "type" : "Call and Response"
          }, {
            "answers" : [ {
              "ans" : "Imi-tatar!",
              "id" : 10,
              "pC" : 1,
              "type" : "Text"
            } ],
            "cadence" : false,
            "followupFrom" : 4,
            "followupWith" : 4,
            "id:" : 4,
            "joke" : "What do you call fake potato?",
            "parental" : 1,
            "type" : "Call and Response"
          }, {
            "cadence" : false,
            "id:" : 5,
            "joke" : "Roses are red, Violets are blue. Oh wait, no they’re not, They’re violet.",
            "parental" : 1,
            "type" : "One Liner"
          }, {
            "answers" : [ {
              "ans" : "BREATHE!!!",
              "id" : 11,
              "pC" : 1,
              "type" : "Text"
            } ],
            "cadence" : false,
            "id:" : 6,
            "joke" : "What did the green grape say to the purple grape?",
            "parental" : 1,
            "type" : "Call and Response"
          }, {
            "answers" : [ {
              "ans" : "Nothing.  She couldn't!",
              "id" : 12,
              "pC" : 1,
              "type" : "Text"
            } ],
            "cadence" : false,
            "id:" : 7,
            "joke" : "What did the purple grape say to the green grape?",
            "parental" : 1,
            "type" : "Call and Response"
          }, {
            "answers" : [ {
              "ans" : "Look Grandpa! No hands!",
              "id" : 13,
              "pC" : 1,
              "type" : "Text"
            } ],
            "cadence" : false,
            "id:" : 8,
            "joke" : "What did the digital clock say to the grandfather clock?",
            "parental" : 1,
            "type" : "Call and Response"
          }, {
            "answers" : [ {
              "ans" : "WHAT is a word made up of 4 letters YET is made up of 3. ALTHOUGH is written with 8 letters, and THEN with 4. RARELY consists of 6 and NEVER is written with 5",
              "id" : 14,
              "pC" : 1,
              "type" : "Text"
            } ],
            "cadence" : false,
            "id:" : 9,
            "joke" : "What is a word made up of 4 letters yet is made up of 3 although is written with 8 letters and then with 4 rarely consists of 6 and never is written with 5",
            "parental" : 1,
            "type" : "Riddle"
          }, {
            "answers" : [ {
              "ans" : "Ten Tickles!",
              "id" : 15,
              "pC" : 1,
              "type" : "Text"
            } ],
            "cadence" : false,
            "id" : 10,
            "joke" : "How many tickles does it take to make an octopus laugh?",
            "parental" : 1,
            "type" : "Call and Response"
          }, {
            "answers" : [ {
              "ans" : "Ten ants!",
              "id" : 16,
              "pC" : 1,
              "type" : "Text"
            } ],
            "cadence" : false,
            "id" : 11,
            "joke" : "How many ants can fit into an apartment?",
            "parental" : 1,
            "type" : "Call and Response"
          }, {
            "answers" : [ {
              "ans" : "Because 7 8 9.",
              "id" : 17,
              "pC" : 4,
              "type" : "Text"
            }, {
              "ans" : "Because 7 was a registered 6 offender.",
              "id" : 18,
              "pC" : 7,
              "type" : "Text"
            } ],
            "cadence" : false,
            "id" : 12,
            "joke" : "Why was 6 afraid 7?",
            "parental" : 4,
            "type" : "Call and Response"
          }, {
            "answers" : [ {
              "ans" : "Because if they flew over the bay, we would have to call them bagels",
              "id" : 19,
              "pC" : 1,
              "type" : "Text"
            } ],
            "cadence" : false,
            "id" : 13,
            "joke" : "Why do we seagulls fly over the sea?",
            "parental" : 1,
            "type" : "Call and Response"
          }, {
            "cadence" : false,
            "id" : 14,
            "joke" : "Roses are grey, violets are grey, I am a dog.",
            "parental" : 3,
            "type" : "One Liner"
          }, {
            "cadence" : false,
            "id" : 15,
            "joke" : "Roses are red, violets are blue, I am bad at rhyming, refrigerator.",
            "parental" : 3,
            "type" : "One Liner"
          }, {
            "answers" : [ {
              "ans" : "When it is a jar.",
              "id" : 20,
              "pC" : 2,
              "type" : "Text"
            } ],
            "cadence" : false,
            "id" : 16,
            "joke" : "When is a door not a door?",
            "parental" : 2,
            "type" : "Call and Response"
          }, {
            "answers" : [ {
              "ans" : "Because his mother was a wafer so long.",
              "id" : 21,
              "pC" : 1,
              "type" : "Text"
            } ],
            "cadence" : false,
            "id" : 17,
            "joke" : "Why did the baby cookie cry?",
            "parental" : 1,
            "type" : "Call and Response"
          }, {
            "answers" : [ {
              "ans" : "A bee flying backwards",
              "id" : 22,
              "pC" : 2,
              "type" : "Text"
            } ],
            "cadence" : false,
            "id" : 18,
            "joke" : "What goes zzub zzub?",
            "parental" : 2,
            "type" : "Call and Response"
          }, {
            "answers" : [ {
              "ans" : "Of course not, he’s hiding.",
              "id" : 23,
              "pC" : 1,
              "type" : "Text"
            } ],
            "cadence" : false,
            "id" : 19,
            "joke" : "Have you seen the elephant hiding?",
            "parental" : 1,
            "type" : "Call and Response"
          }, {
            "cadence" : false,
            "id" : 20,
            "joke" : "I entered ten puns into a joke contest hoping one would win. No pun in ten did.",
            "parental" : 3,
            "type" : "One Liner"
          }, {
            "answers" : [ {
              "ans" : "For Drizzle!",
              "id" : 24,
              "pC" : 3,
              "type" : "Text"
            } ],
            "cadence" : false,
            "id" : 21,
            "joke" : "Why did Snoop Dogg buy an umbrella?",
            "parental" : 3,
            "type" : "Call and Response"
          }, {
            "answers" : [ {
              "ans" : "For Schnitzel!",
              "id" : 25,
              "pC" : 3,
              "type" : "Text"
            } ],
            "cadence" : false,
            "id" : 22,
            "joke" : "Why did Snoop Dogg visit Germany?",
            "parental" : 3,
            "type" : "Call and Response"
          }, {
            "answers" : [ {
              "ans" : "SepTIMBERRRRRRRR!",
              "id" : 26,
              "pC" : 1,
              "type" : "Text"
            } ],
            "cadence" : false,
            "id" : 23,
            "joke" : "When is a lumberjack’s birthday?",
            "parental" : 1,
            "type" : "Call and Response"
          }, {
            "answers" : [ {
              "ans" : "A stick!",
              "id" : 27,
              "pC" : 2,
              "type" : "Text"
            } ],
            "cadence" : false,
            "id" : 24,
            "joke" : "What’s brown and sticky?",
            "parental" : 4,
            "type" : "Call and Response"
          }, {
            "cadence" : false,
            "id" : 25,
            "joke" : "I farted in an elevator once, it was wrong on so many levels.",
            "parental" : 4,
            "type" : "One Liner"
          }, {
            "answers" : [ {
              "ans" : "A rabbit’s toot.",
              "id" : 28,
              "pC" : 4,
              "type" : "Text"
            } ],
            "cadence" : false,
            "id" : 26,
            "joke" : "What’s invisible and smells like a carrot?",
            "parental" : 4,
            "type" : "Call and Response"
          }, {
            "cadence" : false,
            "id" : 27,
            "joke" : "System.out.print(“Best one-liner”);",
            "parental" : 2,
            "type" : "One Liner"
          }, {
            "answers" : [ {
              "ans" : "Hebrew ed it!",
              "id" : 29,
              "pC" : 2,
              "type" : "Text"
            } ],
            "cadence" : false,
            "id" : 28,
            "joke" : "How did Moses like his coffee?",
            "parental" : 2,
            "type" : "Call and Response"
          }, {
            "cadence" : false,
            "joke" : "I'm really good friends with 25 letters of the alphabet.  I don't know y.",
            "parental" : 1,
            "type" : "One Liner"
          }, {
            "cadence" : false,
            "id" : 28,
            "joke" : "I asked my North Korean friend how it was there, he said he couldn't complain.",
            "parental" : 3,
            "type" : "Call and Response"
          }, {
            "answers" : [ {
              "ans" : "Anonymoose!",
              "id" : 30,
              "pC" : 1,
              "type" : "Text"
            } ],
            "cadence" : false,
            "id" : 29,
            "joke" : "What do you call a moose without a name?",
            "parental" : 1,
            "type" : "Call and Response"
          }, {
            "cadence" : false,
            "id" : 30,
            "joke" : "Firebase…",
            "parental" : 1,
            "type" : "One Liner"
          } ]
      }


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

    function filterRouteParams (rp){
      if(rp.s){
        $scope.searchAll = rp.s;
      }
      if(rp.jokeType){
        var jokeTypes = rp.jokeType.split(',');
        $scope.jokeTypes = jokeTypes;
        for (var i=0 ; i<jokeTypes.length ; i++) {
          if( $scope.arrayOfViewableJokeTypes[jokeTypes[i]] ){
            // console.log("( $scope.arrayOfViewableJokeTypes[jokeTypes[i]] ){")
            $scope.arrayOfViewableJokeTypes[jokeTypes[i]] = false;
          }
        }
        console.log("$scope.jokeTypes", $scope.jokeTypes)
        console.log("$scope.arrayOfViewableJokeTypes", $scope.arrayOfViewableJokeTypes)
      }
      if(rp.answerType){
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
    
  }]);