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
    // ... do something with the data here!!!
    if (request.url === '/submit') {
      let rowItem = JSON.parse(dataString)
      let priority = rowItem.priority

      // Determine the deadline from the priority
      if (priority === "Low") {
        rowItem.deadline = "This week"
      } else if (priority === "Medium") {
        rowItem.deadline = "In three days"
      } else if (priority === "High") {
        rowItem.deadline = "Tomorrow"
      }

      // Add the item to appdata
      appdata.push(rowItem)
      response.end(JSON.stringify(appdata))
    } else if (request.url === '/delete') {
      // Remove the item from appdata
      appdata.splice(parseInt(dataString), 1)
      response.end(JSON.stringify(appdata))
    }
  
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
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

server.listen( process.env.PORT || port )
