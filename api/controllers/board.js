var db = require("../../db")();

var boardController = function() {
    this.getAllBoards = function(next) {
        db.models.Board.find().select("_id title").exec(next);
    };
    this.getBoardById = function(id, next) {
        db.models.Board.findOne({ _id: id }).exec(next);
    };

    return this;
};

module.exports = boardController();