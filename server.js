var http = require("http");
var url = require("url");

function StartComponent(route,handle) {
    function onRequest(request, response) {
        //gets url path name
        var pathname = url.parse(request.url).pathname;
        console.log("Request for" + pathname + " recieved");

        route(handle, pathname, response);
    }

    http.createServer(onRequest).listen(8888);
    console.log("server has started");
}



exports.start = StartComponent;