const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appData = [
  {
    positive: true,
    amount: 100,
    timeUnit: "day",
  },
  {
    positive: true,
    amount: 1000,
    timeUnit: "week",
  },
  {
    positive: true,
    amount: 100,
    timeUnit: "year",
  },
  {
    positive: false,
    amount: 200,
    timeUnit: "day",
  },
]

function getDelta () {

  function getMoneyPerSecond(d) {
    let unitsPerYear = null;
    switch (d.timeUnit) {
      case "day":
        unitsPerYear = 356;
        break;
      case "week":
        unitsPerYear = 40;
        break;
      case "month":
        unitsPerYear = 12;
        break;
      case "year":
        unitsPerYear = 1;
        break;
      default:
        unitsPerYear = -1;
        break;
    }
    const moneyPerYear = d.amount * unitsPerYear;
    const moneyPerDay = moneyPerYear / 365.25;
    const moneyPerHour = moneyPerDay / 24;
    return (moneyPerHour / 3600);
  }

  // Add up all money from data
  let totalDelta = 0;
  for (const dataPoint of appData) {
    if (dataPoint.positive) {
      totalDelta += getMoneyPerSecond(dataPoint);
    } else {
      totalDelta -= getMoneyPerSecond(dataPoint);
    }
  }

  return totalDelta;
}

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    console.log("Post received")
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
    if (request.url === "/submit") {
      console.log( JSON.parse( dataString ) )

      // ... do something with the data here!!!
  
      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
      response.end()
    }
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
console.log("Server started!");