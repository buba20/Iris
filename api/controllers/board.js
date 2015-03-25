var db = require("../../db")();

var boardController = function() {
    this.getAllBoards = function(next) {
        db.models.Board.find().select("_id title").exec(next);
    };
    this.getBoardById = function(id, next) {
        db.models.Board.findOne({ _id: id }).exec(next);
    };
    this.createNew = function (next) {
        (new db.models.Board({title: "untitled"})).save(next);
    };
    return this;
};

module.exports = boardController;