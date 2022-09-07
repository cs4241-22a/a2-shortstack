const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

let appdata = [
  { 'song': 'Grace', 'artist': 'Lil Baby', 'album': 'My Turn - Grace by Lil Baby'},
  { 'song': 'Emotionally Scarred', 'artist': 'Lil Baby', 'album': 'My Turn - Emotionally Scarred by Lil Baby'},
  { 'song': 'Freestyle', 'artist': 'Lil Baby', 'album': 'Too Hard - Freestyle by Lil Baby'}
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
  }
  else if( request.url === '/public/css/style.css' ) {
    sendFile( response, 'public/css/style.css' )
  }
  else if( request.url === '/public/js/scripts.js' ) {
    sendFile( response, 'public/js/scripts.js' )
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
    console.log( JSON.parse( dataString ) )
    debugger

    // handles remove song case --> finds all instances of song and removes them
    if( !(dataString.includes('"album":'))) {
      let i = 0
      let found = false
      let arr = []
      appdata.forEach(item => {
        if(item.song == JSON.parse(dataString).song && item.artist == JSON.parse(dataString).artist) {
          arr.push(i)
          found = true
        }
        else {
          i++
        }
      })
      if(found) {
        arr.forEach(item => {
          appdata.splice(item, 1)
        })
      }
    }
    // capture incoming data only from add song and add to appdata table stored in server
    else if( dataString != '{}') {
      entry = JSON.parse(dataString)
      entry.album = entry.album + " - " + entry.song + " by " + entry.artist
      appdata.push(entry)
    }

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end(JSON.stringify(appdata))
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

const sendData = function( response ) {
  response.data = appdata
}

server.listen( process.env.PORT || port )
