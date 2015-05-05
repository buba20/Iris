"use strict";
var db = require("../../db")();

function addNote(boardId, regionId, next) {
    var note = new db.models.Note({content: "", regionId: regionId});

    db.models.Board.findByIdAndUpdate(boardId, {$push: {"notes": note}}).exec(function (err) {
        if (err) {
            console.error(err);
            return next(err, null);
        }

        return next(err, note);
    });
}

function deleteNote(boardId, noteId, next) {
console.log(noteId);
    db.models.Board.findByIdAndUpdate(boardId,{$pull:{"notes":{"_id":noteId}}}).exec(function(err){
        if(err){
            console.error(err);
            return next(err);
        }

        console.log('delete note');
        next(null);
    });
}

module.exports = function () {
    return {
        add: addNote,
        deleteNote: deleteNote
    };
};