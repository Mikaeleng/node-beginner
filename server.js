var http = require("http");
var url = require("url");


function StartComponent(route, handle) {
    function onRequest(request, response) {

        //gets url path name
        var pathname = url.parse(request.url).pathname;
        route(handle, pathname, response,request);
    }

    http.createServer( onRequest).listen(8888);
}


exports.start = StartComponent;