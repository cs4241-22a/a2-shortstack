const http = require( 'http' ),
      fs   = require( 'fs' ),
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

//some example data!!
const appdata = [
  {
    bookName: "A Dance with Dragons",
    authorName: "George R.R. Martin",
    totalPages: "150",
    pagesRead: "10",
    pagesLeft: "140",
  },
  {
    bookName: "Moby Dick",
    authorName: "Herman Melville",
    totalPages: "200",
    pagesRead: "10",
    pagesLeft: "190",
  },
];

//creating server
const server = http.createServer(function (request, response) {
  if (request.method === "GET") {
    handleGet(request, response);
  } else if (request.method === "POST") {
    handlePost(request, response);
  }
});

//getting data
const handleGet = function (request, response) {
  const filename = dir + request.url.slice(1);

  if (request.url === "/") {
    sendFile(response, "public/index.html");
  } else if (request.url === "/load") {
    const type = mime.getType(appdata);
    response.writeHeader(200, { "Content-Type": type });
    response.end(JSON.stringify(appdata));
  } else {
    sendFile(response, filename);
  }
};

//delete, edit, submit
const handlePost = function (request, response) {
  let dataString = "";
  request.on("data", function (data) {
    dataString += data;
  });

  request.on("end", function () {
    if (request.url === "/submit") {
      const json = JSON.parse(dataString);
      json.pagesLeft = json.totalPages - json.pagesRead;
      appdata.push(json);
      response.writeHead(200, "OK", { "Content-Type": "text/plain" });
      response.end(JSON.stringify(appdata));
    } else if (request.url === "/remove") {
      const json = JSON.parse(dataString);
      appdata.splice(json.index, 1);
      response.writeHead(200, "OK", { "Content-Type": "text/plain" });
      response.end(JSON.stringify(appdata));
    } 
  });
};

const sendFile = function (response, filename) {
  const type = mime.getType(filename);

  fs.readFile(filename, function (err, content) {
    if (err === null) {
      response.writeHeader(200, { "Content-Type": type });
      response.end(content);
    } else {
      response.writeHeader(404);
      response.end("404 Error: File Not Found");
    }
  });
};

server.listen( process.env.PORT || port )
