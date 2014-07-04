'use strict';

angular.module('jsekoApp')
  .directive('joke', function(){
    // Runs during compile
    return {
      // name: '',
      // priority: 1,
      // terminal: true,
      // {} = isolate, true = child, false/undefined = no change
      scope: {
        individualJoke: '=model',
        AnswerTypeFilter: '=answerFilter',
        JokeTypeFilter: '=jokeFilter',
        answerPCRange: '=answerRange'
      },
      // controller: function($scope, $element, $attrs, $transclude) {      },
      // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
      restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
      // template: '<div class="col-md-9 btn {{type}}"><div ng-hide="showAnswer">{{answer}}</div></div>',
      templateUrl: 'js/directives/directiveTemplates/joke.html',
      replace: true,
      // transclude: true,
      // compile: function(tElement, tAttrs, transclude){         return function linking(scope, elm, attrs){        }
      // }
      // link: function(scope, iElm, iAttrs) {
      link: function() {
        // scope.jokeCssClasses = function(uniqJoke) {
        //   if (scope.JokeTypeFilter[uniqJoke] === true) {
        //     return uniqJoke.split(' ').join('-');
        //   } else {
        //     return uniqJoke.split(' ').join('-')+'-off';
        //   }
        // };

      }
    };
  });