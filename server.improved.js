const http = require("http"),
  fs = require("fs"),
  // IMPORTANT: you must run `npm install` in the directory for this assignment
  // to install the mime library used in the following line of code
  mime = require("mime"),
  dir = "public/",
  port = 3000;

const appdata = [
  { Name: "Mark", Clicks: 114, CPS: 11.4, Rating: "Above Average" },
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
  } else if (request.url === "/getScores") {
    response.writeHeader(200, { "Content-Type": "text/plain" });
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
    let newData = JSON.parse(dataString);
    console.log(JSON.parse(dataString));
    if (request.url === "/submit") {
      let seen = false;
      for (let i = 0; i < appdata.length; i++) {
        let response = appdata[i];
        if (response.Name.toLowerCase() === newData.Name.toLowerCase()){
          seen = true;
          if (newData.Clicks > response.Clicks){
            response.Clicks = newData.Clicks;
            response.CPS = newData.CPS;
          }
        }
      }
      if (seen === false){
        appdata.push(newData);
      }
    }

    // ... do something with the data here!!!
    for (let i = 0; i < appdata.length; i++) {
      let response = appdata[i];
      response.Rating = rater(response.CPS);
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

function rater(cps) {
  let rating = "Average";
  if (cps < 4) {
    rating = "Below Average";
  } else if (cps > 7) {
    rating = "Above Average";
  }
  return rating;
}
