"use strict";
var mongoose = require("mongoose"),
     database = mongoose.connect("mongodb://localhost/Iris");

database.connection.on("error", console.error.bind(console, "database error: "));

module.exports = function () {
    return {
        models : require("./models")()
    }
};