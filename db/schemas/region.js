
var mongoose = require('mongoose'),
    schemas = require('../schemas');
var regionSchema = mongoose.Schema({
    title: {
        type: String
    },
    notes:[schemas.note]
});
module.exports = regionSchema;