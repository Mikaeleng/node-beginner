/**
 * Created by mikaeleng on 2016/08/17.
 */
var querystring = require("querystring"),
    fs = require("fs"),
    formidable = require("formidable"),
    sys = require("sys");

function start(response) {
    var body = '<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" ' +
        'content="text/html; charset=UTF-8" />' +
        '</head>' +
        '<body>' +
        '<form action="/upload" enctype="multipart/form-data" ' +
        'method="post">' +
        '<input type="file" name="upload">' +
        '<input type="submit" value="Upload file" />' +
        '</form>' +
        '</body>' +
        '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response, request) {
    var form = new formidable.IncomingForm();
    form.parse(request, function (error, fields, files) {
        console.log(fields + " " + files + "parsing done");

        fs.rename(files.upload.path, "/tmp/test.png", function (error) {
            if (error) {
                fs.unlink("/tmp/test.png");
                fs.rename(files.upload.path, "/tmp/test.png");
            }
        });

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("received image:<br/>");
    response.write("<img src='/show' />");
    response.end(sys.inspect({fields: fields, files: files}));
    });
}

// Prints/sends a type of image to the html element <img>'s source attribute
// Does NOT print out a page. Only streams the file from the servers folder
function show(response) {
    response.writeHead(200, {"Content-Type": "image/png"});
    fs.createReadStream("/tmp/test.png").pipe(response);
}

exports.start = start;
exports.upload = upload;
exports.show = show;
