"use strict";
var db = require("../../db")();

function mapRegion(region) {
    var result = region.toObject();
    result.notes = [];
    return result;
}

function addRegion(boardId, next) {
    var region = new db.models.Region({title: "untitled"});
    db.models.Board.findByIdAndUpdate(boardId, {$push: {"regions": region}})
        .exec(function (err, updated) {
            if (err) {
                console.error(err);
                return next(err, null, null);
            }
            region = mapRegion(region);
            next(err, updated, region);
        });
}

module.exports = function () {
    return {
        addRegion: addRegion
    };
};


