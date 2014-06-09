'use strict';

angular.module('jsekoApp')
  .directive('enterAdd', function() {
    return function(scope, element, attrs) {
      element.bind('mouseenter', function() {
        console.log(attrs.enterAdd);
        element.addClass(attrs.enterAdd);
      });
    };
  })
  .directive('leaveRemove', function() {
    return function(scope, element, attrs) {
      element.bind('mouseleave', function() {
        console.log(attrs.leaveRemove);
        element.removeClass(attrs.enterAdd);
      });
    };
  })
  .directive('enterRemove', function() {
    return function(scope, element, attrs) {
      element.bind('mouseenter', function() {
        element.removeClass(attrs.enterRemove);
      });
    };
  })
  .directive('leaveAdd', function() {
    return function(scope, element, attrs) {
      element.bind('mouseleave', function() {
        element.addClass(attrs.enterRemove);
      });
    };
  });