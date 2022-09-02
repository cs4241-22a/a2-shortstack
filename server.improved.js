const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

let reminders = []

const server = http.createServer( function( request, response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})

const handleGet = (request, response) => {
  const filename = dir + request.url.slice( 1 )
  
  switch (request.url) {
    case '/':
      sendFile(response, 'public/index.html')
      break
    case '/api/deletereminder':
      console.log('sending data back to client')
      console.log(reminders)
      sendData(response, reminders)
      break
    default:
      sendFile(response, filename)
      break
  }
}

const handlePost = (request, response ) => {
  let dataString = ''

  request.on('data', function( data ) {
      dataString += data 
  })

  request.on('end', function() {
    let data = JSON.parse(dataString)

    switch (request.url) {
      case '/api/newreminder':
        console.log('new data incoming')
        reminders.push(data)
        console.log(reminders)
        response.writeHead(200, "OK", {'Content-Type': 'text/plain' })
        response.end()
        break
      case '/api/deletereminder':
        console.log('new delete data incoming')
        reminders = reminders.filter((element) => {
          return JSON.stringify(element) != JSON.stringify(data) //element.title !== data.title
        })
        console.log(reminders)
        response.writeHead(200, "OK", {'Content-Type': 'text/plain' })
        response.end()
        break
      default:
        console.log("ERROR")
        break
    }
  })
}

const sendFile = (response, filename) => {
   const type = mime.getType( filename ) 

   fs.readFile(filename, (err, content) => {
     // if the error = null, then we've loaded the file successfully
     if(err === null) {
       // status code: https://httpstatuses.com
       response.writeHeader( 200, { 'Content-Type': type })
       response.end( content )
     } else {
       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( '404 Error: File Not Found' )
     }
   })
}

const sendData = (response, data) => {
  response.writeHeader(200, {'Content-Type': 'application/json'})
  response.end(JSON.stringify(data))
}

server.listen( process.env.PORT || port )
