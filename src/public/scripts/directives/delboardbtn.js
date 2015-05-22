'use strict';

/**
 * @ngdoc directive
 * @name irisApp.directive:delBoardBtn
 * @description
 * # delBoardBtn
 */
angular.module('irisApp.Directives')
    .directive('delBoardBtn', ["$modal", "$location", "boardService", function ($modal, $location, boardService) {
        return {
            restrict: "E",
            link: function (scope, element, attrs) {
                element.on("click", function () {
                    $modal.open({
                        templateUrl: "confirmDeleteModal.html",
                        controller: "ModalInstanceCtrl"
                    }).result.then(function () {
                            boardService
                                .delete(attrs.boardId)
                                .success(function () {
                                    $location.url("/board/");
                                });
                        });
                });
            },
            templateUrl: "templates/delBtn.html"
        };
    }]);
