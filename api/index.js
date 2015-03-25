var express = require("express"),
    path = require("path"),
    publicDirectoryPath = path.join(__dirname,"../public"),
    app = express();

var boardController = require("./controllers/board")();

app.use("/",express.static(publicDirectoryPath));

// /api/board
// /api/board/
app.get(/^\/api\/board(\/){0,1}$/, function (req, res) {
    boardController.getAllBoards(function(err, data) {
        res.json(data);
    });
});

// /api/board/:id
// /api/board/:id/
app.get(/^\/api\/board\/([a-zA-Z0-9]{12}|[a-zA-Z0-9]{24})\/{0,1}$/, function (req, res) {
    boardController.getBoardById(req.params[0], function(err, data) {
        res.json(data);
    });
});

app.put("/api/board/new", function (req, res) {
    boardController.createNew(function (err, data) {
        res.json(data);
    });
});

module.exports = function(portNumber){

    var server = app.listen(portNumber || 3000, function () {

        var host = server.address().address;
        var port = server.address().port;

        console.log("Example app listening at http://%s:%s", host, port)

    });
};
