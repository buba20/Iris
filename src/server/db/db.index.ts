/// <reference path='../../typings/tsd.d.ts'/>
/// <reference path='../../typings/typescriptServer.d.ts'/>
import mongoose = require ('mongoose');
import noteSchema = require('./schemas/schema.note');
import regionSchema = require('./schemas/schema.region');
import boardSchema = require('./schemas/schema.board');

export function connect (){
    mongoose.connect('mongodb://localhost/Iris');
    var db = mongoose.connection;

    db.on('open', ()=> {
        console.log('Db Connected.');
    });
    db.on('error', (error) => {
        console.error('Db connection fail!', error);
    });

};

export var boardRepository = boardSchema.repository;


