const http = require("http"),
  fs = require("fs"),
  // IMPORTANT: you must run `npm install` in the directory for this assignment
  // to install the mime library used in the following line of code
  mime = require("mime"),
  utility = require("./utility");
(dir = "public/"), (port = 3000);

// [{playerName, playerScore, winResult, playerTotalScoreInWins}...]
let currentData = [];

const server = http.createServer(function (request, response) {
  if (request.method === "GET") {
    handleGet(request, response);
  } else if (request.method === "POST") {
    handlePost(request, response);
  } else if (request.method === "PUT") {
    handlePut(request, response);
  } else if (request.method === "DELETE") {
    handleDelete(request, response);
  }
});

const handleGet = function (request, response) {
  const filename = dir + request.url.slice(1);

  if (request.url === "/") {
    sendFile(response, "public/index.html");
  } else if (request.url === "/currentdata") {
    response.writeHeader(200, { "Content-Type": mime.getType("json") });
    response.end(JSON.stringify(currentData));
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
    const json = JSON.parse(dataString);
    console.log(json);
    const { rowData } = json;

    const transformedData = utility.addDerivedField(currentData, rowData);
    currentData.push(transformedData);

    response.writeHead(200, "OK", { "Content-Type": mime.getType("json") });
    response.end(JSON.stringify(currentData));
  });
};

const handlePut = function (request, response) {
  let dataString = "";

  request.on("data", function (data) {
    dataString += data;
  });

  request.on("end", function () {
    const json = JSON.parse(dataString);
    const { rowData, rowIndex } = json;

    // Delete the element we are modifying and add new element to the back of the array
    currentData.splice(rowIndex, 1);
    const transformedData = utility.addDerivedField(currentData, rowData);
    currentData.push(transformedData);

    response.writeHead(200, "OK", { "Content-Type": mime.getType("json") });
    response.end(JSON.stringify(currentData));
  });
};

const handleDelete = function (request, response) {
  let dataString = "";

  request.on("data", function (data) {
    dataString += data;
  });

  request.on("end", function () {
    const json = JSON.parse(dataString);
    const { rowIndex } = json;

    currentData.splice(rowIndex, 1);

    response.writeHead(200, "OK", { "Content-Type": mime.getType("json") });
    response.end(JSON.stringify(currentData));
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
