/**
 * Created by mikaelen on 17/08/16.
 */
var server = require("./server");
var router = require("./router");

server.start(router.route);