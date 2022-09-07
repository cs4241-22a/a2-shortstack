const http = require('http'),
  fs = require('fs'),
  // IMPORTANT: you must run `npm install` in the directory for this assignment
  // to install the mime library used in the following line of code
  mime = require('mime'),
  dir = 'public/',
  port = 3000

let tasks = []

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
  } else if (request.url === '/gettasks') {
    response.writeHead(200, "OK", { 'Content-Type': 'text/plain' })
    response.end(JSON.stringify(render(tasks)))
  } else {
    sendFile(response, filename)
  }
}

const handlePost = function (request, response) {
  if (request.url === '/submit') {
    handleSubmit(request, response)
  }
  if (request.url === '/remove') {
    handleRemove(request, response)
  }
  if (request.url === '/update') {
    handleUpdate(request, response)
  }
}

const handleUpdate = function (request, response) {
  let dataString = ''
  request.on('data', function (data) {
    dataString += data
  })

  request.on('end', function () {
    data = JSON.parse(dataString)
    debugger
    if (data.taskname.length > 0 && data.dueDate.length > 0 && (!tasks.find(n => n.taskname === data.taskname) || data.taskname === data.oldtaskname)) {
      let today = new Date();
      let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      data.dateCreated = date
      let dayMS = 24 * 60 * 60 * 1000
      let priority = 'low'
      let parts = data.dueDate.split('-');
      let dueDate = new Date(parts[0], parts[1] - 1, parts[2]);
      let timeDiff = dueDate.getTime() - today.getTime()//1-3 high 3-5 medium 6+ low
      let dayDiff = timeDiff / dayMS
      if (dayDiff <= 5) {
        priority = 'medium'
      }
      if (dayDiff <= 3) {
        priority = 'high'
      }
      data.priority = priority
      // console.log(data)
      tasks = tasks.filter(e => e.taskname !== data.oldtaskname)
      delete data.oldtaskname
      tasks.push(data)

      response.writeHead(200, "OK", { 'Content-Type': 'text/plain' })
      response.end(JSON.stringify(render(tasks)))
    } else {
      response.writeHead(200, "Bad Input", { 'Content-Type': 'text/plain' })
      response.end(JSON.stringify({ message: data.taskname.length === 0 ? 'A name for the task must be provided' : data.dueDate.length > 0 ? 'A task with this name already exists' : 'A date for the task must be provided' }))
    }
  })
}

const handleRemove = function (request, response) {
  let dataString = ''
  request.on('data', function (data) {
    dataString += data
  })

  request.on('end', function () {
    // console.log(dataString)
    data = JSON.parse(dataString)
    // console.log(data)
    tasks = tasks.filter(e => e.taskname !== data)
    response.writeHead(200, "OK", { 'Content-Type': 'text/plain' })
    response.end(JSON.stringify(render(tasks)))
  })
}

const handleSubmit = function (request, response) {
  let dataString = ''
  request.on('data', function (data) {
    dataString += data
  })

  request.on('end', function () {
    data = JSON.parse(dataString)
    if (data.taskname.length > 0 && data.dueDate.length > 0 && !tasks.find(n => n.taskname === data.taskname)) {
      let today = new Date();
      let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      data.dateCreated = date
      let dayMS = 24 * 60 * 60 * 1000
      let priority = 'low'
      let parts = data.dueDate.split('-');
      let dueDate = new Date(parts[0], parts[1] - 1, parts[2]);
      let timeDiff = dueDate.getTime() - today.getTime()//1-3 high 3-5 medium 6+ low
      let dayDiff = timeDiff / dayMS
      if (dayDiff <= 5) {
        priority = 'medium'
      }
      if (dayDiff <= 3) {
        priority = 'high'
      }
      data.priority = priority
      // console.log(data)
      tasks.push(data)

      response.writeHead(200, "OK", { 'Content-Type': 'text/plain' })
      response.end(JSON.stringify(render(tasks)))
    }
    else {
      response.writeHead(200, "Bad Input", { 'Content-Type': 'text/plain' })
      response.end(JSON.stringify({ message: data.taskname.length === 0 ? 'A name for the task must be provided' : data.dueDate.length > 0 ? 'A task with this name already exists' : 'A date for the task must be provided' }))
    }
  })
}

const render = function (data) {
  return tasks.map(element => {
    return {
      html: `<div class="task-card" id="${element.taskname}">
                <div class="task-block">
                  <img class="pencil" src="pencil.png"/>
                  <div class="task-info">
                    <h2>${element.taskname}</h2>
                    <p>Due: ${element.dueDate}<p>
                  </div>
                  <img class="check" src="check.png"/>
                </div>
                <hr>
              </div>`,
      ...element
    }
  })
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
