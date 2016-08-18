/**
 * Created by mikaelen on 17/08/16.
 */
function RouteComponent(handle, pathname,response,request){
    if(typeof handle[pathname] === 'function'){
        handle[pathname](response, request);
    }else{
        console.log("No request handler found for " + pathname);
        response.writeHead(404, {"Content-Tpe":"text/plain"});
        response.write("404 Not found");
        response.end();
    }

}

exports.route = RouteComponent;
