const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

let appdata = [
  { 'name': 'yogurt', 'quantity': 10, 'price': 23, 'total': 230},
  { 'name': 'mayo', 'quantity': 10, 'price': 23, 'total': 230}
]

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  } else if( request.method === 'POST' ){
    //Add data to database
    handlePost( request, response ) 
  } else if( request.method === 'DELETE' ){
    //Remove data from database
    handleDelete(request, response)
  } 
})

//remove an item from the appdata by name
const removeItemByName = function(name) {
  const compareName = name.toLowerCase()
  appdata = appdata.filter(item => item.name.toLowerCase() !== compareName)
}

const handleDelete = function(request, response) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    //parse new data to json
    let entryToRemove = JSON.parse(dataString).name
    removeItemByName(entryToRemove)

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end(JSON.stringify(appdata))
  })
}

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  }
  else if(request.url === '/data') {
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end(JSON.stringify(appdata))
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
    //parse new data to json
    let newData = JSON.parse(dataString)
    newData['total'] = (newData.price * newData.quantity).toFixed(2)

    //add to our list
    appdata.push(newData)

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
