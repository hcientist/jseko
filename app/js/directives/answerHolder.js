'use strict';

angular.module('jsekoApp')
  .directive('answerHolder', [function(){
    // Runs during compile
    return {
      // name: '',
      // priority: 1,
      // terminal: true,
      // {} = isolate, true = child, false/undefined = no change
      scope: {
        answer: '=model'
      },
      // controller: function($scope, $element, $attrs, $transclude) {},
      // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
      restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
      // template: '<div class="col-md-9 btn {{type}}"><div ng-hide="showAnswer">{{answer}}</div></div>',
      templateUrl: 'js/directives/directiveTemplates/answerHolder.html',
      // replace: true,
      // transclude: true,
      // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
      link: function(scope, iElm, iAttrs) {
      }
    };
  }]);