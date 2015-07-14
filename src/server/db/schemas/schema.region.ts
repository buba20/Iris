/// <reference path='../../../typings/tsd.d.ts'/>
/// <reference path='../../../typings/typescriptServer.d.ts'/>
import mongoose = require('mongoose')

export var regionSchema = new mongoose.Schema({
    title: String,
    notes: {}
});

export interface IRegion extends mongoose.Document {
    title:String
    note:{}
}

export var repository = mongoose.model<IRegion>('region', regionSchema);
