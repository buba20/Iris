/// <reference path='../typings/typescriptServer.d.ts'/>
var PORT_NUMBER = 3000;

import server = require('./api/index');

server.start(PORT_NUMBER);