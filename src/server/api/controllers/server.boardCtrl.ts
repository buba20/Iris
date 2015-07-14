/// <reference path='../../../typings/tsd.d.ts'/>
/// <reference path='../../../typings/typescriptServer.d.ts'/>
import BaseController = require('./server.baseCtrl');
import express = require("express");
import mongoose = require('mongoose');
import bodyParser = require('body-parser')
import repository = require("../../db/db.index")

export class Board extends BaseController.Base {

    constructor(app:express.Application) {
        super(app);
        var jsonParser = bodyParser.json();
        app.get('/api/board/', this.getBoards);
        app.get('/api/board/:id', this.getBoard);
        app.put('/api/board/', jsonParser, this.createBoard);
    }

    getBoards(req:express.Request, res:express.Response, next:Function) {
        repository.boardRepository.find({}).select('_id title').exec((err, boards)=> {

            if (err) {
                console.error(err);
                res.statusCode = 500;
                res.end(err);
                return;
            }

            res.json(boards);
            res.end();
        });
    }

    getBoard(req:express.Request, res:express.Response, next:Function) {
        var boardId = req.params.id;
        repository.boardRepository.findById(boardId).exec((err, board)=> {
            if (err) {
                console.error(err);
                res.statusCode = 500;
                res.end(err);
                return;
            }

            if (board === undefined || board === null) {
                console.log('Board not found ', boardId);
                res.statusCode = 404;
                res.end("Board not found " + boardId);
                return;
            }

            res.json(board);
            res.end();
        })
    }

    createBoard(req:express.Request, res:express.Response, next:Function) {
        var board = req.body;
        console.log(board,req);
        repository.boardRepository.create(board, (err, board)=> {
            if(err){
                console.log(err);
                res.statusCode = 500;
                res.end(err);
                return;
            }

            res.json(board);
            res.end();
        });
    }

}
