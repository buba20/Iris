var mongoose = require("mongoose");

var boardSchema = mongoose.Schema({
    title: {
        type: String
    },
    regions: [{}]
});

module.exports = boardSchema;
