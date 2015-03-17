
    var mongoose = require('mongoose');
    var boardSchema = mongoose.Schema({
        title: {type: String}
    });

    module.exports = function(db){
        db.models = db.models || {};
        db.models.Board = mongoose.model('board',boardSchema);
   };

