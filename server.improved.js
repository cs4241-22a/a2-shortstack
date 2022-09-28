console.log("S: Welcome to assignment 2!");

const http = require("http"),
  fs = require("fs"),
  // IMPORTANT: you must run `npm install` in the directory for this assignment
  // to install the mime library used in the following line of code
  mime = require("mime"),
  dir = "public/",
  port = 3000;

const appdata = {
  stats: { entries: 0, mean: null, median: null, mode: [] },
  data: [],
};

const server = http.createServer(function (request, response) {
  console.log("S: Request received: " + request.method);
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
  } else if (request.url === "/request") {
    response.writeHead(200, "OK", { "Content-Type": "text/plain" });
    response.end(JSON.stringify(appdata));
  } else {
    sendFile(response, filename);
  }
};

const handlePost = function (request, response) {
  console.log("S: Post received");
  let dataString = "";

  request.on("data", function (data) {
    dataString += data;
  });

  request.on("end", function () {
    let parsed = JSON.parse(dataString);
    let url = request.url;

    if (url === "/submit") {
      console.log("S: Added " + parsed.num + " to List " + appdata.data);
      appdata.data[appdata.data.length] = parsed.num;
    } else if (url === "/remove") {
      console.log(
        "S: Deleted # with index " + parsed.index + " from List " + appdata.data
      );
      let data = appdata.data;
      data.splice(parsed.index, 1);
      appdata.data = data;
    }

    appdata.stats = mathUpdateHelper(appdata);

    console.log("S: Final returned JSON: " + JSON.stringify(appdata));

    response.writeHead(200, "OK", { "Content-Type": "text/plain" });
    response.end(JSON.stringify(appdata));
  });
};

function mathUpdateHelper(appdata) {
  console.log("S: Recalculating Stats");
  let numbers = appdata.data.sort(function (a, b) {
    return a - b;
  });
  let total = 0,
    count = numbers.length,
    median = 0,
    modes = [],
    counts = [],
    modeNum,
    maxIndex = 0;

  for (let i in numbers) {
    total += parseFloat(numbers[i]);
    modeNum = numbers[i];
    counts[modeNum] = (counts[modeNum] || 0) + 1;
    if (counts[modeNum] > maxIndex) {
      maxIndex = counts[modeNum];
    }
  }

  for (let i in counts)
    if (counts.hasOwnProperty(i)) {
      if (counts[i] === maxIndex) {
        modes[modes.length] = i;
      }
    }

  if (count % 2 == 0)
    median =
      (parseFloat(numbers[count / 2 - 1]) + parseFloat(numbers[count / 2])) / 2;
  else median = numbers[(count - 1) / 2];

  const stats = {
    entries: count,
    total: total,
    mean: Math.round((total / count) * 1000) / 1000,
    median: Math.round(median * 1000) / 1000,
    mode: modes,
  };

  return stats;
}

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
