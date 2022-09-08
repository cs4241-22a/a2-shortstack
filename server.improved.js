const http = require('http'),
  fs = require('fs'),
  // IMPORTANT: you must run `npm install` in the directory for this assignment
  // to install the mime library used in the following line of code
  mime = require('mime'),
  dir = 'public/',
  port = 3000

const appdata = [
  { playerName: "oliver", win: 0, loss: 0, winrate: 0 }
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
  } else {
    sendFile(response, filename)
  }
}

const handlePost = function (request, response) {
  let dataString = ''

  request.on('data', function (data) {
    dataString += data
  })

  request.on('end', function () {
    console.log(JSON.parse(dataString))
    // ... do something with the data here!!!
    oldName = JSON.parse(dataString).currentuser
    newName = JSON.parse(dataString).newusername

    if (oldName === '_WinCondition_') {
      const newData = appdata.map(item => {
        if (item.playerName === newName) {
          return { ...item, win: item.win+1, winrate: (((item.win + 1) / (item.loss + item.win + 1)) * 100).toFixed(2) }
        }
        return item
      })
      updateUserArray(appdata, newData)
    }
    if (oldName === '_LossCondition_') {
      const newData = appdata.map(item => {
        if (item.playerName === newName) {
          return { ...item, loss: item.loss+1, winrate: (((item.win) / (item.loss + item.win + 1)) * 100).toFixed(2) }
        }
        return item
      })
      updateUserArray(appdata, newData)
    }

    if (newName !== '') {
      if (checkValidity(appdata, newName)) {
        const newData = appdata.map(item => {
          if ("__" + item.playerName === oldName) {
            return { ...item, playerName: newName }
          }
          return item
        })
        updateUserArray(appdata, newData)
      }
      if (oldName === '_yessir_' && checkValidity(appdata, newName)) {
        appdata[appdata.length] = { playerName: newName, win: 0, loss: 0, winrate: 0 }
      }
      if (oldName === '_Delete_' && !checkValidity(appdata, newName) && appdata.length > 1) {
        removeData(appdata, newName)
      }
    }
    console.log(JSON.stringify(appdata))
    response.writeHead(200, "OK", { 'Content-Type': 'text/plain' })
    response.end(JSON.stringify(appdata))
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

function updateUserArray(oldData, newData) {
  for (let index = 0; index < newData.length; index++) {
    oldData[index] = newData[index];
  }
}

function checkValidity(data, newName) {
  let x = true;
  for (let index = 0; index < data.length; index++) {
    if (data[index].playerName !== null && data[index].playerName === newName) {
      x = false
    }
  }
  return x;
}

function removeData(data, target) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].playerName === target) {
      data.splice(i, 1)
    }
  }
}