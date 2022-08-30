const http = require('http'),
  fs = require('fs'),
  mime = require('mime'),
  dir = 'public/',
  port = 3000



const statsData = [
  { "id": 0, "date": "2022-08-27", "hits": 2, "atBats": 3, "avg": 2 / 3 },
  { "id": 1, "date": "2022-08-28", "hits": 3, "atBats": 3, "avg": 1 },
  { "id": 2, "date": "2022-08-29", "hits": 1, "atBats": 3, "avg": 1 / 3 }
]

const server = http.createServer(function (request, response) {
  if (request.method === 'GET') {
    handleGet(request, response)
  } else if (request.method === 'POST') {
    handlePost(request, response)
  }
})

const handleGet = function (request, response) {
  const filename = dir + request.url.slice(1)

  if (request.url === '/') {
    sendFile(response, 'public/index.html')
  } else if (request.url === "/games") {
    response.writeHeader(200, { 'Content-Type': "applcation/json" })
    response.end(JSON.stringify(statsData))
  } else {
    sendFile(response, filename)
  }
}

const handlePost = function (request, response) {
  let dataString = ''

  if (request.url === "/games") {

    request.on('data', function (data) {
      dataString += data
    })

    request.on('end', function () {
      const requestData = JSON.parse(dataString);
      const requestGameObject = {
        id: statsData.length,
        date: requestData.dateValue,
        hits: requestData.hitsValue,
        atBats: requestData.atBatsValue,
        avg: requestData.hitsValue/requestData.atBatsValue
      }
      

      statsData.push(requestGameObject)

      response.writeHead(200, "OK", { 'Content-Type': 'text/plain' })
      response.end(JSON.stringify(requestGameObject))
    })
  }
}

const sendFile = function (response, filename) {
  const type = mime.getType(filename)

  fs.readFile(filename, function (err, content) {

    // if the error = null, then we've loaded the file successfully
    if (err === null) {

      // status code: https://httpstatuses.com
      response.writeHeader(200, { 'Content-Type': type })
      response.end(content)

    } else {

      // file not found, error code 404
      response.writeHeader(404)
      response.end('404 Error: File Not Found')

    }
  })
}

server.listen(process.env.PORT || port)
