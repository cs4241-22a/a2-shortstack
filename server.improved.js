const { createServer } = require('http')
const { readFile } = require('fs')
const { getType } = require('mime')
const dir = 'public/'
const port = 3000
const people = new Map();

function getPerson(id, data) {
    const {firstName, lastName} = data || people.get(id);
    return {id, firstName, lastName, fullName: `${firstName} ${lastName}`};
}

function peopleResponse (response) {
    const data = Array.from(people.entries()).map((x) => getPerson (...x));
    response.writeHead( 200, "OK", {'Content-Type': 'application/json'});
    response.end(JSON.stringify(data));
}

function personResponse (response, id) {
    response.writeHead( 200, "OK", {'Content-Type': 'application/json'});
    response.end(JSON.stringify(getPerson(id)));
}

const server = createServer( function( request,response ) {
    if (request.method === 'GET' ) {
        handleGet( request, response )    
    } else if( request.method === 'POST' ){
        handlePost( request, response ) 
    } else if (request.method === 'DELETE') {
        handleDelete (request, response)
    }
})

const handleGet = function( request, response ) {
    const filename = dir + request.url.slice( 1 ) 
    let id;
    if( request.url === '/' ) {
        sendFile( response, 'public/index.html' )
    } else if (request.url === '/people') {
        peopleResponse(response);
    } else {
        sendFile( response, filename )
    }
}

const handlePost = function( request, response ) {
    let dataString = '';

    request.on( 'data', function( data ) {
        dataString += data;
    })

    request.on( 'end', function() {
        const {id, firstName, lastName} = JSON.parse(dataString);
        console.log(id, firstName, lastName)

        people.set(id, {firstName, lastName});
        personResponse(response, id);
    })
}

const handleDelete = function( request, response ) {
    let id;
    if (id = /\/people\/([0-9]+)/g.exec(request.url)) {
        console.log(id[1])
        people.delete(id[1]);
    }
    response.writeHeader(200);
    response.end();
}

function sendFile(response, filename) {
    const type = getType(filename)

    readFile(filename, function(err, content) {

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

server.listen( process.env.PORT || port )
