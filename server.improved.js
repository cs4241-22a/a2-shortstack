const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [

]

//sorts newHold array by ascending date for use in the queueHold
const sortedHolds = appdata.slice().sort((a,b) => b.currentDate - a.currentDate)
console.log(sortedHolds)

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response ) 
  }else if( request.method === 'POST' ){
    if ( request.url === "/submit")
    handlePostSubmit( request, response ) 
    if ( request.url === "/remove")
    handlePostRemove( request, response )
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  } else{
    sendFile( response, filename )
  } 

}

const handlePostSubmit = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    console.log( JSON.parse( dataString ) )
    let newHold = JSON.parse( dataString )
    newHold.holdConfirm = ""
    
    console.log( newHold )
    appdata.push( newHold )

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end( JSON.stringify( appdata ) )
    console.log(appdata)
    response.end()
  })
}

const handlePostRemove = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    if(newHold.del === true){
      remove(appdata)
    }
  })

  request.on( 'end', function() {
    console.log( JSON.parse( dataString ) )
    let newHold = JSON.parse( dataString )
    newHold.holdConfirm = ""
    
    
    for (let i= 0; i < appdata.length; i++) {
      if (holdID === appdata[i].holdID)
        appdata.splice(i, 1)
        break
    }

    console.log( newHold )
    appdata.push( newHold )

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end( JSON.stringify( appdata ) )
    console.log(appdata)
    response.end()
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
