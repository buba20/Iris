
var schemas = require("../schemas"),
    mongoose = require("mongoose");

module.exports = function() {
    this.Note = mongoose.model("note", schemas.note);
    this.Region = mongoose.model("region", schemas.region);
    this.Board = mongoose.model("board", schemas.board);

    return this;
};