"use strict";
var db = require("../../db")(),
    _ = require("underscore");

function mapBoards(board) {
    var result = board.toObject();
    _(result.regions).each(function (region) {
        region.notes = _(result.notes).where({regionId: region._id.toString()});
        if (region.notes === undefined) {
            region.notes = [];
        }
    });
    delete result.notes;
    return result;
}

function getAllBoards(next) {
    db.models.Board.find().select("_id title").exec(next);
}

function getBoardById(id, next) {
    db.models.Board.findById(id).exec(function (err, boards) {
        if (err) {
            console.error(err);
            return next(err, null);
        }
        var clientBoards = mapBoards(boards);
        next(err, clientBoards);
    });
}

function createNew(next) {
    (new db.models.Board({title: "untitled"})).save(next);
}

function update(board, next) {
    db.models.Board.findByIdAndUpdate(board._id, board, next);
}

function deleteBoard(id, next) {
    db.models.Board.findByIdAndRemove(id, next);
}

var boardController = function () {
    return {
        getAllBoards: getAllBoards,
        getBoardById: getBoardById,
        createNew: createNew,
        update: update,
        delete: deleteBoard
    };
};

module.exports = boardController;