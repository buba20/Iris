angular.module('irisApp.Controllers', ['irisApp.Services','ui.bootstrap'])
    .controller("mainCtrl", ["$scope", "BoardService", "$location", "$rootScope",
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
        }]);