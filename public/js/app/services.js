angular.module("IrisApp.Config", [])
    .factory("Urls", function () {
        return {
            newBoardUrl: "api/board/new"
        }
    });

angular.module("IrisApp.Services", ["IrisApp.Config"])
    .factory("BoardService", ["$http", "Urls", function ($http, urls) {

        function createNew() {
            return $http.put(urls.newBoardUrl, {})
                .error(function (data) {
                    console.log(data)
                });
        }

        return {
            createNew: createNew
        }

    }]);
