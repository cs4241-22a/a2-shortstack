const http = require("http"),
  fs = require("fs"),
  // IMPORTANT: you must run `npm install` in the directory for this assignment
  // to install the mime library used in the following line of code
  mime = require("mime"),
  dir = "public/",
  port = 3000;

const coursedata = [
  { cname: "Webware", term: "a", weekly: "2" },
  { cname: "Biology", term: "a", weekly: "2" },
];

const assigndata = [
  {
    assignment: "A2",
    coursesel: "Webware",
    due: "09/08/2022",
    priority: "high",
  },
  {
    assignment: "Case Study 3",
    coursesel: "Biology",
    due: "09/15/2022",
    priority: "low",
  },
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
  } else if (request.url === "/getCourses") {
    response.writeHead(200, "OK", { "Content-Type": "application/json" });
    response.end(JSON.stringify(coursedata));
  } else if (request.url === "/getAssignments") {
    response.writeHead(200, "OK", { "Content-Type": "application/json" });
    response.end(JSON.stringify(assigndata));
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
    if (request.url === "/submitCourse") {
      coursedata.push(JSON.parse(dataString));
      response.writeHead(200, "OK", { "Content-Type": "text/plain" });
      response.end(JSON.stringify(coursedata));
    }

    if (request.url === "/submitAssignment") {
      assigndata.push(JSON.parse(dataString));
      response.writeHead(200, "OK", { "Content-Type": "text/plain" });
      response.end(JSON.stringify(assigndata));
    }

    if (request.url === "/delAssignment") {
      let index = parseInt(dataString);
      assigndata.splice(index, 1);
      response.writeHead(200, "OK", { "Content-Type": "text/plain" });
      response.end(JSON.stringify(assigndata));
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
