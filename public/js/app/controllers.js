//home controller
angular.module("IrisApp.Controllers", ["ngRoute", "IrisApp.Services"])

    .controller("mainController", ["$scope", "BoardService", function ($scope, service) {
        $scope.newBoard = function () {
            service.createNew().success(function (data) {
                console.log("success", data);
            });
        };

    }])


    .config(["$routeProvider", function ($routeProvider) {
        $routeProvider.when("/", {
            controller: "mainController",
            templateUrl: "home.html"
        });
    }]);