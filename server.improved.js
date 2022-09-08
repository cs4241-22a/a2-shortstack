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

    if (request.url === '/') {
        sendFile(response, 'public/index.html');
    } else if (request.url === '/fetchData') {
        response.writeHeader(200, { "Content-Type": "text/plain" });
        response.end(JSON.stringify(appdata));
    } else {
        sendFile(response, filename);
    }
};

const handlePost = function (request, response) {
    let dataString = '';

    request.on('data', function (data) {
        dataString += data;
    });

    request.on('end', function () {
        // ... do something with the data here!!!
        if (request.url === '/submit') {
            appdata.push(JSON.parse(dataString));
        } else if (request.url === '/delete') {
            console.log(JSON.parse(dataString));
            deleteData(JSON.parse(dataString));
        }

        for (let i = 0; i < appdata.length; i++) {
            let response = appdata[i];
            response.tdee = tdeeCalculation(response.gender, response.age, response.weight, response.height, response.activity);
        }
        response.writeHead(200, "OK", { 'Content-Type': 'text/plain' });
        response.end();
    });
};

const deleteData = function (jsonData) {
    //console.log(appdata);
    appdata.splice(jsonData["delResponse"], 1);
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

function tdeeCalculation(gender, age, weight, height, activity) {
    let tdee = 0;
    if (gender === "Female"){
        tdee = (665 + (9.6 * weight) + (1.8 * height) - (4.7 * age)) * activity + 250
    }
    else{
        tdee = (66 + (13.7 * weight) + (5 * height) - (6.8 * age)) * activity + 250
    }

    return tdee;
}