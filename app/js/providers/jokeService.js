'use strict';

angular.module('jsekoApp')
.factory('JokeService', function($http, $q) {
  return {
    getJokes: function() {
      var deferred = $q.defer();
      $http.get('data/jokes.json').success(function(data) {
        deferred.resolve(data);
      }).error(function(){
        deferred.reject();
      });
      return deferred.promise;

      // This also works
      //since $http.get returns a promise,
      //and promise.then() also returns a promise
      //that resolves to whatever value is returned in it's 
      //callback argument, we can return that.
      // return $http.get('data/jokes.json').then(function(result) {
      //   return result.data;
      // });
    }
  };
});