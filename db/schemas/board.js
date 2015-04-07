var mongoose = require("mongoose"),
    schemas = require("../schemas");
var boardSchema = mongoose.Schema({
    title: {
        type: String
    },
    regions:[schemas.region]
});

module.exports = boardSchema;
