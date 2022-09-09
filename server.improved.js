const http = require("http"),
  fs = require("fs"),
  // IMPORTANT: you must run `npm install` in the directory for this assignment
  // to install the mime library used in the following line of code
  mime = require("mime"),
  dir = "public/",
  port = 3000;

const appdata = [];

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
  } else {
    sendFile(response, filename);
  }
};

const handlePost = function (request, response) {
  let dataString = "";

  request.on("data", function (data) {
    dataString += data;
    console.log(data);
  });

  request.on("end", function () {
    console.log(JSON.parse(dataString));
    if (request.url === "/submit") {
      let item = JSON.parse(dataString);
      item.init += item.data.charAt();
      item.init += item.data2.charAt();
      item.init += item.data3.charAt();

      appdata.push(item);
      console.log(item);
    } else if (request.url === "/delete") {
      let i = JSON.parse(dataString).index;
      appdata.splice(i, 1);
    }

    response.writeHead(200, "OK", { "Content-Type": "text/plain" });

    response.end(JSON.stringify(appdata));
  });
};

const sendFile = function (response, filename) {
  const type = mime.getType(filename);

  fs.readFile(filename, function (err, content) {
    if (err === null) {
      // status code: https://httpstatuses.com
      response.writeHeader(200, { "Content-Type": type });
      response.end(content);
    } else {
      response.writeHeader(404);
      response.end("404 Error: File Not Found");
    }
  });
};

server.listen(process.env.PORT || port);
