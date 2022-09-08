const { Console } = require('console');

const http = require('http'),
  fs = require('fs'),
  // IMPORTANT: you must run `npm install` in the directory for this assignment
  // to install the mime library used in the following line of code
  mime = require('mime'),
  dir = 'public/',
  port = 3000

const appdata = [
  { "todo": "do dishes", "time": "2022-10-21T11:02", priority: '0' },
  { "todo": "webware assignment", "time": "2022-10-22T11:02", priority: '1' },
  { "todo": "clean room", "time": "2022-10-23T11:02" , priority: '2'},
];

const server = http.createServer(function (request, response) {
  if (request.method === 'GET') {
    handleGet(request, response)
  } else if (request.method === 'POST') {
    handlePost(request, response)
  } else if (request.method === 'DELETE') {
    handleDelete(request, response)
  }
})

const handleGet = function (request, response) {
  const filename = dir + request.url.slice(1)

  if (request.url === '/') {
    sendFile(response, 'public/index.html')
  } else if (request.url === '/getData') {
    response.writeHeader(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify(appdata))
  } else {
    sendFile(response, filename)
  }
}

const handleDelete = function (request, response) {
  if (request.url === '/remove') {
    let dataString = ''

    request.on('data', function (data) {
      dataString += data
    })

    request.on('end', function () {
      const data = JSON.parse(dataString);

      //find and delete data
      for (let i = 0; i < appdata.length; i++) {
        if (appdata[i].todo === data.todo) {
          appdata.splice(i, 1)
        }
      }

      response.writeHead(200, "OK", { 'Content-Type': 'text/plain' })
      response.end()
    })
  }
}

const handlePost = function (request, response) {
  let dataString = ''

  request.on('data', function (data) {
    dataString += data
  })

  request.on('end', function () {
    const data = JSON.parse(dataString);
    const dataTime = new Date(data.time);

    if (appdata.length > 0) {
      for (let i = 0; i < appdata.length; i++) {
        let date1 = new Date(appdata[i].time);
        if (dataTime < date1) {
          data.priority = i.toString();
          appdata.splice(i, 0, data);
          changePriorities(i);
          break;
        }

      }
    } else {
      data.priority = '0';
      appdata.splice(0, 0, data);
    }
    response.writeHead(200, "OK", { 'Content-Type': 'text/plain' })
    response.end()
  })
}

function changePriorities(index){
  for (let i = index; i < appdata.length; i++) {
    appdata[i].priority = (i+1).toString();
  }
  console.log(appdata);
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
