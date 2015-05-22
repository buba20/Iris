var mongoose = require("mongoose"),
    regionSchema = require("../schemas/region"),
    noteSchema = require("../schemas/note");
var boardSchema = mongoose.Schema({
    title: {
        type: String
    },
    regions: [regionSchema],
    notes:[noteSchema]
});

module.exports = boardSchema;
