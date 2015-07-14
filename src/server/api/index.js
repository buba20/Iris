/// <reference path='../../typings/tsd.d.ts'/>
/// <reference path='../../typings/typescriptServer.d.ts'/>
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var boardController = require("./controllers/board");
var regionController = require("./controllers/region");
var noteController = require("./controllers/note");
var api;
(function (api) {
    var jsonParser = bodyParser.json(), publicDirectoryPath = path.join(__dirname, "../public"), app = express();
    api.start = function (port) {
        var board = boardController(), region = regionController(), note = noteController();
    };
})(api || (api = {}));
module.exports = api;
