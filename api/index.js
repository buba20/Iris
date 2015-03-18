var express = require("express"),
    path = require("path"),
    publicDirectoryPath = path.join(__dirname,"../public"),
    app = express();

var boardController = require("./controllers/board");

app.use("/",express.static(publicDirectoryPath));

app.get("/api", function (req, res) {
    res.json();
});

// /api/board
// /api/board/
app.get(/^\/api\/board(\/){0,1}$/, function (req, res) {
    res.json(boardController.getAllBoards());
});

// /api/board/:id
// /api/board/:id/
app.get(/^\/api\/board\/([a-zA-Z0-9]{12}|[a-zA-Z0-9]{24})\/{0,1}$/, function (req, res) {
    console.log(req.params);
    res.json(boardController.getBoardById(req.params[0]));
});

module.exports = function(portNumber){

    var server = app.listen(portNumber || 3000, function () {

        var host = server.address().address;
        var port = server.address().port;

        console.log("Example app listening at http://%s:%s", host, port)

    });
};
