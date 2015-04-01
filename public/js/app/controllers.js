"use strict";
angular.module("IrisApp.Controllers", ["ngRoute", "IrisApp.Services", "ui.bootstrap"])
    .controller("mainController", ["$scope", "BoardService", "$location", function ($scope, service, $location) {
        $scope.boards = [];

        service.get().success(function (data) {
            $scope.boards = data;
        });

        $scope.newBoard = function () {
            service.createNew().success(function (data) {
                $location.url("/board/" + data._id);
            });
        };
    }]).
    controller("boardController", ["$scope", "$routeParams", "BoardService", "$modal", function ($scope, $routeParams, boardService, $modal) {

        var id = $routeParams.id;

        boardService.get(id).success(function (board) {
            $scope.board = board;
        });

        $scope.updateBoard = function () {
            boardService.update($scope.board);
        };

        $scope.deleteBoard = function () {
            $modal.open({
                templateUrl: "confirmDeleteModal.html",
                controller: "ModalInstanceCtrl",
                resolve: {
                    board: function(){
                        return $scope.board;}
                }
            }).result.then(function () {
                    debugger;
                    boardService.delete(id);
                });
        };
    }]).controller("ModalInstanceCtrl", function ($scope, $modalInstance, board) {
        $scope.board = board;
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