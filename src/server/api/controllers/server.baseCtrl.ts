/// <reference path='../../../typings/tsd.d.ts'/>
/// <reference path='../../../typings/typescriptServer.d.ts'/>
import express = require("express");
import mongoose = require('mongoose');

export class Base {
    constructor(public app:express.Application){

    }
}