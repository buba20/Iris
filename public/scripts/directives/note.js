'use strict';

/**
 * @ngdoc directive
 * @name irisApp.directive:note
 * @description
 * # note
 */
angular.module('irisApp.Directives')
    .directive('note', function () {
        return {
            restrict: "E",
            templateUrl: "templates/note.html",
            transclude: true,
            scope: {
                delNote: "=",
                note: "=",
                boardId: "="
            }
        };
    });
