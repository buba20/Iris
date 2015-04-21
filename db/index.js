var mongoose = require("mongoose");
var database = mongoose.connect("mongodb://localhost/Iris");

database.connection.on("error", console.error.bind(console, "database error: "));

module.exports = function () {
    this.models = require("./models")();

    return this;
};