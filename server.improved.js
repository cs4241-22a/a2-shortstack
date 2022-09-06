const { debug } = require("console");
const { PassThrough } = require("stream");

const http = require("http"),
  fs = require("fs"),
  // IMPORTANT: you must run `npm install` in the directory for this assignment
  // to install the mime library used in the following line of code
  mime = require("mime"),
  dir = "public/",
  port = 3000;

const appdata = [
  { Quest: "Do laudary", Category: "Life", Done: false },
  { Quest: "Make a fully working website", Category: "School", Done: false },
  { Quest: "Break a world record", Category: "Challenge", Done: false },
  {
    Quest: "Beat Kurry in a basketball game",
    Category: "Challenge",
    Done: false,
  },
  { Quest: "Win the championship in FIFA", Category: "Challenge", Done: false },
  {
    Quest: "Create a world top 500 company in one day",
    Category: "Challenge",
    Done: false,
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
  } else {
    /*
    const html = `
    <html>
    <body>
      ${ appdata.map(item => JSON.stringify(item)) }
    </body>
    </html>
    `
    */
    sendFile(response, filename);
  }
};

const handlePost = function (request, response) {
  let dataString = "";

  request.on("data", function (data) {
    dataString += data;
  });
  request.on("end", function () {
    if (dataString === "GetAllData") {
      response.end(JSON.stringify(appdata));
    } else {
      const input = JSON.parse(dataString);
      const keyword = input.yourname;

      // ... do something with the data here!!!
      const count = appdata.length;
      const Out_lst = [];
      for (let i = 0; i < count; i++) {
        if (appdata[i].Category === keyword) {
          Out_lst.push(appdata[i]);
        }
      }
      const count_lst = Out_lst.length;
      const rdm_k = function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };
      const rdm_key = rdm_k(0, count_lst - 1);
      const Output_val = Out_lst[rdm_key];

      response.writeHead(200, "OK", { "Content-Type": "text/plain" });
      response.end(JSON.stringify(Output_val));
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
