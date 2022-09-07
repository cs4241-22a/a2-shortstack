const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  { 'model': 'toyota', 'year': 1999, 'mpg': 23 },
  { 'model': 'honda', 'year': 2004, 'mpg': 30 },
  { 'model': 'ford', 'year': 1987, 'mpg': 14} 
]

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  }else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    resp = JSON.parse(dataString)
    console.log( JSON.parse( dataString ) )

    if (resp['type'] === 'search') {
      console.log("Search...");
      sendMovieQueryResp(resp['title'], response);
    }
    else if (resp['type'] === 'add') {
      console.log("Add...");
    }

    // response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    // response.end()
  })
}

const sendFile = function( response, filename ) {
   const type = mime.getType( filename ) 

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we've loaded the file successfully
     if( err === null ) {

       // status code: https://httpstatuses.com
       response.writeHeader( 200, { 'Content-Type': type })
       response.end( content )

     }else{

       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( '404 Error: File Not Found' )

     }
   })
}

const sendMovieQueryResp = function (movieTitle, response) {
  movieStr = movieTitle.trim().replace(/ /g, '+');
  fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=60b6c6a4&s=${movieStr}&plot=short&r=json`)
    .then((response) => response.json())
    .then((data) => {
      const json = { type: "queryResp",
               data: data},
      body = JSON.stringify(json);
      response.writeHeader(200, { 'Content-Type': 'application/json'});
      response.end(body);
      console.log("Sent response");
      console.log(body);
    });
}


server.listen( process.env.PORT || port )

