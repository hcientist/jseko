/*global angular */
'use strict';

angular.module('jsekoApp')
.filter('Type', function () {
  return function (allItems, arrayOfViewableTypes) {
    // console.log(arrayOfViewableTypes);

    var filteredArray = [];

    // angular.forEach(allItems, function(individualItem, index){
    angular.forEach(allItems, function(individualItem){
      if(arrayOfViewableTypes[individualItem.type]){
        // console.log("individualItem.type", individualItem.type)
        filteredArray.push(individualItem);
      } else {
        // console.log("filter says no")
      }
    });

    // console.log("filteredArray", filteredArray)
    return filteredArray;
  };
});