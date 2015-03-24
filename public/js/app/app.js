var irisControllers = angular.module("irisControllers", []);

irisControllers.controller("homeController", ["$scope", function ($scope) {

    $scope.newBoard = function() {
        console.log("new board");
    };

    $scope.contentMessage = "test";
}]);

var app = angular.module("IrisApp", ["ngRoute", "irisControllers"], function ($routeProvider) {

    $routeProvider.when("/", {
        controller: "homeController",
        templateUrl: "home.html"
    }).otherwise({
        redirectTo: "/"
    });

});