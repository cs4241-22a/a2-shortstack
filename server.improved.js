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
  });

  request.on("end", function () {
    console.log(JSON.parse(dataString));
    
    const newEntry = JSON.parse(dataString);
    var month = newEntry.month;
    if (typeof newEntry.month != "number") {
      switch (newEntry.month) {
        case "January":
          month = "1";
          break;
        case "February":
          month = "2";
          break;
        case "March":
          month = "3";
          break;
        case "April":
          month = "4";
          break;
        case "May":
          month = "5";
          break;
        case "June":
          month = "6";
          break;
        case "July":
          month = "7";
          break;
        case "August":
          month = "8";
          break;
        case "September":
          month = "9";
          break;
        case "October":
          month = "10";
          break;
        case "November":
          month = "11";
          break;
        case "December":
          month = "12";
          break;
      }
    }
    const dateString =
      newEntry.year + "-" + newEntry.month + "-" + newEntry.day;
    newEntry.yearsPast = getAge(dateString);

    console.log(newEntry);
    appdata.push(newEntry);

    response.writeHead(200, "OK", { "Content-Type": "text/plain" });
    response.write(JSON.stringify(appdata));

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

function getAge(dateString) {
  var ageInMS = new Date() - new Date(dateString);
  return Math.floor(ageInMS / 1000 / 60 / 60 / 24 / 365);
}

server.listen(process.env.PORT || port);
