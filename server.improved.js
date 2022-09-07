const http = require('http'),
    fs = require('fs'),
    // IMPORTANT: you must run `npm install` in the directory for this assignment
    // to install the mime library used in the following line of code
    mime = require('mime'),
    dir = 'public/',
    port = 3000

let id = 0

let purchases = []

const server = http.createServer(function (request, response) {
    if (request.method === 'GET') {
        handleGet(request, response)
    } else if (request.method === 'POST') {
        handlePost(request, response)
    }
})

const handleGet = function (request, response) {
    const filename = dir + request.url.slice(1)
    if (request.url === '/database') {
        response.writeHeader(200, {'Content-Type': 'json'})
        response.end(JSON.stringify(purchases))
    } else if (request.url === '/') {
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
        if (request.url === '/decrease') {
            const item_id = JSON.parse(dataString).id
            let item = purchases.find((p) => p.id === item_id)
            if (item !== undefined) {
                item.item_quantity--;
                item.total_amount = item.item_quantity * item.item_cost;
                purchases = purchases.filter((p) => p.item_quantity > 0)
                response.end(JSON.stringify(purchases))
                response.writeHead(200, "OK", {'Content-Type': 'text/json'})
            }
            response.writeHead(400, "ID Not Found", {'Content-Type': 'text/plain'})
            response.end()
        } else {
            const new_data = JSON.parse(dataString)
            new_data.id = id++
            new_data.total_amount = new_data.item_cost * new_data.item_quantity
            purchases.push(new_data)

            response.writeHead(200, "OK", {'Content-Type': 'text/plain'})
            response.end()
        }
    })
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
            response.writeHeader(404)
            response.end('404 Error: File Not Found')
        }
    })
}

server.listen(process.env.PORT || port)
