'use strict';

/**
 * @ngdoc directive
 * @name irisApp.directive:navigation
 * @description
 * # navigation
 */
angular.module('irisApp.Directives')
  .directive('navigation', function () {
    return {
      templateUrl: 'templates/navigation.html',
      restrict: 'E'
    };
  });
