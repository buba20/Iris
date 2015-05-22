angular.module('irisApp.Controllers', ['irisApp.Services','ui.bootstrap'])
    .controller("mainCtrl", ["$scope", "boardService", "$location", "$rootScope",
        function ($scope, service, $location, $rootScope) {
            $scope.boards = [];

            service.Board.query(function (data) {
                $scope.boards = data;
            });

            $scope.newBoard = function () {

                (new service.Board()).$save(function (data) {
                    $location.url("/board/" + data._id);
                });
            };
        }]);