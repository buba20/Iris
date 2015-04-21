
var mongoose = require('mongoose'),
    schemas = require('../schemas');
var regionSchema = mongoose.Schema({
    title: {
        type: String
    },
    notes: {}
});
module.exports = regionSchema;