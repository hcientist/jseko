/*global angular */
'use strict';

angular.module('jsekoApp')
.filter('JokeTypeRepeat', function () {
  return function (allJokes, arrayOfViewableJokeTypes) {
    // console.log(allJokes);
    // console.log(arrayOfViewableJokeTypes);
    var filterJokesArray = [];

    angular.forEach(allJokes, function(individualJoke, index){
      if(arrayOfViewableJokeTypes[individualJoke.type]){
        filterJokesArray.push(individualJoke);
      }
      // console.log(individualJoke);
      // console.log(index);
    });

    return filterJokesArray;


    // var viewable = {
    //   genres: genres,
    //   out: []
    // };
    // angular.forEach(movies, function (value, key) {
    //   if (this.genres[value.genre] === true) {
    //       this.out.push(value);
    //   }
    // }, viewable);
    // return viewable.out;
  };
});