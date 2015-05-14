"use strict";
angular.module("irisApp", ["ngRoute", "irisApp.Controllers", "irisApp.Directives", "ui.bootstrap","toaster"])
    .config(["$routeProvider", function ($routeProvider) {
        $routeProvider.when("/", {
            controller: "mainCtrl",
            templateUrl: "templates/home.html"
        }).when("/board/:id", {
            controller: "boardController",
            templateUrl: "templates/board.html"
        }).otherwise({
            redirectTo: "/"
        });
    }]);