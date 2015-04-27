"use strict";
angular.module("IrisApp.Controllers",
    ["ngRoute", "IrisApp.Services", "ui.bootstrap"])
    .controller("mainController", ["$scope", "BoardService", "$location", "$rootScope",
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
        }])
    .service("boardDelete", ["$modal", "$location", "BoardService",
        function ($modal, $location, boardService) {

            return function (boardId) {

                $modal.open({
                    templateUrl: "confirmDeleteModal.html",
                    controller: "ModalInstanceCtrl"
                }).result.then(function () {
                        boardService.delete(boardId).success(function () {
                            $location.url("/board/");
                        });
                    });
            };
        }])
    .service("regionService", ["$http", function ($http) {
        return {
            newRegion: function (boardId) {
                return $http.put("api/regions/new", {boardId: boardId}).error(function (err) {
                    console.log(err);
                });
            }
        };
    }])
    .controller("boardController",
    ["$scope", "$routeParams", "BoardService", "boardDelete", "regionService",
        function ($scope, $routeParams, boardService, boardDelete, regionService) {
            var id = $routeParams.id;
            boardService.get(id).success(function (board) {
                $scope.gridsterOpts = {
                    columns: 1, // the width of the grid, in columns
                    pushing: true, // whether to push other items out of the way on move or resize
                    floating: true, // whether to automatically float items up so they stack (you can temporarily disable if you are adding unsorted items with ng-repeat)
                    swapping: false, // whether or not to have items of the same size switch places instead of pushing down if they are the same size
                    width: "30", // can be an integer or "auto". "auto" scales gridster to be the full width of its containing element
                    colWidth: "20", // can be an integer or "auto".  "auto" uses the pixel width of the element divided by "columns"
                    rowHeight: "20", // can be an integer or "match".  Match uses the colWidth, giving you square widgets.
                    margins: [10, 10], // the pixel distance between each widget
                    outerMargin: true, // whether margins apply to outer edges of the grid
                    isMobile: false, // stacks the grid items if true
                    mobileBreakPoint: 600, // if the screen is not wider that this, remove the grid layout and stack the items
                    mobileModeEnabled: true, // whether or not to toggle mobile mode when screen width is less than mobileBreakPoint
                    minColumns: 1, // the minimum columns the grid must have
                    minRows: 2, // the minimum height of the grid, in rows
                    maxRows: 100,
                    defaultSizeX: 2, // the default width of a gridster item, if not specifed
                    defaultSizeY: 1, // the default height of a gridster item, if not specified
                    minSizeX: 1, // minimum column width of an item
                    maxSizeX: 10, // maximum column width of an item
                    minSizeY: 1, // minumum row height of an item
                    maxSizeY: 10 // maximum row height of an item
                    //resizable: {
                    //    enabled: true,
                    //    handles: ["n", "e", "s", "w", "ne", "se", "sw", "nw"],
                    //    start: function(event, $element, widget) {}, // optional callback fired when resize is started,
                    //    resize: function(event, $element, widget) {}, // optional callback fired when item is resized,
                    //    stop: function(event, $element, widget) {} // optional callback fired when item is finished resizing
                    //},
                    //draggable: {
                    //    enabled: true, // whether dragging items is supported
                    //    handle: ".my-class", // optional selector for resize handle
                    //    start: function(event, $element, widget) {}, // optional callback fired when drag is started,
                    //    drag: function(event, $element, widget) {}, // optional callback fired when item is moved,
                    //    stop: function(event, $element, widget) {} // optional callback fired when item is finished dragging
                    //}
                };
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
        }])
    .controller("regionController", ["$scope", "$http", function ($scope, $http) {
        $scope.delRegion = function (region, boardId) {
            console.log("Delete region from board", region, boardId);
        };
        $scope.addItem = function (region, boardId) {
            $http.put("api/note", {boardId: boardId, regionId: region._id}).error(function (data) {
                console.error(data);
            }).success(function (note) {
                region.notes.push(note);
            });
        };
        $scope.delNote = function (boardId, note) {
            $http.delete("api/note/" + boardId + "/" + note._id)
                .error(function (data) {
                    console.error(data);
                }).success(function (data) {
                    console.log("deleted");
                });
        }
    }])
    .controller("ModalInstanceCtrl", function ($scope, $modalInstance) {

        $scope.yes = function () {
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss("cancel");
        };
    })
    .config(["$routeProvider", function ($routeProvider) {
        $routeProvider.when("/", {
            controller: "mainController",
            templateUrl: "home.html"
        }).when("/board/:id", {
            controller: "boardController",
            templateUrl: "board.html"
        });
    }]);