"use strict";
angular.module("IrisApp.Controllers", ["ngRoute", "IrisApp.Services"])
    .controller("mainController", ["$scope", "BoardService", "$location", function ($scope, service, $location) {
        $scope.newBoard = function () {
            service.createNew().success(function (data) {
                $location.url("/board/" + data._id);
            });
        };
    }]).controller("boardController", ["$scope", "$routeParams", "BoardService", function ($scope, $routeParams, boardService) {

        var id = $routeParams.id;


        boardService.get(id).success(function (board) {
            $scope.board = board;
        });

        $scope.updateBoard = function () {
            boardService.update($scope.board);
        };

    }])
    .config(["$routeProvider", function ($routeProvider) {
        $routeProvider.when("/", {
            controller: "mainController",
            templateUrl: "home.html"
        }).when("/board/:id", {
            controller: "boardController",
            templateUrl: "board.html"
        });
    }]);