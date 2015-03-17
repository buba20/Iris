(function (db) {

    var mongoose = require('mongoose');
    var database = mongoose.connect('mongodb://localhost/Iris');
    database.connection.on('error',console.error.bind(console,'database error: '));
    db.closeConnection = function (connection) {
        database.connections.forEach(function(c){c.close();});
    };

    require('./models')(db);
}(module.exports));