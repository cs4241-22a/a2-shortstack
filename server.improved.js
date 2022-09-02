const http = require('http'),
    fs = require('fs'),
    mime = require('mime'),
    dir = 'public/',
    port = 3000

const appdata = {
    summary: {
        averageTimeAsleep: 0,
        averageSleepRating: 0,
        dreamPercentage: 0,
        numberOfRecords: 0
    },
    sleepData: []
}

const server = http.createServer(function (request, response) {
    if (request.method === 'GET') {
        handleGet(request, response)
    } else if (request.method === 'POST') {
        handlePost(request, response)
    }
})

const handleGet = function (request, response) {
    const filename = dir + request.url.slice(1)
    const url = request.url.toLowerCase();
    switch (url) {
        case '/':
            sendFile(response, 'public/index.html');
            break;
        case '/getdata':
            sendData(response);
            break;
        default:
            sendFile(response, filename)
    }
}

const handlePost = function (request, response) {
    let dataString = ''

    request.on('data', function (data) {
        dataString += data
    })

    request.on('end', function () {
        const data = JSON.parse(dataString);
        const summary = appdata.summary;

        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        yesterday.setHours(...data.timeSleep.split(':'));
        today.setHours(...data.timeWakeUp.split(':'));
        const hoursSlept = getHoursDiff(today, yesterday);

        summary.numberOfRecords++;
        summary.averageTimeAsleep += (hoursSlept - summary.averageTimeAsleep) / summary.numberOfRecords;
        summary.averageSleepRating += (data.sleepRating - summary.averageSleepRating) / summary.numberOfRecords;
        summary.dreamPercentage += (data.hadDream - summary.dreamPercentage) / summary.numberOfRecords;
        console.log(summary)
        appdata.sleepData.push(data);

        response.writeHead(200, "OK", {'Content-Type': 'text/plain'})
        response.end(JSON.stringify(summary))
    })
}

const sendData = function (response) {
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end(JSON.stringify(appdata))
}

const sendFile = function (response, filename) {
    const type = mime.getType(filename)

    fs.readFile(filename, function (err, content) {

        // if the error = null, then we've loaded the file successfully
        if (err === null) {

            // status code: https://httpstatuses.com
            response.writeHead(200, {'Content-Type': type})
            response.end(content)

        } else {

            // file not found, error code 404
            response.writeHead(404)
            response.end('404 Error: File Not Found')

        }
    })
}


const getHoursDiff = function (startDate, endDate) {
    const msInHour = 1000 * 60 * 60;
    return (Math.abs(endDate - startDate) / msInHour).toFixed(2);
}

server.listen(process.env.PORT || port)
