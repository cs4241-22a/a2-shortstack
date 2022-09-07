const http = require("http"),
  fs = require("fs"),
  // IMPORTANT: you must run `npm install` in the directory for this assignment
  // to install the mime library used in the following line of code
  mime = require("mime"),
  bent = require("bent"),
  dir = "public/",
  port = 3000;

const getJSON = bent("json");

const stocks = [
  { symbol: "tsla", price: 100.0, dateAdded: new Date() },
  { model: "amzn", price: 50.0, dateAdded: new Date() },
  { model: "ford", price: 10.0, dateAdded: new Date() },
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
  } //check for a request for stocks
  else if (request.url === "/stocks") {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(stocks));
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
    let dataObject = JSON.parse(dataString);
    console.log(dataObject);

    const url =
      "https://query1.finance.yahoo.com/v8/finance/chart/" +
      dataObject["stockinput"] +
      "?region=US&lang=en-US&includePrePost=false&interval=2m&useYfid=true&range=1d&corsDomain=finance.yahoo.com&.tsrc=finance";

    getJSON(url)
      .then((res) => {
        //log the data
        console.log(res.chart.result[0].meta.regularMarketPrice);
        //send the data back to the client
        response.writeHeader(200, { "Content-Type": "application/json" });
        response.end(
          JSON.stringify(res.chart.result[0].meta.regularMarketPrice)
        );
      }) //catch any errors
      .catch((err) => {
        console.log(err);
      });

    // ... do something with the data here!!!

    response.writeHead(200, "OK", { "Content-Type": "text/plain" });
    response.end("post received");
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
