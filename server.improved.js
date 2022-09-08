const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

// EXAMPLE DATA
const appdata = [
  { item: "here is an example to-do item", date: "2022-09-08" },
  { item: "here is a second example item", date: "09/09/22"}
]

const add_item = function(list_item) {
  appdata.push(list_item)
}

const delete_item = function(list_item) {
  let x = 0;
  for(let i = 0; i < appdata.length; i++) {
    if (list_item.item === appdata[i].item) {
      appdata.splice(i,i);
    }
  }
}

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})

// handles GET requests
const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  }else{
    sendFile( response, filename )
  }
}

// hangles POST requests
const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    if(dataString === '') {
      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
      response.end(JSON.stringify(appdata))
      return
    }
    
    const list_item = JSON.parse(dataString)
    console.log(list_item)
    
    if(request.url === "/add") {
      add_item(list_item)
      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
      response.end(JSON.stringify(appdata[appdata.length-1]))
    }
    
    if(request.url === "/delete")
      delete_item(list_item)

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

server.listen( process.env.PORT || port )
