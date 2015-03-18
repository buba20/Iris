(function (models) {
    var schemas = require('../schemas'),
        mongoose = require('mongoose');
    models.Note = mongoose.model('note', schemas.note);
    models.Region = mongoose.model('region', schemas.region);
    models.Board = mongoose.model('board', schemas.board);

}(module.exports));

