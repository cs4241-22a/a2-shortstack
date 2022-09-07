const http = require( 'http' ), fs   = require( 'fs' ), mime = require( 'mime' ), dir  = 'public/', port = 3000;
const appdata = [ { 'title': 'Halloween',                                   'genre': 'horror', 'year': 1978 },
                  { 'title': 'War Dogs',                                    'genre': 'comedy', 'year': 2016 },
                  { 'title': 'A Nightmare On Elm Street 3: Dream Warriors', 'genre': 'horror', 'year': 1987 },
                  { 'title': 'Alvin and the Chipmunks: The Road Chip',      'genre': 'family', 'year': 2015 },
                  { 'title': 'Old School',                                  'genre': 'comedy', 'year': 2003 } ];
const server = http.createServer( function( request,response ) {
       if( request.method === 'GET'    ) {    handleGet( request, response ); }
  else if( request.method === 'POST'   ) {   handlePost( request, response ); }
  else if( request.method === 'DELETE' ) { handleDelete( request, response ); } } );
const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 );
  if ( request.url === '/' ) { sendFile( response, 'public/index.html' ); }
  else if ( request.url === '/get' ) {
    response.writeHead( 200, 'OK', { 'Content-Type': 'text/plain' });
    response.end( JSON.stringify( appdata ) ); }
  else { sendFile( response, filename ); } };
const handlePost = function( request, response ) {
  let dataString = '';
  request.on( 'data', function( data ) { dataString += data; } );
  request.on( 'end', function() {
    appdata.push( JSON.parse( dataString ) );
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' } );
    response.end(); } ); };
const handleDelete = function( request, response ) {
  let dataString = '';
  request.on( 'data', function( data ) { dataString += data; } );
  request.on( 'end', function() {
    let toberemoved = JSON.parse( dataString ).name.toString().toLowerCase();
    appdata.filter( item => item.name.toLowerCase() !== toberemoved );
    response.writeHead( 200, "OK", {"Content-Type": 'text/plain' } );
    response.end(); } ); };
const sendFile = function( response, filename ) {
  const type = mime.getType( filename );
  fs.readFile( filename, function( err, content ) {
    // if the error = null, then we've loaded the file successfully
    if( err === null ) {
      // status code: https://httpstatuses.com
      response.writeHeader( 200, { 'Content-Type': type });
      response.end( content ); }
    else {
      // file not found, error code 404
      response.writeHeader( 404 );
      response.end( '404 Error: File Not Found' ); } } ); };
server.listen( process.env.PORT || port );
