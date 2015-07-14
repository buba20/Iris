/// <reference path='../../../typings/tsd.d.ts'/>
/// <reference path='../../../typings/typescriptServer.d.ts'/>
import mongoose = require('mongoose')
import regionSchema = require ('./schema.region')
import noteSchema = require('./schema.note')

export var boardSchema = new mongoose.Schema({
    title: {
        type: String
    },
    regions: [regionSchema.regionSchema],
    notes: [noteSchema.noteSchema]
});

export interface IBoard extends mongoose.Document {
    title:String
    regions:[regionSchema.IRegion]
    notes: [noteSchema.INote]
}

export var repository = mongoose.model<IBoard>('board',boardSchema);