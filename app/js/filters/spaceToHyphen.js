/*global angular */
'use strict';

angular.module('jsekoApp')
.filter('SpaceToHyphen', function () {
  return function (value) {
    return (!value) ? '' : value.replace(/ /g, '-');
  };
});