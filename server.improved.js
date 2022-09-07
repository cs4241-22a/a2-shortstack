const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000


const appdata = [
  { 'name': 'May', 'score': 3, 'rock': 2, 'paper': 1, 'scissors': 1, 'most_used': 'Rock'},
  { 'name': 'Ben', 'score': 8, 'rock': 1, 'paper': 5, 'scissors': 3, 'most_used': 'Paper'},
  { 'name': 'Peter', 'score': 5, 'rock': 1, 'paper': 2, 'scissors': 5, 'most_used': 'Scissors'} 
]

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  } else if( request.method === 'DELETE' ){
    handleDelete( request, response )
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
    let newData = JSON.parse( dataString ) 
    console.log( JSON.parse( dataString ) )
    // ... do something with the data here!!!
    
    // Find most frequently used option and create a derived field with that information
    const mostPlayed = getMostPlayed(newData.rock, newData.paper, newData.scissors)
    newData.most_used = mostPlayed
    
    appdata.push( newData )

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end(JSON.stringify( appdata ) )
  })
}

const handleDelete = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    let newData = JSON.parse( dataString ) 
    console.log( JSON.parse( dataString ) )
    
    // Find name and delete the first instance of it from the data
    const name = newData.name
    const deleteScore = deleteAppDataValue(name)
    
    console.log( appdata )
    
    //appdata.push( newData )

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end( JSON.stringify( deleteScore ) )
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


function getMostPlayed(totalRock, totalPaper, totalScissors) {
  const vals = [totalRock, totalPaper, totalScissors]
  
  // j stores the highest value within the array
  let j = 1
  for( let i = 0; i < vals.length; i++ ) {
    if( vals[i] > vals[j]) {
      j = i
    }
  }
  
  // Sets the correct string value and returns it
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

function deleteAppDataValue(name) {
  let i = 0
  for (i; i < appdata.length; i++) {
    if (appdata[i].name === name) {
      appdata.splice(i,1)
      break;
    }
  }
  return i
}


server.listen( process.env.PORT || port )
