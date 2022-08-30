const http = require('http'),
    fs = require('fs'),
    // IMPORTANT: you must run `npm install` in the directory for this assignment
    // to install the mime library used in the following line of code
    mime = require('mime'),
    dir = 'public/',
    port = 3000

// All times are in EST
const appdata = [
    {'task': 'finish this project!', 'creation_date': '2022-09-02T12:06', 'due_date': '2022-09-08T11:59', 'priority': 'medium'},
    {'task': 'go grocery shopping', 'creation_date': '2022-08-29T18:31', 'due_date': '2022-08-31T23:59', 'priority': 'high'},
    {'task': 'email professor', 'creation_date': '2022-08-27T17:25', 'due_date': '2022-10-31T23:59', 'priority': 'low'}
]

const server = http.createServer((request, response) => {
    if (request.method === 'GET') {
        handleGet(request, response)
    } else if (request.method === 'POST') {
        handlePost(request, response)
    } else if (request.method === 'DELETE') {
        handleDelete(request, response)
    }
})

// GET: Get the web page, file, or the list of notes
const handleGet = function (request, response) {
    const filename = dir + request.url.slice(1)

    if (request.url === '/') {
        sendFile(response, 'public/index.html')
    } else if (request.url === '/list') {
        sendList(response)
    } else {
        sendFile(response, filename)
    }
}

// POST: add a note
const handlePost = function (request, response) {
    let dataString = ''
    request.on('data', (data) => {
        dataString += data
    })

    request.on('end', () => {
        // Add task to list
        let newTask = JSON.parse(dataString)
        newTask.creation_date = newTask.creation_date.substring(0, 16) // Makes it up to minute only
        newTask.priority = determinePriority(newTask.creation_date, newTask.due_date)
        appdata[appdata.length] = newTask

        response.writeHead(200, "OK", {'Content-Type': 'text/plain'})
        response.end()
    })
}

// DELETE: Delete a note
const handleDelete = function (request, response) {
    // Remove from list, and resend table
    let num = request.url.substring(1)
    appdata.splice(parseInt(num), 1)
    sendList(response)
}

const sendFile = function (response, filename) {
    const type = mime.getType(filename)

    fs.readFile(filename, function (err, content) {

        // if the error = null, then we've loaded the file successfully
        if (err === null) {

            // status code: https://httpstatuses.com
            response.writeHeader(200, {'Content-Type': type})
            response.end(content)

        } else {

            // file not found, error code 404
            response.writeHeader(404)
            response.end('404 Error: File Not Found')

        }
    })
}

const sendList = function (response) {
    let html = '<table><tr><th>Task</th><th>Creation Date</th><th>Due Date</th><th>Priority</th><th>Delete</th></tr>'
    let idx = 0
    for (let todo of appdata) {
        html += '<tr>'
        html += '<th>' + todo.task + '</th>'
        html += '<th>' + todo.creation_date + '</th>'
        html += '<th>' + todo.due_date + '</th>'
        html += '<th>' + todo.priority + '</th>'
        html += '<th><button class="deleteNote">X</button></th>'
        html += '</tr>'
        idx++
    }
    html += '</table>'
    response.writeHeader(200, {'Content-Type': 'text/html'})
    response.end(html)
}

const determinePriority = function (creation_date, due_date) {
    const seconds_in_day = 86400
    const start = new Date(creation_date)
    const end = new Date(due_date)

    const timeDifference = (end - start) / 1000;

    if (timeDifference < seconds_in_day * 3) // Less than 2 days
        return 'high'
    else if (timeDifference < seconds_in_day * 7) // Less than 7 days
        return 'medium'
    else
        return 'low'
}

server.listen(process.env.PORT || port)
