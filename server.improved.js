const http = require( 'http' ),
    fs   = require( 'fs' ),
    // IMPORTANT: you must run `npm install` in the directory for this assignment
    // to install the mime library used in the following line of code
    mime = require( 'mime' ),
    dir  = 'public/',
    port = 3000

let appdata = []

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
  } else if (request.url === '/getdata'){
    response.writeHead(200, "OK", { "Content-Type": "text/plain" });
    response.write(JSON.stringify(appdata));
    response.end();
  }
  else {
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  console.log(request.url)
  if (request.url === '/submit/'){
    let dataString = ''

    request.on( 'data', function( data ) {
      dataString += data
    })

    request.on( 'end', function() {
      var data = JSON.parse( dataString );
      console.log(data);
      appdata.push(data)

      response.writeHead(200, "OK", {'Content-Type': 'text/plain' })
      response.write(JSON.stringify(appdata))
      response.end()
    })
  }
  else if (request.url.includes('delete')){
    let dataString = new URL(request.headers.origin + request.url).searchParams.get('id')
    console.log("Data: " + dataString)

    request.on( 'data', function( data ) {
    })

    request.on( 'end', function() {
      console.log(appdata)
      var index = parseInt(dataString)
      console.log(index)
      if (index === 0 && appdata.length == 1) appdata = []
      else appdata.splice(index, index)

      response.writeHead(200, "OK", {'Content-Type': 'text/plain' })
      response.write(JSON.stringify(appdata))
      response.end()
    })
  }

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

server.listen( process.env.PORT || port )
