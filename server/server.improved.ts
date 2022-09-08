import {IncomingMessage, ServerResponse} from "http";
import {constants} from "os";
import ErrnoException = NodeJS.ErrnoException;
import {Serializer} from "v8";
const Datastore = require('nedb');

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

// Create message database
const messagesDB: Nedb = new Datastore({ filename: './messages.json', autoload: true });

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

			// Sort database then send JSON
			messagesDB.find({}).sort({timeCreated: 1}).exec((err, docs: Message[]) => {
				response.end(JSON.stringify(docs));
			});
		});
	} else {
		sendFile( response, filename );
	}
}

const handlePost = function( request: IncomingMessage, response: ServerResponse ) {
	let dataString = '';

	request.on( 'data', function( data ) {
		dataString += data;
	});

	request.on( 'end', function() {
		const newMessage: Message = JSON.parse(dataString);

		// Update timecreated to server time
		newMessage.timeCreated = new Date();

		messagesDB.insert(newMessage, (err, newDoc) => {
			response.writeHead( 200, "OK", {'Content-Type': 'text/plain' });
			response.end(dataString);
			console.log(`User ${request.socket.remoteAddress} posted message`);
			console.log(newMessage);
		});
	});
}

function handleDelete(request: IncomingMessage, response: ServerResponse) {
	if (request.url === '/remove')
	request.on('data', (dataString) => {
		const data = <{index: number}>JSON.parse(dataString);

		// Remove from database by sorting by date then removing index
		messagesDB.find({}).sort({timeCreated: 1}).exec((err, docs: Message[]) => {
			messagesDB.remove(docs[data.index]);
			console.log(`User ${request.socket.remoteAddress} deleted item`);
			console.log(docs[data.index]);
		});
	})
		.on( 'end', function() {
		response.writeHead( 200, "OK", {'Content-Type': 'text/plain' });
		response.end();
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

server.listen( process.env.PORT || port );
