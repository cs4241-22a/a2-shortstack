const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

let appData = [
  {
    positive: true,
    title: "Bartending on Weekends",
    amount: 600,
    timeUnit: "week",
    id: 1,
  },
  {
    positive: true,
    title: "Investments",
    amount: 300,
    timeUnit: "year",
    id: 2,
  },
  {
    positive: true,
    title: "Birthday Money",
    amount: 500,
    timeUnit: "year",
    id: 3,
  },
  {
    positive: false,
    title: "Spotify Subscription",
    amount: 5.99,
    timeUnit: "month",
    id: 4,
  },
  {
    positive: false,
    title: "Netflix Subscription",
    amount: 14.99,
    timeUnit: "month",
    id: 5,
  },
  {
    positive: false,
    title: "Child Support",
    amount: 295,
    timeUnit: "week",
    id: 6,
  },
  {
    positive: false,
    title: "Magazine Subscription",
    amount: 35,
    timeUnit: "month",
    id: 7,
  }
];

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
    totalDelta += getMoneyPerSecond(dataPoint);
  }

  return totalDelta;
}

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    console.log("POST received!")
    handlePost( request, response ) 
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if ( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  } else if (request.url === "/table") {
    console.log("Table fetch received")
    response.end(JSON.stringify({ appData: appData }))
  } else if (request.url === "/delta") {
    console.log("Delta fetch received")
    response.end(JSON.stringify({delta: getDelta()}))
  } else {
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
      const data = JSON.parse(dataString);

      const newAppData = {
        positive: data.amount >= 0 ? true : false,
        title: data.title,
        amount: data.amount,
        timeUnit: data.timeUnit,
        id: Date.now(),
      }

      appData.push(newAppData);
      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' });
      const body = {
        newDelta: getDelta(),
      }
      response.end(JSON.stringify(body));
    }

    if (request.url === "/delete") {
      const data = JSON.parse(dataString);
      const idToDelete = data.id;

      appData = appData.filter(a => a.id !== idToDelete);
      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' });
      const body = {
        appData: appData,
      }
      response.end(JSON.stringify(body));
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
console.log("Server started on port " + (process.env.PORT ? process.env.PORT : port) + "!");