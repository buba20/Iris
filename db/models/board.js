
    var mongoose = require('mongoose');
    var boardShema = mongoose.Schema({
        title: {type: String}
    });

    module.exports = function(db){
        db.models = db.models || {};
        db.models.Board = mongoose.model('board',boardShema);
   };

