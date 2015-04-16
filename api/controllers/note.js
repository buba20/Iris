"use strict";
var db = require("../../db")(),
    mongo = require("mongoose"),
    boardController = require("./board")();

function addNote(boardId, regionId, next) {

    var note = new db.models.Note();
    db.models.Board.find({
            "regions._id": mongo.Types.ObjectId(regionId)
        },
        {
            "regions.$": 1
        })
        .exec(function (err, data) {
            next();
        });
}

module.exports = function () {
    return {
        add: addNote
    };
};