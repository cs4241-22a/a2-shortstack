const http = require("http"),
  fs = require("fs"),
  // IMPORTANT: you must run `npm install` in the directory for this assignment
  // to install the mime library used in the following line of code
  mime = require("mime"),
  dir = "public/",
  port = 3000;

// const appdata = [
//   { model: "toyota", year: 1999, mpg: 23 },
//   { model: "honda", year: 2004, mpg: 30 },
//   { model: "ford", year: 1987, mpg: 14 },
// ];
const appdata = [
  { task: "do Homework", date: "2022-10-09", dateTil: "example" },
];

const server = http.createServer(function (request, response) {
  if (request.method === "GET") {
    handleGet(request, response);
  } else if (request.method === "POST") {
    handlePost(request, response);
  }
});

const handleGet = function (request, response) {
  const filename = dir + request.url.slice(1);

  if (request.url === "/") {
    sendFile(response, "public/index.html");
  } else if (request.url === "/getTable") {
    //getting data from appdata
    response.writeHeader(200, { "Content-Type": "text/plain" });
    response.end(JSON.stringify(appdata));
  } else {
    sendFile(response, filename);
  }
};

const handlePost = function (request, response) {
  let dataString = "";
  let jsonData = "";

  request.on("data", function (data) {
    dataString += data;
  });

  request.on("end", function () {
    console.log(JSON.parse(dataString));
    jsonData = JSON.parse(dataString);

    // ... do something with the data here!!!
    if (request.url === "/submit") {
      console.log(jsonData); //debug
      appdata.push(jsonData); //pushing/adding data to appdata
    } else if (request.url === "/delete") {
      console.log(jsonData); //debug
      appdata.splice(jsonData["deletingResponse"], 1); //deleting row
    }

    response.writeHead(200, "OK", { "Content-Type": "text/plain" });
    response.end();
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
