angular.module("irisApp.Controllers")
    .controller('boardCtrl', ["$scope", "$routeParams", "boardService", "boardDelete", "regionService", "notificationService", function ($scope, $routeParams, boardService, boardDelete, regionService, notificationService) {

        $scope.board = boardService.Board.get({},{_id: $routeParams.id});

        $scope.updateBoard = function () {
            $scope.board.$save();
        };

        $scope.deleteBoard = boardDelete.bind(this, $routeParams.id);

        $scope.newRegion = function () {
            regionService.newRegion($routeParams.id).success(function (region) {
                $scope.board.regions.push(region);
            });
        };
    }]);