const http = require("http"),
  fs = require("fs"),
  mime = require("mime"),
  dir = "public/",
  port = 3000;

// initial data
const appdata = [
  {
    name: "Liliana",
    grade: "Senior",
    year: 2023,
    food: "chicken soup",
    activity: "volleyball",
  },
];

// API
const server = http.createServer(function (request, response) {
  if (request.method === "GET") {
    handleGet(request, response);
  } else if (request.method === "POST") {
    handlePost(request, response);
  } else if (request.method === "DELETE") {
    handleDelete(request, response);
  }
});

const handleGet = function (request, response) {
  const filename = dir + request.url.slice(1);

  if (request.url === "/") {
    sendFile(response, "public/index.html");
  } else if (request.url === "/data") {
    response.writeHeader(200, { "Content-type": "application/json" });
    response.end(JSON.stringify(appdata));
  } else if (request.url === "/submit") {
    response.writeHeader(200, { "Content-type": "application/json" });
    response.end(JSON.stringify(appdata));
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
    // add entry to appdata
    let newEntry = JSON.parse(dataString);
    newEntry.year = getGradYear(newEntry.grade);
    appdata[appdata.length] = newEntry;

    response.writeHeader(200, { "Content-type": "application/json" });
    response.end(JSON.stringify(appdata));
  });
};

const handleDelete = function (request, response) {
  // remove row from appdata. request url looks like /remove#
  // debugger
  const idx = parseInt(request.url.subtstring(7)); 
  appdata.splice(idx, 1);
  
  response.writeHeader(200, { "Content-type": "application/json" });
  response.end(JSON.stringify(appdata));
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

// get derived field from given grade
const getGradYear = (grade) => {
  let year = "";
  if (grade === "Freshman") {
    year = 2026;
  } else if (grade === "Sophomore") {
    year = 2025;
  } else if (grade === "Junior") {
    year = 2024;
  } else if (grade === "Senior") {
    year = 2023;
  } else {
    year = "";
  }
  return year;
};

server.listen(process.env.PORT || port);
