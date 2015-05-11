"use strict";
angular.module("irisApp", ["ngRoute", "irisApp.Controllers", "irisApp.Directives", "ui.bootstrap"])
    .config(["$routeProvider", function ($routeProvider) {
        $routeProvider.when("/", {
            controller: "mainCtrl",
            templateUrl: "home.html"
        }).when("/board/:id", {
            controller: "boardController",
            templateUrl: "board.html"
        }).otherwise({
            redirectTo: "/"
        });
    }]);