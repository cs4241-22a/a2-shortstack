const { Console } = require("console");

const http = require("http"),
  fs = require("fs"),
  mime = require("mime"),
  dir = "public/",
  port = 3000;

const priorityDate = {
  urgent: 1,
  high: 2,
  med: 3,
  low: 4,
};

const appdata = [
  {
    priority: "high",
    type: "mqp",
    title: "Initial Sponsor Meeting",
    description: "[example text]",
    deadline: "2022-09-09 23:59",
    creation_time: "2022-9-2 11:01",
  },
  {
    priority: "urgent",
    type: "academic",
    title: "CS 4241 Assignment 2",
    description: "[example text1]",
    deadline: "2022-09-08 11:59",
    creation_time: "2022-9-2 13:10",
  },
  {
    priority: "low",
    type: "other",
    title: "Gym [LEG DAY]",
    description: "[example text2]",
    deadline: "2022-09-09 23:59",
    creation_time: "2022-9-5 18:50",
  },
];

/**
 * Adds a certain number of days to a given date.
 * @param {*} date Current date.
 * @param {*} days Days to add.
 * @returns New data with days added.
 */
const addDays = function (date, days) {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

/**
 * Creates an instance of Server
 */
const server = http.createServer(function (request, response) {
  if (request.method === "GET") {
    handleGet(request, response);
  } else if (request.method === "POST") {
    handlePost(request, response);
  }
});

/**
 * Handles the GET request from the client.
 * @param {*} request HTTP request object.
 * @param {*} response HTTP response object.
 */
const handleGet = function (request, response) {
  const filename = dir + request.url.slice(1);

  /* Request routing */
  if (request.url === "/") {
    sendFile(response, "public/index.html");
  } else {
    sendFile(response, filename);
  }
};

/**
 * Handles the POST request from the client.
 * @param {*} request HTTP request object.
 * @param {*} response HTTP response object.
 */
const handlePost = function (request, response) {
  let dataString = "";

  request.on("data", function (data) {
    dataString += data;
  });

  request.on("end", function () {
    const data = JSON.parse(dataString);

    /* Get current date and time */
    data.creation_time = new Date();

    /* Check if there is not a given deadline */
    if (!data.deadline) {
      let days = priorityDate[data.priority];
      data.deadline = addDays(data.creation_time, days);
    }

    console.log(data);

    appdata.push(data);

    response.writeHead(200, "OK", { "Content-Type": "text/plain" });
    response.end(JSON.stringify(appdata));
  });
};

const sendFile = function (response, filename) {
  /* String parsing to determine mime type */
  const type = mime.getType(filename);

  fs.readFile(filename, function (err, content) {
    /* If the error is null, then file has loaded successfully. */
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
