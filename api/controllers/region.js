"use strict";
var db = require("../../db")(),
    boardController = require("./board")();

function addRegion(boardId, next) {
    boardController.getBoardById(boardId, function (err, board) {

        if (board.regions === undefined || board.regions === null) {
            board.regions = [];
        }
        board.regions.push(new db.models.Region({title: "untitled",notes:{}}));
        board.save(function (err, itemChanged) {
            if (err) {
                next(err, itemChanged);
            }

            next(err, itemChanged, board.regions[board.regions.length - 1]);
        });
    });
}

module.exports = function () {
    return {
        addRegion: addRegion
    };
};


