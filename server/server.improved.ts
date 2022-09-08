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


// Establish types for the message board
type HEX = `#${string}`;
interface Message {
	timeCreated: Date;
	color: HEX;
	message: string;
}

const messages: Message[] = [
	{ timeCreated: new Date(), color: "#ffffff", message: "Test" }
];

const server = http.createServer( function (request: IncomingMessage, response: ServerResponse) {
	if (request.method === 'GET') {
		handleGet( request, response );
	} else if (request.method === 'POST'){
		handlePost(request, response);
	} else if (request.method === 'DELETE') {
		handleDelete(request, response);
	}
});

const handleGet = function( request: IncomingMessage, response: ServerResponse ) {
	if (request === undefined)
		throw new TypeError("request cannot be undefined");

	const filename = dir + request.url?.slice( 1 );

	if( request.url === '/' ) {
		sendFile( response, 'public/index.html' );
	} else if (request.url === '/messages') {
		// If messages are requested, send a .json of all messages on the server
		request.on('data', (data) => console.log(data))
			.on( 'end', function() {
			response.writeHead( 200, "OK", {'Content-Type': 'text/plain' });
			response.end(JSON.stringify(messages));
		});
	}	else {
		sendFile( response, filename );
	}
}

const handlePost = function( request: IncomingMessage, response: ServerResponse ) {
	let dataString = '';

	request.on( 'data', function( data ) {
		dataString += data;
	});

	request.on( 'end', function() {
		const data: Message = JSON.parse(dataString);

		data.timeCreated = new Date();
		messages.push(data);

		response.writeHead( 200, "OK", {'Content-Type': 'text/plain' });
		response.end(dataString);
	});
}

function handleDelete(request: IncomingMessage, response: ServerResponse) {

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
