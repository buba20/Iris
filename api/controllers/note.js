"use strict";
var db = require("../../db")(),
    boardController = require("./board")();

function addNote(boardId, regionId, next) {

    var note = new db.models.Note();
console.log(regionId);
    db.models.Board.update(
        {
            "regions.title": 'untitled'
        }, {
            "$push": {"regions.0.notes":note}
        }, function (err, num) {
            console.log('query end');
            console.log('Error', err);
            console.log('Num', num);
            next();
        }
    )
}

module.exports = function () {
    return {
        add: addNote
    };
};