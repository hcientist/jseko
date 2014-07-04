'use strict';

angular.module('jsekoApp')
  .directive('answer', ['$compile', '$http', '$templateCache', function($compile, $http, $templateCache){
    var getTemplate = function(contentType) {
      var templateLoader,
      baseUrl = 'js/directives/directiveTemplates/',
      templateMap = {
        Text: 'answerText.html',
        Image: 'answerImage.html',
        Video: 'answerVideo.html'
      };

      var templateUrl = baseUrl + templateMap[contentType];
      templateLoader = $http.get(templateUrl, {cache: $templateCache});

      return templateLoader;
    };

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
      // templateUrl: 'js/directives/directiveTemplates/answer.html',
      replace: true,
      // transclude: true,
      // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
      link: function(scope, element, attrs) {
        var loader = getTemplate(scope.answer.type);

        var promise = loader.success(function(html) {
          element.html(html);
        }).then(function (response) {
          element.replaceWith($compile(element.html())(scope));
        });
      }
    };
  }]);