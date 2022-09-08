const { log } = require("console");

const http = require("http"),
  fs = require("fs"),
  // IMPORTANT: you must run `npm install` in the directory for this assignment
  // to install the mime library used in the following line of code
  mime = require("mime"),
  dir = "public/",
  port = 3000;

const yahooFinance = require("yahoo-finance2").default;

const stocks = [
  { symbol: "tsla", price: 0, dateAdded: new Date() },
  { symbol: "amzn", price: 0, dateAdded: new Date() },
  { symbol: "f", price: 0, dateAdded: new Date() },
];

const server = http.createServer(function (request, response) {
  if (request.method === "GET") {
    handleGet(request, response);
  } else if (request.method === "POST") {
    handlePost(request, response);
  }
});

const handleGet = async function (request, response) {
  const filename = dir + request.url.slice(1);

  if (request.url === "/") {
    sendFile(response, "public/index.html");
  } //check for a request for stocks
  else if (request.url === "/stocks") {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(stocks));
  }
  //url is /stock with a symbol as a query parameter
  else if (request.url.startsWith("/stock?")) {
    //get the symbol from the query parameter
    let symbol = request.url.split("=")[1];
    //get the stock data from the api
    let stockData = await getStockData(symbol);
    //send the symbol back to the client
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(stockData));
  } else if (request.url.startsWith("/historical?")) {
    // console.log("historical request for " + request.url);
    let query = request.url.split("=")[1];
    const pastDate = new Date();
    pastDate.setFullYear(pastDate.getFullYear() - 2);
    const pastDateString = pastDate.toISOString().split("T")[0];
    const queryOptions = { period1: pastDateString, interval: "1wk" };
    const result = await yahooFinance.historical(query, queryOptions);

    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(result));
  } else {
    sendFile(response, filename);
  }
};

const getStockData = async function (symbol) {
  const results = await yahooFinance.quote(symbol.toUpperCase());
  // console.log(results);
  return results;
};

const handlePost = async function (request, response) {
  let dataString = "";

  request.on("data", function (data) {
    dataString += data;
  });

  request.on("end", async function () {
    let dataObject = JSON.parse(dataString);
    // console.log(dataObject);

    if (request.url === "/submit") {
      //if the stock is not already in the array, add it
      if (stocks.find((stock) => stock.symbol === dataObject.stockinput)) {
        console.log("stock already in array");
        response.writeHead(406, { "Content-Type": "application/json" });
        response.end(
          JSON.stringify({ message: "ERROR: stock already in array" })
        );
      } else if (dataObject.stockinput !== "") {
        //check that the stock is valid
        let stockData = await getStockData(dataObject.stockinput);
        if (stockData === undefined) {
          console.log("stock not found");
          response.writeHead(404, { "Content-Type": "application/json" });
          response.end(JSON.stringify({ message: "ERROR: stock not found" }));
        } else {
          //add the stock to the array with the date right now
          const newStock = {
            symbol: dataObject.stockinput.toLowerCase(),
            price: stockData.regularMarketPrice, //derived field
            dateAdded: new Date(),
          };
          stocks.push(newStock);

          response.writeHead(200, "OK", { "Content-Type": "application/json" });
          response.end(JSON.stringify(newStock));
        }
      }
    } else if (request.url === "/delete") {
      //find the stock in the array
      let stock = stocks.find(
        (stock) => stock.symbol === dataObject.stockinput
      );
      //if the stock is in the array, remove it
      if (stock) {
        stocks.splice(stocks.indexOf(stock), 1);
        response.writeHead(200, "OK", { "Content-Type": "text/plain" });
        response.end("Removed stock from array");
      } else {
        response.writeHead(404, "Not Found", { "Content-Type": "text/plain" });
        response.end("Stock not found in array");
      }
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
