"use strict";
var db = require("../../db")();

var boardController = function () {

    function getAllBoards(next) {
        db.models.Board.find().select("_id title").exec(next);
    }

    function getBoardById(id, next) {
        db.models.Board.findOne({_id: id}).exec(next);
    }

    function createNew(next) {
        (new db.models.Board({title: "untitled"})).save(next);
    }

    function update(board, next) {
        db.models.Board.findOneAndUpdate({_id: board._id}, board, next);
    }

    function deleteBoard(id,next){
        db.models.Board.findByIdAndRemove(id,next);
    }

    return {
        getAllBoards: getAllBoards,
        getBoardById: getBoardById,
        createNew: createNew,
        update: update,
        delete:deleteBoard
    };
};

module.exports = boardController;