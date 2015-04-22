var mongoose = require("mongoose");
var noteSchema = mongoose.Schema({
    content: {
        type: String
    },
    regionId: String
});
module.exports = noteSchema;