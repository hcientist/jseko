'use strict';

angular.module('jsekoApp')
.factory('JokeService', function($resource) {

  return $resource('data/jokes.json');
});