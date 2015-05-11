'use strict';

/**
 * @ngdoc service
 * @name irisApp.urls
 * @description
 * # urls
 * Constant in the irisApp.
 */
angular.module('irisApp.Constants')
    .constant('urls', {
        newBoardUrl: "api/board/new",
        boardUrl: "api/board",
        regionUrl: "api/region"
    });
