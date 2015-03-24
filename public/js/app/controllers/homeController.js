//home controller

var home = angular.module("home", ["ngRoute"]);

home.controller("homeController", ["$scope", function ($scope) {
    $scope.newBoard = function () {
        console.log("new board");
    };

    $scope.contentMessage = "test";
}]);

home.config(["$routeProvider", function ($routeProvider) {
    $routeProvider.when("/", {
        controller: "homeController",
        templateUrl: "home.html"
    });
}]);


