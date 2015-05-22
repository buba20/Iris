'use strict';

/**
 * @ngdoc directive
 * @name irisApp.directive:alert
 * @description
 * # alert
 */
angular.module('irisApp.Directives')
  .directive('ialert', function () {
    return {
      templateUrl: 'templates/ialert.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      }
    };
  });
