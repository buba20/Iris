"use strict";
var db = require("../../db")(),
    boardController = require("./board")();

function addNote(boardId, regionId, next) {
    boardController.getBoardById(boardId, function (err, board) {
        board.regions.forEach(function (region) {
            if (region._id === regionId) {
                region.notes.push(new db.models.Note());
                return board.save(next);
            }
        });
        next();

    });
}

module.exports = function () {
    return {
        add: addNote
    };
};