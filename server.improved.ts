import {IncomingMessage, ServerResponse} from "http";
import {constants} from "os";
import ErrnoException = NodeJS.ErrnoException;
import {Serializer} from "v8";

const http = require( 'http' ),
	  fs   = require( 'fs' ),
	  // IMPORTANT: you must run `npm install` in the directory for this assignment
	  // to install the mime library used in the following line of code
	  mime = require( 'mime' ),
	  dir  = 'public/',
	  port = 3000;

const appdata = [
	{ 'model': 'toyota', 'year': 1999, 'mpg': 23 },
	{ 'model': 'honda', 'year': 2004, 'mpg': 30 },
	{ 'model': 'ford', 'year': 1987, 'mpg': 14}
];

const server = http.createServer( function( request: IncomingMessage, response: ServerResponse ) {
	if( request.method === 'GET' ) {
		handleGet( request, response );
	} else if( request.method === 'POST' ){
		handlePost(request, response);
	}
});

const handleGet = function( request: IncomingMessage, response: ServerResponse ) {
	if (request === undefined)
		throw new TypeError("request cannot be undefined");

	const filename = dir + request.url?.slice( 1 );

	if( request.url === '/' ) {
		sendFile( response, 'public/index.html' );
	}else{
		sendFile( response, filename );
	}
}

const handlePost = function( request: IncomingMessage, response: ServerResponse ) {
	let dataString = '';

	request.on( 'data', function( data ) {
		dataString += data;
	});

	request.on( 'end', function() {
		let data = {yourname: ""}
		data = JSON.parse(dataString);
		console.log(data);

		// ... do something with the data here!!!
		// response.write(dataString);

		response.writeHead( 200, "OK", {'Content-Type': 'text/plain' });
		response.end(dataString);
	});
}

const sendFile = function( response: ServerResponse, filename: string ) {
	const type = mime.getType( filename )

	fs.readFile( filename, function( err: ErrnoException, content: Buffer ) {
		// if the error = null, then we've loaded the file successfully
		if( err === null ) {
			// status code: https://httpstatuses.com
			response.writeHead( 200, { 'Content-Type': type });
			response.end( content );
		} else {
			// file not found, error code 404
			response.writeHead( 404 );
			response.end( '404 Error: File Not Found' );
		}
	})
}

server.listen( process.env.PORT || port )
