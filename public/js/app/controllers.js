"use strict";
angular.module("IrisApp.Controllers",
    ["ngRoute", "IrisApp.Services", "ui.bootstrap"])

    .controller("mainController", ["$scope", "BoardService", "$location","$rootScope",
        function ($scope, service, $location, $rootScope) {
            $scope.boards = [];

            service.get().success(function (data) {
                $scope.boards = data;
            });

            $scope.newBoard = function () {
                service.createNew().success(function (data) {
                    $location.url("/board/" + data._id);
                    $rootScope.alertCtrl.addAlert("success", "Board saved");
                });
            };
        }])
    .service("boardDelete", ["$modal", "$location", "BoardService",
        function ($modal, $location, boardService) {

            return function (boardId) {

                $modal.open({
                    templateUrl: "confirmDeleteModal.html",
                    controller: "ModalInstanceCtrl"
                }).result.then(function () {
                        boardService.delete(boardId).success(function () {
                            $location.url("/board/");
                        });
                    });
            };
        }])
    .controller("boardController", ["$scope", "$routeParams", "BoardService", "boardDelete",
        function ($scope, $routeParams, boardService, boardDelete) {
            var id = $routeParams.id;
            boardService.get(id).success(function (board) {
                $scope.board = board;
            });

            $scope.updateBoard = function () {
                boardService.update($scope.board);
            };

            $scope.deleteBoard = boardDelete.bind(this, id);

        }])
    .controller("ModalInstanceCtrl", function ($scope, $modalInstance) {

        $scope.yes = function () {
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss("cancel");
        };
    })
    .config(["$routeProvider", function ($routeProvider) {
        $routeProvider.when("/", {
            controller: "mainController",
            templateUrl: "home.html"
        }).when("/board/:id", {
            controller: "boardController",
            templateUrl: "board.html"
        });
    }]);