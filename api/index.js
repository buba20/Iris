"use strict";
var express = require("express"),
    path = require("path"),
    publicDirectoryPath = path.join(__dirname, "../public"),
    app = express(),
    bodyParser = require("body-parser"),
    jsonParser = bodyParser.json();

var boardController = require("./controllers/board")(),
    regionController = require("./controllers/region")(),
    noteController = require("./controllers/note")();

app.use("/", express.static(publicDirectoryPath));

// /api/board
// /api/board/
app.get(/^\/api\/board(\/){0,1}$/, function (req, res) {
    boardController.getAllBoards(function (err, data) {
        res.json(data);
    });
});

// /api/board/:id
// /api/board/:id/
app.get(/^\/api\/board\/([a-zA-Z0-9]{12}|[a-zA-Z0-9]{24})\/{0,1}$/, function (req, res) {
    boardController.getBoardById(req.params[0], function (err, data) {
        res.json(data);
    });
});

app.put("/api/board/new", function (req, res) {
    boardController.createNew(function (err, data) {
        res.json(data);
    });
});

app.post("/api/board", jsonParser, function (req, res) {
    boardController.update(req.body, function (err, data) {
        if (err) {
            console.err(err);
        }

        res.json(data);
    });
});
app.delete("/api/board/:id", function (req, res) {
    boardController.delete(req.params.id, function (err) {
        if (err) {
            console.log(err);
        }
        res.end();
    });
});

app.put("/api/regions/new", jsonParser, function (req, res) {
    regionController.addRegion(req.body.boardId, function (err, itemChanged, region) {
        if (err) {
            console.error(err);
            res.error(err);
        }
        res.json(region);
    });
});

app.put("/api/note", jsonParser, function (req, res) {
    noteController.add(req.body.boardId, req.body.regionId, function (err, note) {
        if (err) {
            console.log(err);
            res.error(err);
        }

        res.json(note);
    });
});
module.exports = function (portNumber) {

    var server = app.listen(portNumber || 3000, function () {

        var host = server.address().address;
        var port = server.address().port;

        console.log("Example app listening at http://%s:%s", host, port);

    });
};
