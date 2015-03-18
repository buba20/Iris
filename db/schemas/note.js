

var mongoose = require('mongoose');
var noteSchema = mongoose.Schema({
    content:{
        type:String
    }
});
module.exports = noteSchema;