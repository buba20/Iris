angular.module("irisApp.Controllers")
    .controller('boardController', ["$scope", "$routeParams", "BoardService", "boardDelete", "regionService", "notificationService", function ($scope, $routeParams, boardService, boardDelete, regionService, notificationService) {

        var id = $routeParams.id;

        boardService.get(id).success(function (board) {
            $scope.board = board;
        });

        $scope.updateBoard = function () {
            boardService.update($scope.board)
                .success(function () {
                    notificationService.show({msg:"Board saved",type:"success"});
                });
        };

        $scope.deleteBoard = boardDelete.bind(this, id);

        $scope.newRegion = function () {
            regionService.newRegion(id).success(function (region) {
                $scope.board.regions.push(region);
            });
        };
    }]);