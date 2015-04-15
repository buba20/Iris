"use strict";
angular.module("IrisApp.Config", [])
    .factory("Urls", function () {
        return {
            newBoardUrl: "api/board/new",
            boardUrl: "api/board",
            regionUrl: "api/region"
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
            var url = id ? urls.boardUrl + "/" + id : urls.boardUrl;

            return $http.get(url)
                .error(function (data) {
                    console.error(data);
                });
        }

        function update(board) {
            $http.post(urls.boardUrl, board).error(function (data) {
                console.error(data);
            });
        }

        function deleteBoard(id) {
            return $http.delete(urls.boardUrl + "/" + id).error(function (data) {
                console.error(data);
            });
        }

        return {
            createNew: createNew,
            get: get,
            update: update,
            delete: deleteBoard
        };
    }]);
