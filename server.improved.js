const http = require("http"),
  fs = require("fs"),
  // IMPORTANT: you must run `npm install` in the directory for this assignment
  // to install the mime library used in the following line of code
  mime = require("mime"),
  dir = "public/",
  port = 3000;

const appdata = [
  {
    todo: "Finish assignment 2",
    tag: "webware",
    due: "2022-09-08",
    priority: "RED",
  },
  {
    todo: "Read chapters 1-5",
    tag: "deepLearning",
    due: "2022-09-09",
    priority: "RED",
  },
  {
    todo: "Tableau Assignment",
    tag: "businessIntelligence",
    due: "2022-09-11",
    priority: "GREEN",
  },
  {
    todo: "MQP Research",
    tag: "MQP",
    due: "2022-09-10",
    priority: "YELLOW",
  },
  {
    todo: "Work at Foisie",
    tag: "work",
    due: "2022-09-06",
    priority: "RED",
  },
];

const priority = function (duedate) {
  const today = Date.now();
  const due = new Date(duedate);

  const diffTime = due - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (isNaN(diffDays)) {
    return "N/A";
  } else if (diffDays <= 1) {
    return "RED";
  } else if (diffDays <= 3) {
    return "YELLOW";
  } else {
    return "GREEN";
  }
};

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
  } else if (request.url === "/table") {
    response.writeHead(200, "OK", { "Content-Type": "text/plain" });
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
    let newToDo = JSON.parse(dataString);
    newToDo.priority = priority(newToDo.due);
    appdata[appdata.length] = newToDo;
    response.writeHead(200, "OK", { "Content-Type": "text/plain" });
    response.end(JSON.stringify(appdata));
  });
};

const handleDelete = function (request, response) {
  const index = request.url.substring(1);
  appdata.splice(parseInt(index), 1);
  response.writeHead(200, "OK", { "Content-Type": "text/plain" });
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

server.listen(process.env.PORT || port);
