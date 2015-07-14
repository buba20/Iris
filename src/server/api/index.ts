/// <reference path='../../typings/tsd.d.ts'/>
/// <reference path='../../typings/typescriptServer.d.ts'/>
import express = require('express')
import path = require('path')
import BoardController = require("./controllers/server.boardCtrl")
import RegionController = require("./controllers/server.regionCtrl")
import NoteController = require("./controllers/server.noteCtrl")
import mongoose = require('mongoose');
import db = require('../db/db.index');

module api {
    var publicDirectoryPath = path.join(__dirname, "../public"),
        app = express(),
        board = new BoardController.Board(app),
        region = new RegionController.Region(app),
        note = new NoteController.Note(app);

    app.use("/", express.static(publicDirectoryPath));

    export var start = (port:number) => {
        db.connect();
        app.listen(port, ()=> {
            console.log('Server is running');
        });
    }
}

export = api;
