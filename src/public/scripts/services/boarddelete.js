'use strict';

/**
 * @ngdoc service
 * @name irisApp.boardDelete
 * @description
 * # boardDelete
 * Service in the irisApp.
 */
angular.module('irisApp.Services')
    .service('boardDelete', ["$modal", "$location", "boardService", function ($modal, $location, boardService) {
        return function (boardId) {

            $modal.open({
                templateUrl: "templates/confirmDeleteModal.html",
                controller: "ModalInstanceCtrl"
            }).result.then(function () {
                    boardService.delete(boardId).success(function () {
                        $location.url('/board/');
                    })
                });
        };
    }]);
