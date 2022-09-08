"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Datastore = require('nedb');
const http = require('http'), fs = require('fs'), 
// IMPORTANT: you must run `npm install` in the directory for this assignment
// to install the mime library used in the following line of code
mime = require('mime'), dir = 'public/', port = 3000;
// Create message database
const messagesDB = new Datastore({ filename: './messages.json', autoload: true });
const messages = [
    { timeCreated: new Date(), color: "#ffffff", message: "Test" }
];
const server = http.createServer(function (request, response) {
    if (request.method === 'GET') {
        handleGet(request, response);
    }
    else if (request.method === 'POST') {
        handlePost(request, response);
    }
    else if (request.method === 'DELETE') {
        handleDelete(request, response);
    }
});
const handleGet = function (request, response) {
    if (request === undefined)
        throw new TypeError("request cannot be undefined");
    const filename = dir + request.url?.slice(1);
    if (request.url === '/') {
        sendFile(response, 'public/index.html');
    }
    else if (request.url === '/messages') {
        // If messages are requested, send a .json of all messages on the server
        request.on('data', (data) => console.log(data))
            .on('end', function () {
            response.writeHead(200, "OK", { 'Content-Type': 'text/plain' });
            // Sort database then send JSON
            messagesDB.find({}).sort({ timeCreated: 1 }).exec((err, docs) => {
                response.end(JSON.stringify(docs));
            });
        });
    }
    else {
        sendFile(response, filename);
    }
};
const handlePost = function (request, response) {
    let dataString = '';
    request.on('data', function (data) {
        dataString += data;
    });
    request.on('end', function () {
        const data = JSON.parse(dataString);
        // Update timecreated to server time
        data.timeCreated = new Date();
        messagesDB.insert(data, (err, newDoc) => {
            response.writeHead(200, "OK", { 'Content-Type': 'text/plain' });
            response.end(dataString);
            // Notify
        });
    });
};
function handleDelete(request, response) {
    if (request.url === '/remove')
        request.on('data', (dataString) => {
            const data = JSON.parse(dataString);
            // Remove from database by sorting by date then removing index
            messagesDB.find({}).sort({ timeCreated: 1 }).exec((err, docs) => {
                messagesDB.remove(docs[data.index]);
            });
        })
            .on('end', function () {
            response.writeHead(200, "OK", { 'Content-Type': 'text/plain' });
            response.end();
        });
}
const sendFile = function (response, filename) {
    const type = mime.getType(filename);
    fs.readFile(filename, function (err, content) {
        // if the error = null, then we've loaded the file successfully
        if (err === null) {
            // status code: https://httpstatuses.com
            response.writeHead(200, { 'Content-Type': type });
            response.end(content);
        }
        else {
            // file not found, error code 404
            response.writeHead(404);
            response.end('404 Error: File Not Found');
        }
    });
};
server.listen(process.env.PORT || port);
