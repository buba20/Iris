/// <reference path='../../../typings/tsd.d.ts'/>
/// <reference path='../../../typings/typescriptServer.d.ts'/>
import mongoose = require('mongoose');

export var noteSchema = new mongoose.Schema({
    content: String,
    regionId: String
});

export interface INote extends mongoose.Document {
    content: String
    regionId: String
}

export var repository = mongoose.model<INote>('note', noteSchema);