const http = require("http"),
    fs = require("fs"),
    mime = require("mime"),
    dir = "public/",
    port = 3000;

let appdata = [
    {
        show: "Game of Thrones",
        seasons: 8,
        episodes: 10,
        duration: 60,
        totalTime: 80.0,
    },
    {
        show: "House of the Dragon",
        seasons: 1,
        episodes: 10,
        duration: 60,
        totalTime: 10.0,
    },
    {
        show: "Once Upon a Time",
        seasons: 7,
        episodes: 24,
        duration: 45,
        totalTime: 126.0,
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
        sendFile(response, filename);
    }
};

const handlePost = function (request, response) {
    let dataString = "";

    request.on("data", function (data) {
        dataString += data;
    });

    request.on("end", function () {
        json = JSON.parse(dataString);
        // parse the appropriate fields to ints for data storage purposes
        json.seasons = parseInt(json.seasons);
        json.eps = parseInt(json.eps);
        json.duration = parseInt(json.duration);

        // compute a derived attribute, total time required to watch the entire show
        let totalTime = (
            (json.seasons * json.eps * json.duration) /
            60
        ).toFixed(2);
        json.totalTime = parseFloat(totalTime); // add the derived attribute to the JSON

        appdata = [...appdata, json]; // update the application's global "database"

        response.writeHead(200, "OK", {
            "Content-Type": "text/plain",
        });

        response.end(JSON.stringify(appdata));
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
            // file not found
            response.writeHeader(404);
            response.end("404 Error: File Not Found");
        }
    });
};

server.listen(process.env.PORT || port);