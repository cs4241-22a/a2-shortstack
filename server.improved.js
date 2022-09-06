const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000


const appdata = [
  { 'name': 'May', 'score': '3', 'rock': '2', 'paper': '1', 'scissors': '0' },
  { 'name': 'Ben', 'score': '8', 'rock': '1', 'paper': '4', 'scissors': '3'},
  { 'name': 'Peter', 'score': '5', 'rock': '1', 'paper': '2', 'scissors': '5'} 
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
    sendFile( response, filename)
    
    /*
    const html = `
    <html>
    <body>
      ${ appdata.map( item => JSON.stringify(item) ) }
    </body>
    </html>
    `
    response.end( html )
    */
    //sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    //let newData = JSON.parse( dataString ) 
    console.log( JSON.parse( dataString )  )
    // ... do something with the data here!!!
    //const mostPlayed = getMostPlayed(newData.rock, newData.paper, newData.scissors)
    
    //appdata.push( newData )

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end(JSON.stringify( appdata ) )
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

/*
function getMostPlayed(totalRock, totalPaper, totalScissors) {
  const vals = [totalRock, totalPaper, totalScissors]
  
  // j stores the highest value within the array
  let j = 1
  for( let i = 0; i < vals.length; i++ ) {
    if( vals[i] > vals[j]) {
      j = i
    }
  }
  
  let mostPlayed = ""
  switch (j) {
    case 0:
      return mostPlayed = "Rock"
    break
    case 1:
      return mostPlayed = "Paper"
    case 2:
      return mostPlayed = "Scissors"
    }
}
*/

server.listen( process.env.PORT || port )
