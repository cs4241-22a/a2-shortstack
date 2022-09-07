const http = require("http"),
  fs = require("fs"),
  // IMPORTANT: you must run `npm install` in the directory for this assignment
  // to install the mime library used in the following line of code
  mime = require("mime"),
  dir = "public/",
  port = 3000;

const server = http.createServer(function (request, response) {
  debugger
  if (request.method === "GET") {
    handleGet(request, response);
  } else if (request.method === "POST") {
    handlePost(request, response);
  }
});

const appdata = [];

const handleGet = function (request, response) {
  const filename = dir + request.url.slice(1);

  if (request.url === "/") {
    sendFile(response, "public/index.html");
   //appdata = [];
  } else {
    sendFile(response, filename);
  }
};

const handlePost = function (request, response) {
  let dataString = "";

  request.on("data", function (data) {
    dataString += data;
  });

  request.on("end", function () {
    if (request.url === "/submit") {
      const json = JSON.parse(dataString);
      const distance = Number(json.meters), 
            time = Number(json.time);
      const split = (500 * (time / distance)).toFixed(2);
      json['split'] = split.toString()

      appdata.push(json);

      response.writeHead(200, "OK", { "Content-Type": "text/plain" });
      response.write("data recorded")
      response.end(JSON.stringify(appdata))
     // response.end();
    } 
    
    else {
      response.writeHeader( 404 ) 
    }

  });
};

const sendFile = function (response, filename) {
  const type = mime.getType(filename);

  fs.readFile(filename, function (err, content) {
    // if the error = null, then we've loaded the file successfully
    if (err === null) {
      // status code: https://httpstatuses.com
      response.writeHeader(200, { "Content-Type": type });
      response.end(content);
    } else {
      // file not found, error code 404
      response.writeHeader(404);
     response.end("404 Error: File Not Found");
    }
  });
};

server.listen(process.env.PORT || port);
