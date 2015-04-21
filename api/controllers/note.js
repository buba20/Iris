"use strict";
var db = require("../../db")(),
    mongo = require("mongoose");

function findRegionById(regions, regionId) {
    var length = regions.length,
        region;

    for (var i = 0; i < length; i++) {
        region = regions[i];

        if ((region._id.toString() === regionId)) {

            return region;

        }
    }

    return null;
}

function addNote(boardId, regionId, next) {
    var note = new db.models.Note({content: ""});
    console.log(boardId);
    db.models.Board.findById(boardId, function (e, d) {

        var region = findRegionById(d.regions, regionId);

        if (region.notes === undefined) {
            region.notes = {};
        }

        region.notes[note._id.toString()] = note;

        d.title = (new Date()).toTimeString();

        db.models.Board.findByIdAndUpdate(boardId, d.toObject(), function () {
            console.log("Updated", arguments);
            next(null, note.toObject());
        });
    });
}

module.exports = function () {
    return {
        add: addNote
    };
};