const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = []

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
  }
  else if (request.url === '/list') {
    sendList(response);
  }
  else{
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
      // Derive the imdb link using the imdbID field
      let entry = resp['entry'];
      entry['URL'] = `https://www.imdb.com/title/${entry['imdbID']}/`;
      
      if (findTitle(entry) === -1) {
        appdata.push(entry);
      }
      response.writeHeader(200);
      response.end();
    }
    else if (resp['type'] === 'rmv') {
      let idx = findTitle(resp['entry']);
      if (idx !== -1) {
        appdata.splice(idx, 1);
      }
      response.writeHeader(200);
      response.end();
    }
    else if (resp['type'] === 'movup') {
      let idx = findTitle(resp['entry']);
      if (idx > 0) {
        temp = appdata[idx - 1];
        appdata[idx - 1] = appdata[idx];
        appdata[idx] = temp;
      }
      response.writeHeader(200);
      response.end();
    }
    else if (resp['type'] === 'movdn') {
      let idx = findTitle(resp['entry']);
      if (idx < appdata.length - 1) {
        temp = appdata[idx + 1];
        appdata[idx + 1] = appdata[idx];
        appdata[idx] = temp;
      }
      response.writeHeader(200);
      response.end();
    }

  })
}

const sendList = function (response) {
  response.writeHeader(200, {'Content-Type': 'application/json'});
  response.end(JSON.stringify(appdata));
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

const findTitle = function (obj) {
  let idx = -1
  for (i = 0; i < appdata.length; i++) {
    if (obj["imdbID"] === appdata[i]["imdbID"]) {
      idx = i;
    }
  }

  return idx;
}


server.listen( process.env.PORT || port )

