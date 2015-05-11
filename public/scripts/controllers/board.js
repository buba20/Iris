angular.module("irisApp.Controllers")
    .controller('boardController',["$scope", "$routeParams", "BoardService", "boardDelete", "regionService",function($scope, $routeParams, boardService, boardDelete, regionService){

        var id = $routeParams.id;

        boardService.get(id).success(function (board) {
            $scope.board = board;
        });

        $scope.updateBoard = function () {
            boardService.update($scope.board);
        };

        $scope.deleteBoard = boardDelete.bind(this, id);

        $scope.newRegion = function () {
            regionService.newRegion(id).success(function (region) {
                $scope.board.regions.push(region);
            });
        };
    }]);