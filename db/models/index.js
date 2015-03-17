module.exports = function (db) {
    // add models to db
    require('./board')(db);
};

