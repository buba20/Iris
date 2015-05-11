'use strict';

/**
 * @ngdoc directive
 * @name irisApp.directive:region
 * @description
 * # region
 */
angular.module('irisApp.Directives')
  .directive('region', function () {
      return {
        restrict: "E",
        templateUrl: "templates/regionTmp.html",
        transclude: true,
        scope: {
          region: "=",
          boardId: "=",
          addItem: "=",
          delRegion: "=",
          delNote: "="
        }
      };
  });
