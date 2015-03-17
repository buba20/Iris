(function (db) {

    var mongoose = require('mongoose');
    var connections;
    db.openConnection = function(){
        connections = mongoose.connect('mongodb://localhost/Iris');
    };

    db.closeConnection = function (connection) {
        connections.connections.forEach(function(c){c.close();});
    };

    //db.openConnection();
    require('./models')(db);
}(module.exports));