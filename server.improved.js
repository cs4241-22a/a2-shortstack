const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  // { 'model': 'toyota', 'year': 1999, 'mpg': 23 },
  // { 'model': 'honda', 'year': 2004, 'mpg': 30 },
  // { 'model': 'ford', 'year': 1987, 'mpg': 14}

    // Starting data

  {
    activity: 'Sleep',
    date: '2022-09-07',
    time_started: '19:15',
    time_ended: '19:15',
    description: 'test',
    duration: '0 Hour  0 Minutes'
  }

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
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {

  if (request.url === "/submit") {
    let dataString = ''

    request.on('data', function (data) {
      dataString += data
    })

    request.on('end', function () {


      let data = JSON.parse(dataString);
      data.duration = time_duration(data.time_started, data.time_ended)
      appdata.push(data)
      console.log(JSON.stringify(appdata))
      response.writeHead(200, "OK", {'Content-Type': 'text/plain'})
      response.end(JSON.stringify(appdata))
    })
  }
  else if (request.url === "/delete"){
    console.log(response)
    let dataString = ''

    request.on('data', function (data) {
      dataString += data
    })

    request.on('end', function () {


      let data = JSON.parse(dataString);
      data.duration = time_duration(data.time_started, data.time_ended)
      appdata.pop(data)
      console.log(JSON.stringify(appdata))
      response.writeHead(200, "OK", {'Content-Type': 'text/plain'})
      response.end(JSON.stringify(appdata))
    })
  }
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

function time_duration(start, end) {

  let start_hour = parseInt(start.split(":")[0]);
  let start_min = parseInt(start.split(":")[1]);

  let end_hour = parseInt(end.split(":")[0]);
  let end_min = parseInt(end.split(":")[1]);

  let dur_hour;
  let dur_min;

  if (end_hour > start_hour) {

    if (end_min >= start_min) {
      dur_min = end_min - start_min;
      dur_hour = end_hour - start_hour;
    } else {
      dur_hour = end_hour - start_hour - 1;
      dur_min = (end_min + 60) - start_min;
    }
  }
  if (end_hour == start_hour) {

    if (end_min >= start_min) {
      dur_min = end_min - start_min;
      dur_hour = 0;
    } else {
      dur_hour = 23;
      dur_min = (end_min + 60) - start_min;
    }
  } else {
    if (end_min >= start_min) {
      dur_min = end_min - start_min;
      dur_hour = (end_hour + 24) - start_hour;
    } else {
      dur_hour = (end_hour + 24) - start_hour - 1;
      dur_min = (end_min + 60) - start_min;
    }
  }
  return ((dur_hour.toString() + " Hours  " + dur_min.toString() + " Minutes")).toString();

}

server.listen( process.env.PORT || port )
