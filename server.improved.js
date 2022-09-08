const { isNullOrUndefined } = require('util')

const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

let appdata = [

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

  else{
    console.log("GET File Name: " + filename)
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ''
  const filename = dir + request.url.slice( 1 ) 
  if( request.url === '/clear' ) 
  {
      appdata = []
  }


  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    
    let newEntry = JSON.parse( dataString )
    console.log("Data string " + dataString)
    console.log("old data"+  newEntry )
    
    if (newEntry.todo && newEntry.desc && newEntry.dueDate) //if there is new data...dont push empty values
    {
      console.log("Data is complete. Adding dayaleft and pushing" )

      newEntry.daysLeft = getDaysLeft (newEntry.dueDate)
      appdata.push( newEntry )
    }
    else {
      console.log ("Please add all the fields")
    }

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.write( JSON.stringify( appdata ) )
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

function getDaysLeft(dateDue) {
  //initialize dates with Date object

  let currentDate = new Date ()
  const _dueDate = new Date(dateDue);

  // calculation for converting a day into milliseconds
  const oneDay = 1000 * 60 * 60 * 24;

  // calculation for the time difference between start and last
  const diffTime = _dueDate.getTime() - currentDate.getTime();

  // calculation for the days between start and last
  const diffDays = Math.round(diffTime / oneDay);
  // return number of days
  return diffDays;
}



server.listen( process.env.PORT || port )
