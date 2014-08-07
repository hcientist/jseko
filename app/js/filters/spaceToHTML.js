/*global angular */
'use strict';

angular.module('jsekoApp')
.filter('SpaceToHTML', function () {
  return function (value) {
    return (!value) ? '' : value.replace(/ /g, '%20');
  };
});