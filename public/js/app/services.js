"use strict";
angular.module("IrisApp.Config", [])
    .factory("Urls", function () {
        return {
            newBoardUrl: "api/board/new",
            boardUrl: "api/board"
        };
    });

angular.module("IrisApp.Services", ["IrisApp.Config"])
    .factory("BoardService", ["$http", "Urls", function ($http, urls) {

        function createNew() {
            return $http.put(urls.newBoardUrl, {})
                .error(function (data) {
                    console.log(data);
                });
        }

        function get(id) {
            return $http.get(urls.boardUrl + "/" + id)
                .error(function (data) {
                    console.error(data);
                });
        }

        function update(board) {
            $http.post(urls.boardUrl, board).error(function (data) {
                console.error(data);
            });
        }

        return {
            createNew: createNew,
            get: get,
            update: update
        };
    }]);
