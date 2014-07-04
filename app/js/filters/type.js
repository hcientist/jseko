/*global angular */
'use strict';

angular.module('jsekoApp')
.filter('Type', function () {
  return function (allItems, arrayOfViewableTypes) {
    // console.log(arrayOfViewableTypes);

    var filteredArray = [];

    angular.forEach(allItems, function(individualItem, index){
      if(arrayOfViewableTypes[individualItem.type]){
        filteredArray.push(individualItem);
      }
    });

    return filteredArray;
  };
});